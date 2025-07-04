
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Book, Calendar, LayoutDashboard, UserCheck, Clock } from 'lucide-react';

const DashboardHome: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      icon: Users,
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      title: 'Active Classes',
      value: '45',
      icon: Book,
      change: '+3%',
      changeType: 'increase' as const,
    },
    {
      title: 'Teachers',
      value: '67',
      icon: Users,
      change: '+5%',
      changeType: 'increase' as const,
    },
    {
      title: 'Today\'s Classes',
      value: '23',
      icon: Calendar,
      change: '-2%',
      changeType: 'decrease' as const,
    },
  ];

  const upcomingFeatures = [
    {
      title: 'Bio Matrix Attendance',
      icon: UserCheck,
      description: 'Automated attendance using biometric data'
    },
    {
      title: 'Class & Exam Schedule',
      icon: Clock,
      description: 'Advanced scheduling system with notifications'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-600 mt-2">Here's what's happening at your school today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs mt-1 ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Features Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-2 border-dashed border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-red-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      upcoming
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New student enrolled</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Class assignment submitted</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Teacher schedule updated</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                <p className="text-xs text-gray-500">Tomorrow, 2:00 PM</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm font-medium">Science Fair</p>
                <p className="text-xs text-gray-500">Friday, 10:00 AM</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm font-medium">Exam Week</p>
                <p className="text-xs text-gray-500">Next Monday</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
