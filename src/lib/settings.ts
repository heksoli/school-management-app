export const ITEMS_PER_PAGE = 10;
export const LOCALE = 'ro-RO';

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  '/admin(.*)': ['admin'],
  '/student(.*)': ['student'],
  '/teacher(.*)': ['teacher'],
  '/parent(.*)': ['parent'],

  '/lists/lessons': ['admin'],
  '/lists/subjects': ['admin'],

  '/lists/teachers': ['admin', 'teacher'],
  '/lists/students': ['admin', 'teacher'],
  '/lists/parents': ['admin', 'teacher'],
  '/lists/classes': ['admin', 'teacher'],

  '/lists/exams': ['admin', 'teacher', 'student', 'parent'],
  '/lists/assignments': ['admin', 'teacher', 'student', 'parent'],
  '/lists/results': ['admin', 'teacher', 'student', 'parent'],
  '/lists/attendance': ['admin', 'teacher', 'student', 'parent'],
  '/lists/events': ['admin', 'teacher', 'student', 'parent'],
  '/lists/announcements': ['admin', 'teacher', 'student', 'parent']
};
