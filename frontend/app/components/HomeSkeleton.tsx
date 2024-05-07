import { CiRoute } from "react-icons/ci";
import { FaGlobe } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineDevices } from "react-icons/md";

export default function HomeSkeleton() {
  return (
    <>
      <div role="status" className="animate-pulse">
        <div className="flex align-center justify-between flex-col shadow-md w-full h-full p-6 rounded-md">
          <div className="flex items-center text-lg font-bold py-3 border-b border-gray-200">
            <FaGlobe className="text-2xl mr-2" />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-60"></div>
          </div>
          <div className="flex items-center text-lg font-light mt-8">
            <CiRoute className="text-xl mr-2 mt-1" />
            <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-400 w-[300px]"></div>
          </div>
          <div className="flex items-center text-lg font-light mt-1">
            <MdOutlineDevices className="text-xl mr-2 mt-1" />
            <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-400 w-[300px]"></div>
          </div>
          <div className="flex items-center text-lg font-light mt-1">
            <FaClockRotateLeft className="text-lg mr-2 mt-1" />
            <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-400 w-[300px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
