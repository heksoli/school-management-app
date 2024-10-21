import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';

import { MetaData } from '@/lib/types';

const menuItems = [
  {
    title: 'MENU',
    items: [
      {
        icon: '/home.png',
        label: 'Home',
        href: '/admin',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/teacher.png',
        label: 'Teachers',
        href: '/lists/teachers',
        visible: ['admin', 'teacher']
      },
      {
        icon: '/student.png',
        label: 'Students',
        href: '/lists/students',
        visible: ['admin', 'teacher']
      },
      {
        icon: '/parent.png',
        label: 'Parents',
        href: '/lists/parents',
        visible: ['admin', 'teacher']
      },
      {
        icon: '/subject.png',
        label: 'Subjects',
        href: '/lists/subjects',
        visible: ['admin']
      },
      {
        icon: '/class.png',
        label: 'Classes',
        href: '/lists/classes',
        visible: ['admin', 'teacher']
      },
      {
        icon: '/lesson.png',
        label: 'Lessons',
        href: '/lists/lessons',
        visible: ['admin', 'teacher']
      },
      {
        icon: '/exam.png',
        label: 'Exams',
        href: '/lists/exams',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/assignment.png',
        label: 'Assignments',
        href: '/lists/assignments',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/result.png',
        label: 'Results',
        href: '/lists/results',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/attendance.png',
        label: 'Attendance',
        href: '/lists/attendance',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/calendar.png',
        label: 'Events',
        href: '/lists/events',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/message.png',
        label: 'Messages',
        href: '/lists/messages',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/announcement.png',
        label: 'Announcements',
        href: '/lists/announcements',
        visible: ['admin', 'teacher', 'student', 'parent']
      }
    ]
  },
  {
    title: 'OTHER',
    items: [
      {
        icon: '/profile.png',
        label: 'Profile',
        href: '/profile',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/setting.png',
        label: 'Settings',
        href: '/settings',
        visible: ['admin', 'teacher', 'student', 'parent']
      },
      {
        icon: '/logout.png',
        label: 'Logout',
        href: '/logout',
        visible: ['admin', 'teacher', 'student', 'parent']
      }
    ]
  }
];

const { sessionClaims } = auth();
const role = (sessionClaims?.metadata as MetaData)?.role;

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="my-4 hidden font-light text-gray-400 lg:block">{section.title}</span>
          {section.items.map(
            (link) =>
              link.visible.includes(role!) && (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-center rounded-md py-1.5 text-gray-500 hover:bg-custom-sky-light md:px-2 lg:justify-start"
                >
                  <Image
                    src={link.icon}
                    width={20}
                    height={20}
                    alt={`SchoolSync - ${link.label}`}
                    title={`SchoolSync - ${link.label}`}
                  />
                  <span className="ml-2 hidden lg:block">{link.label}</span>
                </Link>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
