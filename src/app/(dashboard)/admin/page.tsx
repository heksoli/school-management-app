import React from 'react';

import UserCard from '@/components/UserCard';
import CountChart from '@/components/CountChart';
import AttendanceChart from '@/components/AttendanceChart';
import FinanceChart from '@/components/FinanceChart';
import EventsCalendar from '@/components/EventsCalendar';
import Announcements from '@/components/Announcements';

const AdminPage = ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      <div className="flex w-full flex-col gap-4 lg:w-2/3">
        <div className="flex flex-wrap justify-between gap-4">
          <UserCard type="admin" />
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div className="h-[450px] w-full lg:w-1/3">
            <CountChart />
          </div>
          <div className="h-[450px] w-full lg:w-2/3">
            <AttendanceChart />
          </div>
        </div>
        <div className="h-[500px] w-full">
          <FinanceChart />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 lg:w-1/3">
        <EventsCalendar searchParams={searchParams} />
        <Announcements searchParams={searchParams} />
      </div>
    </div>
  );
};

export default AdminPage;
