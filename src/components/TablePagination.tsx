'use client';

import { useRouter } from 'next/navigation';

import { ITEMS_PER_PAGE } from '@/lib/settings';

interface TablePaginationProps {
  page: number;
  count: number;
}

const TablePagination = ({ page, count }: TablePaginationProps) => {
  const router = useRouter();

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  const changePage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="flex items-center justify-between px-4 pt-4 text-gray-500">
      <button
        disabled={!hasPrev}
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page - 1)}
      >
        prev
      </button>
      <div className="flex items-center justify-between gap-2">
        {Array.from({ length: Math.ceil(count / ITEMS_PER_PAGE) }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`rounded-md px-2 py-1 text-xs ${pageIndex === page ? 'bg-custom-sky' : ''}`}
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        disabled={!hasNext}
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => changePage(page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default TablePagination;
