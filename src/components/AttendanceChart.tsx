import Image from 'next/image';
import moment from 'moment';

import AttendanceChartContainer from '@/components/AttendanceChartContainer';
import prisma from '@/lib/prisma';

const AttendanceChart = async () => {
  const startDay = moment(Date.now()).subtract(13, 'day').startOf('day');
  const data = await prisma.attendance.findMany({
    where: { date: { gte: startDay.toDate() } },
    select: { date: true, present: true }
  });

  const attendance = [];
  while (startDay.isSameOrBefore(moment(Date.now()))) {
    let present = 0;
    let absent = 0;

    data
      .filter((day) => moment(day.date).isSame(startDay, 'day'))
      .forEach((record) => {
        if (record.present) {
          present++;
        } else {
          absent++;
        }
      });

    attendance.push({ name: startDay.format('dd, DD MMM'), present, absent });
    startDay.add(1, 'day');
  }

  return (
    <div className="h-full w-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <AttendanceChartContainer data={attendance} />
    </div>
  );
};

export default AttendanceChart;
