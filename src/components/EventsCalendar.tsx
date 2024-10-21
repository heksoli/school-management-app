import Image from 'next/image';

import EventsCalendarContainer from '@/components/EventsCalendarContainer';
import EventsList from '@/components/EventsList';

const EventsCalendar = ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const { date } = searchParams;

  return (
    <div className="rounded-xl bg-white p-4">
      <EventsCalendarContainer />
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-xl font-semibold">Events</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="more" />
      </div>
      <div>
        <EventsList date={date} />
      </div>
    </div>
  );
};

export default EventsCalendar;
