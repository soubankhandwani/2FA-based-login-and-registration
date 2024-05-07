import React from "react";
import { CiRoute } from "react-icons/ci";
import { FaGlobe } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineDevices } from "react-icons/md";

interface Props {
  user: any; // Update the type of user as per your data structure
}

const DeviceInfo: React.FC<Props> = ({ user }) => {
  console.log("Device info: ", Array.isArray(user));
  return (
    <>
      <div className="flex align-center justify-between flex-col shadow-md w-full h-full p-6 rounded-md">
        <div className="flex align-center text-lg font-bold py-3 border-b border-gray-200">
          <FaGlobe className="text-2xl mr-2" />
          <p>{user.login_browser}</p>
        </div>
        <div className="flex align-center text-lg font-light mt-8">
          <CiRoute className="text-xl mr-2 mt-1" />
          <p>{user.login_ip}</p>
        </div>
        <div className="flex align-center text-lg font-light mt-1">
          <MdOutlineDevices className="text-xl mr-2 mt-1" />
          <p>{user.login_device}</p>
        </div>
        <div className="flex align-center text-lg font-light mt-1">
          <FaClockRotateLeft className="text-lg mr-2 mt-1" />
          <p>{user.login_timestamp}</p>
        </div>
      </div>
    </>
  );
};

export default DeviceInfo;
