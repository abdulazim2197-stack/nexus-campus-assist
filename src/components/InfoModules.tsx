import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const InfoModules = () => {
  const [activeTab, setActiveTab] = useState('events');

  const eventsContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b-2 border-secondary">
        Upcoming Campus Events
      </h3>
      {[
        {
          title: "Annual Science Symposium",
          description: "Join us for presentations on cutting-edge research",
          date: "October 15, 2025 | 10:00 AM - 4:00 PM"
        },
        {
          title: "Career Fair 2025",
          description: "Meet top employers and explore career opportunities",
          date: "October 22, 2025 | 9:00 AM - 3:00 PM"
        },
        {
          title: "International Food Festival",
          description: "Experience culinary delights from around the world",
          date: "November 5, 2025 | 12:00 PM - 5:00 PM"
        }
      ].map((event, index) => (
        <div key={index} className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-semibold text-card-foreground">{event.title}</h4>
          <p className="text-muted-foreground mt-1">{event.description}</p>
          <div className="text-secondary font-medium mt-2">{event.date}</div>
        </div>
      ))}
    </div>
  );

  const academicContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b-2 border-secondary">
        Academic Calendar
      </h3>
      {[
        {
          title: "Fall Semester 2025",
          description: "Classes begin: August 28, 2025",
          date: "Midterm exams: October 16-20, 2025"
        },
        {
          title: "Thanksgiving Break",
          description: "No classes: November 22-26, 2025",
          date: "Classes resume: November 27, 2025"
        },
        {
          title: "Final Exams",
          description: "December 11-15, 2025",
          date: "Semester ends: December 15, 2025"
        }
      ].map((item, index) => (
        <div key={index} className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-semibold text-card-foreground">{item.title}</h4>
          <p className="text-muted-foreground mt-1">{item.description}</p>
          <div className="text-secondary font-medium mt-2">{item.date}</div>
        </div>
      ))}
    </div>
  );

  const facilitiesContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b-2 border-secondary">
        Facility Operating Hours
      </h3>
      {[
        {
          title: "Main Library",
          description: "Monday-Friday: 8:00 AM - 10:00 PM",
          date: "Weekends: 10:00 AM - 8:00 PM"
        },
        {
          title: "Student Recreation Center",
          description: "Monday-Friday: 6:00 AM - 11:00 PM",
          date: "Weekends: 8:00 AM - 9:00 PM"
        },
        {
          title: "Cafeteria",
          description: "Monday-Friday: 7:30 AM - 8:00 PM",
          date: "Weekends: 9:00 AM - 7:00 PM"
        }
      ].map((facility, index) => (
        <div key={index} className="p-4 bg-muted rounded-lg border-l-4 border-primary">
          <h4 className="font-semibold text-card-foreground">{facility.title}</h4>
          <p className="text-muted-foreground mt-1">{facility.description}</p>
          <div className="text-secondary font-medium mt-2">{facility.date}</div>
        </div>
      ))}
    </div>
  );

  const tabs: TabData[] = [
    {
      id: 'events',
      label: 'Campus Events',
      icon: <Calendar className="w-4 h-4" />,
      content: eventsContent
    },
    {
      id: 'academic',
      label: 'Academic Schedule',
      icon: <Clock className="w-4 h-4" />,
      content: academicContent
    },
    {
      id: 'facilities',
      label: 'Facility Timings',
      icon: <MapPin className="w-4 h-4" />,
      content: facilitiesContent
    }
  ];

  return (
    <Card className="bg-campus-card backdrop-blur-sm shadow-campus-card">
      <CardHeader className="pb-4">
        <div className="flex space-x-1 border-b border-border">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex items-center space-x-2 rounded-b-none transition-smooth ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px]">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoModules;