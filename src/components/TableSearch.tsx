'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const TableSearch = () => {
  const router = useRouter();
  const params = useSearchParams();

  const search = params.get('search') || '';

  const changeSearchQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={changeSearchQuery}
      className="flex w-full items-center gap-1.5 rounded-full px-2 text-xs ring-[1.5px] ring-gray-300 md:flex md:w-auto"
    >
      <Image src="/search.png" width={14} height={14} alt="Search" />
      <input
        type="text"
        placeholder="Search ..."
        className="w-[200px] bg-transparent p-1.5 outline-none lg:w-[300px] xl:w-[400px]"
        defaultValue={search}
      />
    </form>
  );
};

export default TableSearch;
