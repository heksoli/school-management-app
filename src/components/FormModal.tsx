'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const TeacherForm = dynamic(() => import('@/components/forms/TeacherForm'), {
  loading: () => <div>Loading</div>
});
const StudentForm = dynamic(() => import('@/components/forms/StudentForm'), {
  loading: () => <div>Loading</div>
});
const ParentForm = dynamic(() => import('@/components/forms/ParentForm'), {
  loading: () => <div>Loading</div>
});
const AnnouncementForm = dynamic(() => import('@/components/forms/AnnouncementForm'), {
  loading: () => <div>Loading</div>
});
const AssignmentForm = dynamic(() => import('@/components/forms/AssignmentForm'), {
  loading: () => <div>Loading</div>
});
const ClassForm = dynamic(() => import('@/components/forms/ClassForm'), {
  loading: () => <div>Loading</div>
});
const EventForm = dynamic(() => import('@/components/forms/EventForm'), {
  loading: () => <div>Loading</div>
});
const ExamForm = dynamic(() => import('@/components/forms/ExamForm'), {
  loading: () => <div>Loading</div>
});
const LessonForm = dynamic(() => import('@/components/forms/LessonForm'), {
  loading: () => <div>Loading</div>
});
const ResultForm = dynamic(() => import('@/components/forms/ResultForm'), {
  loading: () => <div>Loading</div>
});
const SubjectForm = dynamic(() => import('@/components/forms/SubjectForm'), {
  loading: () => <div>Loading</div>
});

interface FormModalProps {
  table:
    | 'teacher'
    | 'student'
    | 'parent'
    | 'announcement'
    | 'assignment'
    | 'class'
    | 'event'
    | 'exam'
    | 'lesson'
    | 'result'
    | 'subject';
  type: 'create' | 'update' | 'delete';
  data?: any;
  id?: string;
}

const displayForm: { [key: string]: (type: 'create' | 'update', data: any) => React.JSX.Element } =
  {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
    parent: (type, data) => <ParentForm type={type} data={data} />,
    announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
    assignment: (type, data) => <AssignmentForm type={type} data={data} />,
    class: (type, data) => <ClassForm type={type} data={data} />,
    event: (type, data) => <EventForm type={type} data={data} />,
    exam: (type, data) => <ExamForm type={type} data={data} />,
    lesson: (type, data) => <LessonForm type={type} data={data} />,
    result: (type, data) => <ResultForm type={type} data={data} />,
    subject: (type, data) => <SubjectForm type={type} data={data} />
  };

const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const [open, setOpen] = useState(false);

  const size = type === 'create' ? 'size-8' : 'size-7';
  const bgColor =
    type === 'create'
      ? 'bg-custom-yellow'
      : type === 'update'
        ? 'bg-custom-sky'
        : 'bg-custom-purple';

  const Form = () => {
    return type === 'delete' ? (
      id ? (
        <form action="" className="flex flex-col p-4">
          <span className="mt-2 text-center text-base font-semibold">
            Are your sure you want to delete this {table}?
          </span>
          <div className="mt-2 flex flex-row items-center justify-center gap-4 text-xs">
            <button className="w-max self-center rounded border-0 bg-red-500 px-4 py-2 text-white">
              Delete
            </button>
            <button
              className="w-max self-center rounded border-0 bg-gray-300 px-4 py-2 text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>Record id is required!</div>
      )
    ) : (
      displayForm[table](type, data)
    );
  };

  return (
    <div className="overscroll-y-auto">
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} width={16} height={16} alt="" />
      </button>
      {open && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-[90%] rounded-md bg-white p-4 md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div className="absolute right-4 top-4 cursor-pointer" onClick={() => setOpen(false)}>
              <Image src="/close.png" width={14} height={14} alt="close" />
            </div>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
