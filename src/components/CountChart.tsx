'use client';

import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  {
    name: 'Total',
    count: 100,
    fill: '#FFFFFF'
  },
  {
    name: 'Girls',
    count: 55,
    fill: '#FAE27C'
  },
  {
    name: 'Boys',
    count: 45,
    fill: '#C3EBFA'
  }
];

const CountChart = () => {
  return (
    <div className="h-full w-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <div className="relative h-[75%] w-full">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt="maleFemale"
          width={50}
          height={50}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="size-5 rounded-full bg-custom-sky" />
          <h1 className="text-sm font-bold">55 girls</h1>
          <h1 className="text-xs text-gray-400">55%</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="size-5 rounded-full bg-custom-yellow" />
          <h1 className="text-sm font-bold">45 boys</h1>
          <h1 className="text-xs text-gray-400">45%</h1>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
