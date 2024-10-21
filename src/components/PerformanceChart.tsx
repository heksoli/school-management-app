'use client';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 92, fill: '#C3EBFA' },
  { name: 'Group B', value: 8, fill: '#FAE27C' }
];

const PerformanceChart = () => {
  return (
    <>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform items-center text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <h2 className="text-xs text-gray-300">of 10 max LTS</h2>
      </div>
      <h2 className="absolute bottom-12 left-0 right-0 m-auto text-center font-medium">
        1st Semester - 2nd Semester
      </h2>
    </>
  );
};

export default PerformanceChart;
