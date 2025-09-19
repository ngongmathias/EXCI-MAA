'use client';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Users, FileText, Image, BarChart3, Settings, Plus, Edit, Trash2, Eye} from 'lucide-react';

export default function AdminDashboard() {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user?.role !== 'admin') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  const stats = [
    {name: 'Total Visitors', value: '2,543', change: '+12%', changeType: 'positive'},
    {name: 'Page Views', value: '8,921', change: '+8%', changeType: 'positive'},
    {name: 'Contact Forms', value: '23', change: '+15%', changeType: 'positive'},
    {name: 'Training Bookings', value: '7', change: '+3%', changeType: 'positive'},
  ];

  const recentInquiries = [
    {id: 1, name: 'John Doe', email: 'john@example.com', service: 'Accounting', date: '2024-01-15', status: 'New'},
    {id: 2, name: 'Jane Smith', email: 'jane@example.com', service: 'Audit', date: '2024-01-14', status: 'Contacted'},
    {id: 3, name: 'Bob Johnson', email: 'bob@example.com', service: 'Training', date: '2024-01-13', status: 'New'},
  ];

  const tabs = [
    {id: 'overview', name: 'Overview', icon: BarChart3},
    {id: 'content', name: 'Content Management', icon: FileText},
    {id: 'inquiries', name: 'Inquiries', icon: Users},
    {id: 'settings', name: 'Settings', icon: Settings},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {session.user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-exci-blue-500 text-exci-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{inquiry.name}</p>
                        <p className="text-sm text-gray-600">{inquiry.email}</p>
                        <p className="text-xs text-gray-500">{inquiry.service} • {inquiry.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          inquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {inquiry.status}
                        </span>
                        <button className="text-exci-blue-600 hover:text-exci-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-exci-blue-50 rounded-lg hover:bg-exci-blue-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-exci-blue-600" />
                      <span className="font-medium text-gray-900">Add News Article</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-exci-blue-50 rounded-lg hover:bg-exci-blue-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Image className="h-5 w-5 text-exci-blue-600" />
                      <span className="font-medium text-gray-900">Upload Gallery Image</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 bg-exci-blue-50 rounded-lg hover:bg-exci-blue-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-exci-blue-600" />
                      <span className="font-medium text-gray-900">View All Inquiries</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Content Management</h3>
              <button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['News Articles', 'Training Courses', 'Gallery Images', 'Service Pages'].map((item, index) => (
                <div key={index} className="card">
                  <h4 className="font-semibold text-gray-900 mb-2">{item}</h4>
                  <p className="text-sm text-gray-600 mb-4">Manage your {item.toLowerCase()}</p>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Inquiries</h3>
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inquiry.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inquiry.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            inquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-exci-blue-600 hover:text-exci-blue-900 mr-3">View</button>
                          <button className="text-green-600 hover:text-green-900">Reply</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-4">General Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Site Name</label>
                    <input type="text" className="form-input mt-1" defaultValue="EXCI-MAA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input type="email" className="form-input mt-1" defaultValue="contact@excimaa.ca" />
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-4">Email Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                    <input type="text" className="form-input mt-1" placeholder="smtp.gmail.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                    <input type="number" className="form-input mt-1" placeholder="587" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
