'use client';

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

interface AttendanceChartContainerProps {
  data: {
    name: string;
    present: number;
    absent: number;
  }[];
}

const AttendanceChartContainer = ({ data }: AttendanceChartContainerProps) => {
  return (
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
  );
};

export default AttendanceChartContainer;