'use client';

import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventsCalendarContainer = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) router.push(`?date=${moment(value).format('YYYY-MM-DD')}`);
  }, [router, value]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventsCalendarContainer;
