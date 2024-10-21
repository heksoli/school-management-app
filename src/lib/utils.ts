import { Parent, Student, Teacher } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

import { LOCALE } from '@/lib/settings';
import { MetaData, Role } from '@/lib/types';

export const displayDate = (date: Date) => Intl.DateTimeFormat(LOCALE).format(date);

export const displayTime = (date: Date) =>
  Intl.DateTimeFormat(LOCALE, { timeStyle: 'short' }).format(date);

export const displayFullname = (item: Teacher | Student | Parent) => `${item.name} ${item.surname}`;

export const getUserDetails = (): { role: Role; currentUserId: string } => {
  const { sessionClaims } = auth();

  const role = (sessionClaims?.metadata as MetaData).role as Role;
  const currentUserId = (sessionClaims?.metadata as MetaData).id as string;

  return { role, currentUserId };
};
