import Image from 'next/image';
import { Parent, Prisma, Student } from '@prisma/client';

import TableSearch from '@/components/TableSearch';
import TablePagination from '@/components/TablePagination';
import Table from '@/components/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { ITEMS_PER_PAGE } from '@/lib/settings';
import { getUserDetails } from '@/lib/utils';

const { role } = getUserDetails();

const columns = [
  { header: 'Info', accessor: 'info', className: 'pl-2' },
  { header: 'Parent Id', accessor: 'parentId', className: 'hidden md:table-cell pl-2' },
  { header: 'Students', accessor: 'students', className: 'hidden md:table-cell pl-2' },
  { header: 'Email', accessor: 'email', className: 'hidden lg:table-cell' },
  { header: 'Phone', accessor: 'phone', className: 'hidden lg:table-cell' },
  { header: 'Address', accessor: 'address', className: 'hidden lg:table-cell' },
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

type ParentList = Parent & { students: Student[] };

const renderRow = (item: ParentList) => {
  return (
    <tr
      key={`row-${item.id}`}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-custom-purple-light"
    >
      <td className="flex items-center gap-2 p-2">
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {item.name} {item.surname}
          </h3>
          <p className="text-xs text-gray-400">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => `${student.name} ${student.surname}`).join(', ')}
      </td>
      <td className="hidden lg:table-cell">{item.email}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {role === 'admin' && <FormModal table="parent" type="update" data={item} />}
          {role === 'admin' && <FormModal table="parent" type="delete" id={item.id} />}
        </div>
      </td>
    </tr>
  );
};

const ParentsList = async ({ searchParams }: { searchParams: { [_key: string]: string } }) => {
  const { page, ...queryParams } = searchParams;

  const currentPage = page ? parseInt(page) : 1;

  const query: Prisma.ParentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'id':
            query.id = value;
            break;

          case 'search':
            query.OR = [
              { name: { contains: value, mode: 'insensitive' } },
              { surname: { contains: value, mode: 'insensitive' } }
            ];
            break;
        }
      }
    }
  }

  console.log(query);

  const [parents, count] = await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include: { students: true },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (currentPage - 1)
    }),
    prisma.parent.count({ where: query })
  ]);

  return (
    <div className="m-4 flex-1 rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">Parents List</h1>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
          <TableSearch />
          <div className="flex items-center gap-3 self-end">
            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/filter.png" width={14} height={14} alt="Filter" />
            </button>

            <button className="flex size-8 items-center justify-center rounded-full bg-custom-yellow">
              <Image src="/sort.png" width={14} height={14} alt="Sort" />
            </button>

            {role === 'admin' && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={parents} />
      </div>
      <div className="">
        <TablePagination page={currentPage} count={count} />
      </div>
    </div>
  );
};

export default ParentsList;
