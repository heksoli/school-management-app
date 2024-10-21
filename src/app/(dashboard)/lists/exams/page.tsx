import Image from 'next/image';
import { Class, Exam, Lesson, Prisma, Subject, Teacher } from '@prisma/client';

import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/settings';
import { displayDate, displayFullname, getUserDetails } from '@/lib/utils';

const { role, currentUserId } = getUserDetails();

const columns = [
  { header: 'Subject', accessor: 'info', className: 'pl-2' },
  { header: 'Class', accessor: 'class', className: '' },
  { header: 'Teacher', accessor: 'teacher', className: 'hidden md:table-cell' },
  { header: 'Date', accessor: 'date', className: 'hidden md:table-cell' },
  ...(['admin', 'teacher'].includes(role)
    ? [
        {
          header: 'Actions',
          accessor: 'actions',
          className: 'flex items-center justify-center p-0'
        }
      ]
    : [])
];

type ExamList = Exam & { lesson: Lesson & { subject: Subject; teacher: Teacher; class: Class } };

const renderRow = (item: ExamList) => {
  return (
    <tr
      key={`row-${item.id}`}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-custom-purple-light"
    >
      <td>{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{displayFullname(item.lesson.teacher)}</td>
      <td className="hidden md:table-cell">{displayDate(item.startTime)}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {['admin', 'teacher'].includes(role) && (
            <FormModal table="exam" type="update" data={item} />
          )}
          {['admin', 'teacher'].includes(role) && (
            <FormModal table="exam" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

const ExamsList = async ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: Prisma.ExamWhereInput = {};
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

          case 'teacherId':
            query.lesson = { teacherId: value };
            break;

          case 'classId':
            query.lesson = { classId: value };
            break;

          case 'subjectId':
            query.lesson = { subjectId: value };
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case 'teacher':
      query.lesson = { teacherId: currentUserId };
      break;

    case 'student':
      query.lesson = { class: { students: { some: { id: currentUserId } } } };
      break;

    case 'parent':
      query.lesson = { class: { students: { some: { parentId: currentUserId } } } };
      break;

    // admin
    default:
      break;
  }

  console.log(query);

  const [exams, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } }
          }
        }
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1)
    }),
    prisma.exam.count({ where: query })
  ]);

  return (
    <div className="m-4 flex-1 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">Exams List</h1>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {['admin', 'teacher'].includes(role) && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={exams} />
      </div>
      <div className="">
        <TablePagination page={currentPage} count={count} />
      </div>
    </div>
  );
};

export default ExamsList;
