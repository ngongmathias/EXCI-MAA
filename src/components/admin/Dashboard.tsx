import React from 'react';
import { TrendingUp, Users, FileText, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Clients',
      value: '342',
      icon: <Users className="h-8 w-8" />,
      change: '+12.5%',
      color: '#3b82f6'
    },
    {
      title: 'Active Projects',
      value: '127',
      icon: <FileText className="h-8 w-8" />,
      change: '+8.2%',
      color: '#10b981'
    },
    {
      title: 'Revenue',
      value: '$124,500',
      icon: <DollarSign className="h-8 w-8" />,
      change: '+23.1%',
      color: '#f59e0b'
    },
    {
      title: 'Growth Rate',
      value: '18.5%',
      icon: <TrendingUp className="h-8 w-8" />,
      change: '+4.3%',
      color: '#8b5cf6'
    },
  ];

  const recentActivities = [
    { title: 'New client registered', time: '2 hours ago' },
    { title: 'Project completed', time: '5 hours ago' },
    { title: 'Invoice sent', time: '1 day ago' },
    { title: 'Meeting scheduled', time: '2 days ago' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-sm mt-2" style={{ color: stat.color }}>
                  {stat.change}
                </p>
              </div>
              <div style={{ color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col py-3 border-b border-gray-200 last:border-0"
              >
                <p className="text-gray-900 font-medium">{activity.title}</p>
                <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-md p-6 h-80">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-center">
              Statistics visualization would go here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;