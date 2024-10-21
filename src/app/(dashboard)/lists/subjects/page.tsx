import Image from 'next/image';
import { Prisma, Subject, Teacher } from '@prisma/client';

import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/settings';
import { getUserDetails } from '@/lib/utils';

const { role } = getUserDetails();

const columns = [
  { header: 'Name', accessor: 'info', className: 'pl-2' },
  { header: 'Teachers', accessor: 'teachers', className: 'hidden md:table-cell' },
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

export type SubjectList = Subject & { teachers: Teacher[] };

const renderRow = (item: SubjectList) => {
  return (
    <tr
      key={`row-${item.id}`}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-custom-purple-light"
    >
      <td>{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => `${teacher.name} ${teacher.surname}`).join(', ')}
      </td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {role === 'admin' && <FormModal table="subject" type="update" data={item} />}
          {role === 'admin' && <FormModal table="subject" type="delete" id={item.id} />}
        </div>
      </td>
    </tr>
  );
};

const SubjectsList = async ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: Prisma.SubjectWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'id':
            query.id = value;
            break;

          case 'search':
            query.name = { contains: value, mode: 'insensitive' };

            break;

          case 'teacherId':
            query.teachers = { some: { id: value } };
            break;
        }
      }
    }
  }

  console.log(query);

  const [subjects, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: { teachers: true },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1)
    }),
    prisma.subject.count({ where: query })
  ]);

  return (
    <div className="m-4 flex-1 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">Subjects List</h1>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {role === 'admin' && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={subjects} />
      </div>
      <div className="">
        <TablePagination page={currentPage} count={count} />
      </div>
    </div>
  );
};

export default SubjectsList;
