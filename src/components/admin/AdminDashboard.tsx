import { useState } from 'react';
import { Users, Calendar, Settings, BarChart } from 'lucide-react';
import { AdminStats as AdminStatsType } from '../../types/admin';
import AdminUserList from './AdminUserList';
import AdminEventList from './AdminEventList';
import AdminSettings from './AdminSettings';
import AdminStats from './AdminStats';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'events' | 'settings'>('overview');

  const mockStats: AdminStatsType = {
    totalUsers: 150,
    totalEvents: 45,
    activeEvents: 12,
    totalRevenue: 25000,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          </div>
          <nav className="mt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-2 text-sm ${
                activeTab === 'overview'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart className="h-5 w-5 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-4 py-2 text-sm ${
                activeTab === 'users'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center px-4 py-2 text-sm ${
                activeTab === 'events'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-2 text-sm ${
                activeTab === 'settings'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && <AdminStats stats={mockStats} />}
          {activeTab === 'users' && <AdminUserList />}
          {activeTab === 'events' && <AdminEventList />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
}