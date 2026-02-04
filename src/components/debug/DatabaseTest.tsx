import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const DatabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runTests = async () => {
    addResult('🧪 Starting database tests...');
    
    // Test 1: Basic connection
    try {
      const { data, error } = await supabase.from('accounting_news_articles').select('count').single();
      if (error) {
        addResult(`❌ Connection test failed: ${error.message}`);
      } else {
        addResult(`✅ Connection successful. Total articles: ${data?.count || 0}`);
      }
    } catch (err) {
      addResult(`❌ Connection test error: ${err}`);
    }

    // Test 2: Check if table exists and has data
    try {
      const { data, error } = await supabase.from('accounting_news_articles').select('*').limit(5);
      if (error) {
        addResult(`❌ Table query failed: ${error.message}`);
      } else {
        addResult(`✅ Table query successful. Found ${data?.length || 0} articles`);
        if (data && data.length > 0) {
          addResult(`📄 First article: ${data[0].title?.substring(0, 50)}...`);
        }
      }
    } catch (err) {
      addResult(`❌ Table query error: ${err}`);
    }

    // Test 3: Check sources table
    try {
      const { data, error } = await supabase.from('accounting_news_sources').select('count').single();
      if (error) {
        addResult(`❌ Sources table test failed: ${error.message}`);
      } else {
        addResult(`✅ Sources table accessible. Total sources: ${data?.count || 0}`);
      }
    } catch (err) {
      addResult(`❌ Sources table test error: ${err}`);
    }

    // Test 4: Try a simple query without filters
    try {
      const { data, error } = await supabase
        .from('accounting_news_articles')
        .select('*')
        .order('pub_date', { ascending: false })
        .limit(3);
      
      if (error) {
        addResult(`❌ Simple query failed: ${error.message}`);
      } else {
        addResult(`✅ Simple query successful. Found ${data?.length || 0} recent articles`);
      }
    } catch (err) {
      addResult(`❌ Simple query error: ${err}`);
    }

    addResult('🏁 Database tests completed');
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h3>🔍 Database Connection Test</h3>
      <button onClick={runTests} style={{ marginBottom: '10px' }}>
        Run Tests Again
      </button>
      <div style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        borderRadius: '4px',
        maxHeight: '400px',
        overflow: 'auto',
        whiteSpace: 'pre-wrap'
      }}>
        {testResults.join('\n')}
      </div>
    </div>
  );
};

export default DatabaseTest;
