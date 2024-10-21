'use client';

import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

interface CountChartContainerProps {
  data: { boys: number; girls: number };
}

const CountChartContainer = ({ data: { boys, girls } }: CountChartContainerProps) => {
  const data = [
    { name: 'Total', count: boys + girls, fill: '#FFFFFF' },
    { name: 'Boys', count: boys, fill: '#FAE27C' },
    { name: 'Girls', count: girls, fill: '#C3EBFA' }
  ];

  return (
    <>
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
    </>
  );
};

export default CountChartContainer;
