'use client';

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { calendarEvents } from '@/lib/data';

const localizer = momentLocalizer(moment);

const ScheduleCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={['work_week', 'day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleOnChangeView}
      min={moment(Date.now()).hours(7).startOf('hour').toDate()}
      max={moment(Date.now()).hours(17).endOf('hour').toDate()}
    />
  );
};

export default ScheduleCalendar;
