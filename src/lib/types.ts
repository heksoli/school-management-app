export type SessionClaims = {
  firstname?: string;
  lastname?: string;
  metadata?: MetaData;
};

export type MetaData = {
  role: string;
  id: string;
};

export type Role = 'admin' | 'teacher' | 'parent' | 'student';
