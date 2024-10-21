import Image from 'next/image';
import { Assignment, Class, Exam, Lesson, Prisma, Result, Student, Teacher } from '@prisma/client';

import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import { displayDate, displayFullname, getUserDetails } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/settings';

const { role, currentUserId } = getUserDetails();

const columns = [
  { header: 'Title', accessor: 'info', className: 'pl-2' },
  { header: 'Class', accessor: 'class', className: '' },
  { header: 'Teacher', accessor: 'teacher', className: 'hidden md:table-cell' },
  { header: 'Student', accessor: 'student', className: 'hidden md:table-cell' },
  { header: 'Date', accessor: 'date', className: 'hidden md:table-cell' },
  { header: 'Type', accessor: 'type', className: 'hidden md:table-cell' },
  { header: 'Score', accessor: 'score', className: 'hidden md:table-cell' },
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

type ResultList = Result & {
  student: Student;
  exam: Exam & { lesson: Lesson & { class: Class; teacher: Teacher } };
  assignment: Assignment & { lesson: Lesson & { class: Class; teacher: Teacher } };
};

const renderRow = (item: ResultList) => {
  const isExam = item.exam && 'startTime' in item.exam;
  const isAssignment = item.assignment && 'startDate' in item.assignment;

  return (
    <tr
      key={`row-${item.id}`}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-custom-purple-light"
    >
      <td>
        {isExam && item.exam.title}
        {isAssignment && item.assignment.title}
      </td>
      <td>
        {isExam && item.exam.lesson.class.name}
        {isAssignment && item.assignment.lesson.class.name}
      </td>
      <td className="hidden md:table-cell">
        {isExam && displayFullname(item.exam.lesson.teacher)}
        {isAssignment && displayFullname(item.assignment.lesson.teacher)}
      </td>
      <td className="hidden md:table-cell">{displayFullname(item.student)}</td>
      <td className="hidden md:table-cell">
        {isExam && displayDate(item.exam.startTime)}
        {isAssignment && displayDate(item.assignment.startDate)}
      </td>
      <td className="hidden md:table-cell">{isExam ? 'exam' : 'assignment'}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {['admin', 'teacher'].includes(role) && (
            <FormModal table="result" type="update" data={item} />
          )}
          {['admin', 'teacher'].includes(role) && (
            <FormModal table="result" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
};

const ResultsList = async ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: Prisma.ResultWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'id':
            query.id = value;
            break;

          case 'search':
            query.OR = [
              { exam: { title: { contains: value, mode: 'insensitive' } } },
              { assignment: { title: { contains: value, mode: 'insensitive' } } },
              {
                student: {
                  OR: [
                    { name: { contains: value, mode: 'insensitive' } },
                    { surname: { contains: value, mode: 'insensitive' } }
                  ]
                }
              }
            ];
            break;

          case 'studentId':
            query.studentId = value;
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case 'teacher':
      query.OR = [
        { exam: { lesson: { teacherId: currentUserId } } },
        { assignment: { lesson: { teacherId: currentUserId } } }
      ];
      break;

    case 'student':
      query.studentId = currentUserId;
      break;

    case 'parent':
      query.student = { parentId: currentUserId };
      break;

    // admin
    default:
      break;
  }

  console.log(query);

  const [results, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } }
              }
            }
          }
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } }
              }
            }
          }
        }
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1)
    }),
    prisma.result.count({ where: query })
  ]);

  return (
    <div className="m-4 flex-1 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">Results List</h1>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {role === 'admin' && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={results} />
      </div>
      <div className="">
        <TablePagination page={currentPage} count={count} />
      </div>
    </div>
  );
};

export default ResultsList;
