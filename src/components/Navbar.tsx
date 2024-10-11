import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="flex items-center justify-end p-4 md:justify-between">
      <div className="hidden items-center gap-1.5 rounded-full px-2 text-xs ring-[1.5px] ring-gray-300 md:flex">
        <Image src="/search.png" width={14} height={14} alt="Search" />
        <input
          type="text"
          placeholder="Search ..."
          className="w-[300px] bg-transparent p-1.5 outline-none lg:w-[400px] xl:w-[500px]"
        />
      </div>
      <div className="flex w-full items-center justify-end gap-6">
        <div className="flex w-7 cursor-pointer items-center justify-center rounded-full bg-white">
          <Image src="/message.png" width={20} height={20} alt="Messages" />
        </div>
        <div className="relative flex w-7 cursor-pointer items-center justify-center rounded-full bg-white">
          <Image src="/announcement.png" width={20} height={20} alt="Announcements" />
          <div className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-purple-500 text-xs font-medium text-white">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium leading-3">Han Solo</span>
          <span className="text-right text-[10px] text-gray-500">Admin</span>
        </div>
        <Image src="/avatar.png" width={36} height={36} alt="Profile" className="rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
