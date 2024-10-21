import moment from 'moment';

import prisma from '@/lib/prisma';
import { displayTime } from '@/lib/utils';

const EventsList = async ({ date }: { date: string | undefined }) => {
  const selectedDate = date ? moment(date) : moment(Date.now());

  const events = await prisma.event.findMany({
    where: {
      startDate: {
        gte: selectedDate.startOf('day').toDate(),
        lte: selectedDate.endOf('day').toDate()
      }
    },
    orderBy: { startDate: 'asc' }
  });

  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-xl border border-t-2 border-gray-100 p-4 odd:border-t-custom-yellow even:border-t-custom-purple"
        >
          <div className="flex items-center justify-between">
            <h2 className="line-clamp-2 font-semibold text-gray-600">{event.title}</h2>
            <span className="text-xs text-gray-300">{displayTime(event.startDate)}</span>
          </div>
          <p className="mt-2 text-sm text-gray-400">{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
