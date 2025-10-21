import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Calendar,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface DashboardStats {
  totalContactSubmissions: number;
  totalConsultationRequests: number;
  totalCareers: number;
  openCareers: number;
  totalPosts: number;
  totalEvents: number;
  totalComments: number;
  totalLikes: number;
}

interface RecentActivity {
  id: string;
  title: string;
  time: string;
  type: 'contact' | 'consultation' | 'career' | 'post' | 'event';
  icon: JSX.Element;
  color: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContactSubmissions: 0,
    totalConsultationRequests: 0,
    totalCareers: 0,
    openCareers: 0,
    totalPosts: 0,
    totalEvents: 0,
    totalComments: 0,
    totalLikes: 0,
  });
  
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all stats in parallel
      const [
        contactSubmissions,
        consultationRequests,
        careers,
        posts,
        events,
        comments,
        likes
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: false }),
        supabase.from('consultation_requests').select('*', { count: 'exact', head: false }),
        supabase.from('careers').select('*', { count: 'exact', head: false }),
        supabase.from('posts').select('*', { count: 'exact', head: false }),
        supabase.from('events').select('*', { count: 'exact', head: false }),
        supabase.from('comments').select('*', { count: 'exact', head: false }),
        supabase.from('likes').select('*', { count: 'exact', head: false })
      ]);

      // Calculate stats
      const openCareersCount = careers.data?.filter(c => c.status === 'open').length || 0;

      setStats({
        totalContactSubmissions: contactSubmissions.data?.length || 0,
        totalConsultationRequests: consultationRequests.data?.length || 0,
        totalCareers: careers.data?.length || 0,
        openCareers: openCareersCount,
        totalPosts: posts.data?.length || 0,
        totalEvents: events.data?.length || 0,
        totalComments: comments.data?.length || 0,
        totalLikes: likes.data?.length || 0,
      });

      // Build recent activities from multiple sources
      const activities: RecentActivity[] = [];

      // Add recent contact submissions
      contactSubmissions.data?.slice(0, 3).forEach(contact => {
        activities.push({
          id: contact.id,
          title: `New contact from ${contact.name}`,
          time: formatTimeAgo(contact.created_at),
          type: 'contact',
          icon: <Mail className="h-5 w-5" />,
          color: '#3b82f6'
        });
      });

      // Add recent consultation requests
      consultationRequests.data?.slice(0, 3).forEach(consultation => {
        activities.push({
          id: consultation.id,
          title: `Consultation request from ${consultation.full_name}`,
          time: formatTimeAgo(consultation.created_at),
          type: 'consultation',
          icon: <MessageSquare className="h-5 w-5" />,
          color: '#10b981'
        });
      });

      // Add recent career postings
      careers.data?.slice(0, 2).forEach(career => {
        activities.push({
          id: career.id,
          title: `Career posted: ${career.title}`,
          time: formatTimeAgo(career.created_at),
          type: 'career',
          icon: <Briefcase className="h-5 w-5" />,
          color: '#f59e0b'
        });
      });

      // Sort by most recent and take top 5
      activities.sort((a, b) => {
        const timeA = a.time.includes('minute') || a.time.includes('hour') ? 0 : 1;
        const timeB = b.time.includes('minute') || b.time.includes('hour') ? 0 : 1;
        return timeA - timeB;
      });

      setRecentActivities(activities.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const statCards = [
    {
      title: 'Contact Submissions',
      value: stats.totalContactSubmissions,
      icon: <Mail className="h-8 w-8" />,
      description: 'Total inquiries',
      color: '#3b82f6'
    },
    {
      title: 'Consultation Requests',
      value: stats.totalConsultationRequests,
      icon: <MessageSquare className="h-8 w-8" />,
      description: 'Pending consultations',
      color: '#10b981'
    },
    {
      title: 'Open Positions',
      value: stats.openCareers,
      icon: <Briefcase className="h-8 w-8" />,
      description: `${stats.totalCareers} total careers`,
      color: '#f59e0b'
    },
    {
      title: 'Blog Posts',
      value: stats.totalPosts,
      icon: <FileText className="h-8 w-8" />,
      description: `${stats.totalLikes} total likes`,
      color: '#8b5cf6'
    },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-500 text-sm mb-2 font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-400">
                  {stat.description}
                </p>
              </div>
              <div 
                className="p-3 rounded-lg" 
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <button 
              onClick={fetchDashboardData}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Refresh
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div 
                    className="flex-shrink-0 p-2 rounded-lg"
                    style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                  </div>
                  <span 
                    className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                    style={{ 
                      backgroundColor: `${activity.color}15`, 
                      color: activity.color 
                    }}
                  >
                    {activity.type}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent activities</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-6">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">Events</span>
              </div>
              <span className="text-2xl font-bold">{stats.totalEvents}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Comments</span>
              </div>
              <span className="text-2xl font-bold">{stats.totalComments}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Total Likes</span>
              </div>
              <span className="text-2xl font-bold">{stats.totalLikes}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Open Careers</span>
              </div>
              <span className="text-2xl font-bold">{stats.openCareers}</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white border-opacity-20">
            <div className="text-center">
              <p className="text-sm text-blue-100 mb-2">Last updated</p>
              <p className="text-xs text-blue-200">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;