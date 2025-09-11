
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Bell, Calendar, User, Megaphone } from 'lucide-react';
import { log } from 'console';
import { useAnnouncement } from '@/hooks/useAnnouncement';

const Announcements: React.FC = () => {
  // const announcements = [
  //   {
  //     id: 1,
  //     title: 'School Holiday - Independence Day',
  //     content: 'School will be closed on August 15th for Independence Day celebration.',
  //     author: 'Principal Office',
  //     date: '2024-07-01',
  //     priority: 'high' as const,
  //   },
  //   {
  //     id: 2,
  //     title: 'Parent-Teacher Meeting',
  //     content: 'Monthly parent-teacher meeting scheduled for this Friday at 2:00 PM.',
  //     author: 'Academic Office',
  //     date: '2024-07-02',
  //     priority: 'medium' as const,
  //   },
  //   {
  //     id: 3,
  //     title: 'New Library Books Available',
  //     content: 'New collection of science and literature books are now available in the library.',
  //     author: 'Library Department',
  //     date: '2024-07-03',
  //     priority: 'low' as const,
  //   },
  // ];

  // const [announcements, setAnnouncements] = useState([]);

  // useEffect(()=>{
  //   try{
  //     const announcement = fetch("")
  //   }catch( err){
  //     console.log("Error while fecthing the data",err);

  //   }
  // })

  const { data: announcements, isLoading, error } = useAnnouncement();

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Announcements</h2>
          <p className="text-gray-600 mt-2">Stay updated with school news and events</p>
        </div>
        <Button className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>New Announcement</span>
        </Button>
      </div>
      {Array.isArray(announcements) && announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements?.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary-600" />
                    <span className="text-lg">{announcement.title}</span>
                  </CardTitle>
                  {/* <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority} priority
                </span> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{announcement.detail}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{announcement.announcedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 mt-12">
          <div className="bg-gray-200 rounded-full p-4 mb-4">
            <Megaphone className="h-12 w-12 text-primary-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-800 mb-2">
            No Announcements Found
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-md mb-6">
            📢 You haven’t posted any announcements yet. Keep your students informed by creating one now.
          </p>
          <Button
            onClick={() => openModal("add")}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Announcement</span>
          </Button>
        </div>

      )}

    </div>
  );
};

export default Announcements;
