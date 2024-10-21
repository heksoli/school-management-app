import moment from 'moment/moment';
import { Prisma } from '@prisma/client';
import Link from 'next/link';

import prisma from '@/lib/prisma';
import { displayDate, getUserDetails } from '@/lib/utils';

const { role, currentUserId } = getUserDetails();

const Announcements = async ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const selectedDate = searchParams.date ? moment(searchParams.date) : moment(Date.now());

  const whereClause: Prisma.AnnouncementWhereInput = {
    date: {
      gte: selectedDate.startOf('day').toDate(),
      lte: selectedDate.endOf('day').toDate()
    }
  };

  switch (role) {
    case 'teacher':
      whereClause.OR = [
        { classId: null },
        { class: { lessons: { some: { teacherId: currentUserId } } } }
      ];
      break;

    case 'student':
      whereClause.OR = [
        { classId: null },
        { class: { students: { some: { id: currentUserId } } } }
      ];
      break;

    case 'parent':
      whereClause.OR = [
        { classId: null },
        { class: { students: { some: { parentId: currentUserId } } } }
      ];
      break;

    // admin
    default:
      break;
  }

  const announcements = await prisma.announcement.findMany({
    where: whereClause,
    orderBy: { date: 'desc' },
    take: 3
  });

  return (
    <div className="rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <Link
          href={`/lists/announcements?date=${moment(selectedDate).format('YYYY-MM-DD')}`}
          className="text-xs text-gray-500"
        >
          View all
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {announcements.map((announcement) => (
          <div className="rounded-md bg-custom-sky-light p-4" key={announcement.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-600">{announcement.title}</h2>
              <span className="rounded-md bg-white px-2 py-1 text-xs text-gray-400">
                {displayDate(announcement.date)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
