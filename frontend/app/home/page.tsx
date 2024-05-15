"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import DeviceInfo from "../components/DeviceInfo";
import Navbar from "../components/Navbar";
import ShieldImage from "../../public/secure.png";
import Image from "next/image";
import HomeSkeleton from "../components/HomeSkeleton";
export default function Home() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://twofa-backend-d2dn.onrender.com/api/fetch_login_activity",
          { withCredentials: true }
        );
        // console.log(response.data.user.login_info);
        setUser(response.data.user.login_info || []); // Ensure user.login_info is an array
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={true} />
      <div className="flex flex-col items-center justify-center mt-28">
        <Image
          src={ShieldImage}
          alt="Sheild Image"
          height={150}
          placeholder="blur"
        />
        <h2 className="font-bold text-2xl mt-3">Manage Device Access</h2>
        <p className="w-[25%] text-center text-gray-500">
          These are the list of devices that were used to log in to your
          account. If this was not you then <u>update your password.</u>
        </p>
      </div>
      {user.length == 0 ? (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6 mb-12">
          <div className="grid grid-cols-2 gap-20">
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-6 mb-12">
          <div className="grid grid-cols-2 gap-20">
            {user.map((userInfo, index) => (
              <DeviceInfo key={index} user={userInfo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
