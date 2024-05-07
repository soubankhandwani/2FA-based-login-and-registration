"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DeviceInfo from "../components/DeviceInfo";
import Navbar from "../components/Navbar";

export default function Home() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fetch_login_activity"
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
      {user.length > 0 ? (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-28">
          <div className="grid grid-cols-2 gap-20">
            {user.map((userInfo, index) => (
              <DeviceInfo key={index} user={userInfo} />
            ))}
          </div>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}
