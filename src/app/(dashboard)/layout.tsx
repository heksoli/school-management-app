import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <div className="w-[14%] p-4 md:w-[10%] lg:w-[16%] xl:w-[14%]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 lg:justify-start"
          title="SchoolSync"
        >
          <Image src="/logo.svg" alt="SchoolSync" width={32} height={32} />
          <span className="hidden font-bold lg:block">SchoolSync</span>
        </Link>
        <Menu />
      </div>
      <div className="w-[86%] overflow-scroll bg-[#F7F8FA] md:w-[90%] lg:w-[84%] xl:w-[86%]">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
