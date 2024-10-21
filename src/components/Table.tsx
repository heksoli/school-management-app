import React from 'react';

import { Teacher } from '@/app/(dashboard)/lists/teachers/page';
import { Student } from '@/app/(dashboard)/lists/students/page';
import { Parent } from '@/app/(dashboard)/lists/parents/page';
import { Subject } from '@/app/(dashboard)/lists/subjects/page';
import { Class } from '@/app/(dashboard)/lists/classes/page';
import { Exam } from '@/app/(dashboard)/lists/exams/page';

interface TableProps {
  columns: { header: string; accessor: string; className?: string }[];
  data: Teacher[] | Parent[] | Student[] | Subject[] | Class[] | Exam[];
  renderRow: (row: Teacher | Parent | Student | Subject | Class | Exam) => React.ReactNode;
}

const Table = ({ columns, data, renderRow }: TableProps) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          {columns.map((column) => (
            <td key={column.accessor} className={column.className}>
              {column.header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((row) => renderRow(row))}</tbody>
    </table>
  );
};

export default Table;
