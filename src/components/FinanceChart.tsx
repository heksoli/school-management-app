'use client';

import Image from 'next/image';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  {
    name: 'Jan 24',
    income: 4000,
    expenses: 2400
  },
  {
    name: 'Feb 24',
    income: 3000,
    expenses: 1398
  },
  {
    name: 'Mar 24',
    income: 2000,
    expenses: 9800
  },
  {
    name: 'Apr 24',
    income: 2780,
    expenses: 3908
  },
  {
    name: 'May 24',
    income: 1890,
    expenses: 4800
  },
  {
    name: 'Jun 24',
    income: 2390,
    expenses: 3800
  },
  {
    name: 'Jul 24',
    income: 3490,
    expenses: 4300
  },
  {
    name: 'Aug 24',
    income: 3490,
    expenses: 4300
  },
  {
    name: 'Sep 24',
    income: 3490,
    expenses: 4300
  },
  {
    name: 'Oct 24',
    income: 3490,
    expenses: 4300
  },
  {
    name: 'Nov 24',
    income: 3490,
    expenses: 4300
  },
  {
    name: 'Dec 24',
    income: 3490,
    expenses: 4300
  }
];

const FinanceChart = () => {
  return (
    <div className="h-full w-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Financial Status</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DDDDDD" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: '#D1D5DB' }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: '#D1D5DB' }} tickLine={false} tickMargin={10} />
          <Tooltip contentStyle={{ borderRadius: '10px', borderColor: 'lightgray' }} />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: '10px', paddingBottom: '20px' }}
          />
          <Line type="monotone" dataKey="expenses" stroke="#FAE27C" strokeWidth={5} />
          <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
