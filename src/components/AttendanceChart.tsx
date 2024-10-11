'use client';

import Image from 'next/image';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 4000,
    absent: 2400
  },
  {
    name: 'Tue',
    present: 3000,
    absent: 1398
  },
  {
    name: 'Wed',
    present: 2000,
    absent: 9800
  },
  {
    name: 'Thu',
    present: 2780,
    absent: 3908
  },
  {
    name: 'Fri',
    present: 1890,
    absent: 4800
  }
];

const AttendanceChart = () => {
  return (
    <div className="h-full w-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DDDDDD" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: '#D1D5DB' }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: '#D1D5DB' }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '10px', borderColor: 'lightgray' }} />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: '20px', paddingBottom: '40px' }}
          />
          <Bar dataKey="absent" fill="#FAE27C" legendType="circle" radius={[10, 10, 0, 0]} />
          <Bar dataKey="present" fill="#C3EBFA" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
