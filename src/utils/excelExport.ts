import * as XLSX from 'xlsx';

/**
 * Export data to Excel file
 */
export interface ExcelExportOptions {
  data: any[];
  filename: string;
  sheetName?: string;
  columns?: Array<{
    key: string;
    label: string;
    transform?: (value: any) => any;
  }>;
  dateFilter?: {
    startDate?: string;
    endDate?: string;
    dateField?: string;
  };
}

export function exportToExcel(options: ExcelExportOptions): void {
  const { data, filename, sheetName = 'Sheet1', columns, dateFilter } = options;

  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Filter data by date if dateFilter is provided
  let filteredData = data;
  if (dateFilter && (dateFilter.startDate || dateFilter.endDate)) {
    const dateField = dateFilter.dateField || 'created_at';
    filteredData = data.filter(item => {
      const itemDate = new Date(item[dateField]);
      if (isNaN(itemDate.getTime())) return true; // Include items with invalid dates
      
      if (dateFilter.startDate) {
        const startDate = new Date(dateFilter.startDate);
        if (itemDate < startDate) return false;
      }
      
      if (dateFilter.endDate) {
        const endDate = new Date(dateFilter.endDate);
        endDate.setHours(23, 59, 59, 999); // Include the entire end date
        if (itemDate > endDate) return false;
      }
      
      return true;
    });
  }

  if (filteredData.length === 0) {
    throw new Error('No data matches the selected date range');
  }

  let exportData: any[];

  if (columns && columns.length > 0) {
    // Use specified columns with transformations
    exportData = filteredData.map(row => {
      const transformedRow: any = {};
      columns.forEach(col => {
        const value = row[col.key];
        transformedRow[col.label] = col.transform ? col.transform(value) : value;
      });
      return transformedRow;
    });
  } else {
    // Use all data as-is
    exportData = filteredData;
  }

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Auto-size columns
  const columnWidths = Object.keys(exportData[0] || {}).map(key => {
    const maxLength = Math.max(
      key.length, // Header length
      ...exportData.map(row => String(row[key] || '').length)
    );
    return { wch: Math.min(maxLength + 2, 50) }; // Cap at 50 characters
  });
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Generate filename with timestamp if not unique
  const timestamp = new Date().toISOString().split('T')[0];
  const finalFilename = filename.includes('.xlsx') 
    ? filename 
    : `${filename}_${timestamp}.xlsx`;

  // Write and download file
  XLSX.writeFile(workbook, finalFilename);
}

/**
 * Format common data types for Excel export
 */
export const excelFormatters = {
  date: (value: any) => {
    if (!value) return '';
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  },
  
  dateTime: (value: any) => {
    if (!value) return '';
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  },
  
  currency: (value: any) => {
    if (value === null || value === undefined) return '';
    const num = Number(value);
    return isNaN(num) ? value : `$${num.toLocaleString()}`;
  },
  
  boolean: (value: any) => {
    if (value === null || value === undefined) return '';
    return value ? 'Yes' : 'No';
  },
  
  truncateText: (maxLength: number) => (value: any) => {
    if (!value) return '';
    const text = String(value);
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
};