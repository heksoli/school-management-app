import React from 'react';

import EventsCalendar from '@/components/EventsCalendar';
import Announcements from '@/components/Announcements';
import ScheduleCalendar from '@/components/ScheduleCalendar';

const StudentPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full rounded-xl bg-white p-4">
          <h1 className="p-4 text-lg font-semibold">Schedule (10B)</h1>
          <ScheduleCalendar />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 xl:w-1/3">
        <EventsCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
