import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Book, Calendar, UserCheck, Clock } from "lucide-react";
import { useDashboardHome } from "@/hooks/useDashboardHome";

interface DashboardHomeProps {
  schoolId: string;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ schoolId }) => {
  const {
    data: statsData,
    isLoading,
    isError,
    error,
  } = useDashboardHome(schoolId);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(isLoading);

  // Detect if it's a first-time user
  useEffect(() => {
    const firstTimeFlag = localStorage.getItem("isFirstTimeUser");
    if (firstTimeFlag === null) {
      localStorage.setItem("isFirstTimeUser", "false");
      setIsFirstTime(true);
    }
  }, []);

  // if (isLoading) return <h1>Loading data...</h1>;
  // if (isError) return <h1>Error: {(error as Error).message}</h1>;

  if (isFirstTime) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome to Your Dashboard! 🎉
        </h2>
        <p className="text-gray-600 mt-2">
          Let’s get you started with a few setup steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Your First Class</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Start by adding your first class to begin managing students.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Go to Classes
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invite Teachers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Send an invite to your teaching staff so they can log in.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Invite Teachers
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Set Attendance Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">
                Choose how attendance should be tracked.
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Set Preferences
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="text-sm text-gray-500 mt-6">
          Already set things up?{" "}
          <button
            className="underline text-blue-600"
            onClick={() => setIsFirstTime(false)}
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }

  // Regular dashboard stats
  const stats = [
    {
      title: "Total Students",
      value: statsData?.totalStudents ?? 0,
      icon: Users,
      change: "+12%",
      changeType: "increase" as const,
    },
    {
      title: "Total Classes",
      value: statsData?.totalClasses ?? 0,
      icon: Book,
      change: "+3%",
      changeType: "increase" as const,
    },
    {
      title: "Teachers",
      value: statsData?.totalTeachers ?? 0,
      icon: Users,
      change: "+5%",
      changeType: "increase" as const,
    },
    {
      title: "Total Present Students",
      value: statsData?.presentStudents ?? 0,
      icon: Calendar,
      change: "-2%",
      changeType: "decrease" as const,
    },
  ];

  const upcomingFeatures = [
    {
      title: "Bio Matrix Attendance",
      icon: UserCheck,
      description: "Automated attendance using biometric data",
    },
    {
      title: "Class & Exam Schedule",
      icon: Clock,
      description: "Advanced scheduling system with notifications",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back!
        </h2>
        <p className="text-gray-600 mt-2">
          Here's what's happening at your school today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ... Keep your other cards like "Recent Activities", "Upcoming Events", and "Upcoming Features" here ... */}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-2 border-dashed border-red-200 bg-red-50"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-red-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
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
    </div>
  );
};

export default DashboardHome;
