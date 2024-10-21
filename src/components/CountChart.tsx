import Image from 'next/image';

import prisma from '@/lib/prisma';
import CountChartContainer from '@/components/CountChartContainer';

const CountChart = async () => {
  const data = await prisma.student.groupBy({ by: ['sex'], orderBy: { sex: 'asc' }, _count: true });

  const girls = data[0]?._count || 0;
  const boys = data[1]?._count || 0;
  const total = boys + girls;

  return (
    <div className="h-full w-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <div className="relative h-[75%] w-full">
        <CountChartContainer data={{ boys, girls }} />
      </div>
      <div className="flex justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="size-5 rounded-full bg-custom-sky" />
          <h1 className="text-sm font-bold">{boys} boys</h1>
          <h1 className="text-xs text-gray-400">{Math.round((boys * 100) / total)}%</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="size-5 rounded-full bg-custom-yellow" />
          <h1 className="text-sm font-bold">{girls} girls</h1>
          <h1 className="text-xs text-gray-400">{Math.round((girls * 100) / total)}%</h1>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
