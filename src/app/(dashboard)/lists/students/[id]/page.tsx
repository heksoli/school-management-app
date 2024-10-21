import Image from 'next/image';
import Link from 'next/link';

import ScheduleCalendar from '@/components/ScheduleCalendar';
import Announcements from '@/components/Announcements';
import PerformanceChart from '@/components/PerformanceChart';

const StudentPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 gap-4 rounded-xl bg-custom-sky p-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/28845478/pexels-photo-28845478/free-photo-of-smiling-woman-in-white-shirt-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex w-2/3 flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Random Name</h1>
              <p className="text-sm text-gray-500">
                Cras ultricies mi eu turpis hendrerit fringilla. Sed magna purus, fermentum eu.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
                <div className="flex w-full flex-row gap-2 md:w-1/3 lg:w-full">
                  <Image src="/blood.png" alt="blood" width={16} height={16} className="size-4" />
                  <span>A+</span>
                </div>

                <div className="flex w-full flex-row gap-2 md:w-1/3 lg:w-full">
                  <Image src="/date.png" alt="blood" width={16} height={16} className="size-4" />
                  <span>January, 1980</span>
                </div>

                <div className="flex w-full flex-row gap-2 md:w-1/3 lg:w-full">
                  <Image src="/mail.png" alt="blood" width={16} height={16} className="size-4" />
                  <span>random.name@gmail.com</span>
                </div>

                <div className="flex w-full flex-row gap-2 md:w-1/3 lg:w-full">
                  <Image src="/phone.png" alt="blood" width={16} height={16} className="size-4" />
                  <span>+40 2132 213 312</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap justify-between gap-4">
            <div className="flex w-full gap-2 rounded-xl bg-white p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} className="size-6" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>

            <div className="flex w-full gap-2 rounded-xl bg-white p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleBranch.png" alt="" width={24} height={24} className="size-6" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>

            <div className="flex w-full gap-2 rounded-xl bg-white p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleLesson.png" alt="" width={24} height={24} className="size-6" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>

            <div className="flex w-full gap-2 rounded-xl bg-white p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image src="/singleClass.png" alt="" width={24} height={24} className="size-6" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-[800px] rounded-xl bg-white p-4">
          <h1>Student&apos;s Schedule</h1>
          <ScheduleCalendar />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 xl:w-1/3">
        <div className="mb-4 rounded-xl bg-white p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="" className="cursor-pointer rounded-md bg-custom-purple p-3">
              Student&apos;s Lessons
            </Link>
            <Link href="" className="cursor-pointer rounded-md bg-custom-sky p-3">
              Student&apos;s Teachers
            </Link>
            <Link href="" className="cursor-pointer rounded-md bg-custom-yellow p-3">
              Student&apos;s Exams
            </Link>
            <Link href="" className="cursor-pointer rounded-md bg-custom-purple p-3">
              Student&apos;s Results
            </Link>
            <Link href="" className="cursor-pointer rounded-md bg-custom-sky p-3">
              Student&apos;s Assignments
            </Link>
          </div>
        </div>
        <div className="relative mb-4 h-60 rounded-xl bg-white p-4">
          <h1>Student&apos;s Performance</h1>
          <PerformanceChart />
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
