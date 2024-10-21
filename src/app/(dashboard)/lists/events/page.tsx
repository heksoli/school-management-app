import Image from 'next/image';
import { Class, Event, Prisma } from '@prisma/client';

import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/settings';
import { displayDate, displayTime, getUserDetails } from '@/lib/utils';

const { role, currentUserId } = getUserDetails();

const columns = [
  { header: 'Event', accessor: 'event', className: 'pl-2' },
  { header: 'Class', accessor: 'class', className: '' },
  { header: 'Date', accessor: 'date', className: 'hidden md:table-cell' },
  { header: 'Start', accessor: 'type', className: 'hidden md:table-cell' },
  { header: 'End', accessor: 'score', className: 'hidden md:table-cell' },
  ...(role === 'admin'
    ? [
        {
          header: 'Actions',
          accessor: 'actions',
          className: 'flex items-center justify-center p-0'
        }
      ]
    : [])
];

type EventList = Event & { class: Class };

const renderRow = (item: EventList) => {
  return (
    <tr
      key={`row-${item.id}`}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-custom-purple-light"
    >
      <td>{item.title}</td>
      <td>{item.class?.name || '-'}</td>
      <td className="hidden md:table-cell">{displayDate(item.startDate)}</td>
      <td className="hidden md:table-cell">{displayTime(item.startDate)}</td>
      <td className="hidden md:table-cell">{displayTime(item.endDate)}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {role === 'admin' && <FormModal table="event" type="update" data={item} />}
          {role === 'admin' && <FormModal table="event" type="delete" id={item.id} />}
        </div>
      </td>
    </tr>
  );
};

const EventsList = async ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: Prisma.EventWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'id':
            query.id = value;
            break;

          case 'search':
            query.title = { contains: value, mode: 'insensitive' };
            break;

          case 'classId':
            query.classId = value;
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case 'teacher':
      query.OR = [
        { classId: null },
        { class: { lessons: { some: { teacherId: currentUserId } } } }
      ];
      break;

    case 'student':
      query.class = { students: { some: { id: currentUserId } } };
      break;

    case 'parent':
      query.class = { students: { some: { parentId: currentUserId } } };
      break;

    // admin
    default:
      break;
  }

  console.log(query);

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: {
          select: {
            name: true
          }
        }
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1)
    }),
    prisma.event.count({ where: query })
  ]);

  return (
    <div className="m-4 flex-1 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">Events List</h1>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {role === 'admin' && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={events} />
      </div>
      <div className="">
        <TablePagination page={currentPage} count={count} />
      </div>
    </div>
  );
};

export default EventsList;
