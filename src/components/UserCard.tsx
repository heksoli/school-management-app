import Image from 'next/image';

type UserCardProps = { type: string };

const UserCard = ({ type }: UserCardProps) => {
  return (
    <div className="even:bg-custom-yellow odd:bg-custom-purple min-w-[130px] flex-1 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white px-2 py-1 text-xs text-green-600">Fri, Oct 11</span>
        <Image src="/more.png" width={20} height={20} alt="more" className="justify-end" />
      </div>
      <h1 className="my-4 text-2xl font-semibold">1.234</h1>
      <h2 className="text-sm font-medium capitalize text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
