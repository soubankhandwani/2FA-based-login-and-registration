"use client";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function TwoFactAuth() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/fetch_login_activity",
          { withCredentials: true }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar isLoggedIn={true} />
    </>
  );
}
