import Image from 'next/image';

import { Role } from '@/lib/types';
import prisma from '@/lib/prisma';

type UserCardProps = { type: Role };

const UserCard = async ({ type }: UserCardProps) => {
  const modelMapping: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent
  };

  const data = await modelMapping[type].count();

  return (
    <div className="min-w-[130px] flex-1 rounded-xl p-4 odd:bg-custom-purple even:bg-custom-yellow">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white px-2 py-1 text-xs text-green-600">Fri, Oct 11</span>
        <Image src="/more.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <h1 className="my-4 text-2xl font-semibold">{data}</h1>
      <h2 className="text-sm font-medium capitalize text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
