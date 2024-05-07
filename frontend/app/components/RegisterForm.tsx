"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Loading from "./Loading";
import SuccessToast from "./Toast";

export default function Register(props: any) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", isSuccess: false });

  const registerUser = (event: any) => {
    event.preventDefault();
    const email = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;
    setLoading(true);
    setToast({
      message: "",
      isSuccess: false,
    });
    axios
      .post("http://localhost:5000/api/register", {
        email,
        username,
        password,
      })
      .then(function (response) {
        if (response.data.message === true) {
          setToast({
            message: "You are now registered successfully!",
            isSuccess: true,
          });
        } else {
          setToast({
            message: "Cannot Register! User already exists.",
            isSuccess: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <Loading />}
      {toast.message && (
        <SuccessToast message={toast.message} isSuccess={toast.isSuccess} />
      )}
      <div className="w-3/4 h-svh flex flex-col align-center justify-center mx-auto max-w-xl px-2 sm:px-6 lg:px-8">
        <p className="text-3xl font-bold text-center mb-6">Register</p>
        <form onSubmit={registerUser} method="POST">
          <div>
            <label
              htmlFor="registerEmail"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Email ID
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="registerEmail"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="registerUsername"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                id="registerUsername"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="registerPassword"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="registerPassword"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="#"
              className="text-blue-600 text-sm"
              onClick={() => {
                props.handleLoginOrRegister(true);
              }}
            >
              Already Registered?
              <span className="underline underline-offset-1"> Login</span>
            </Link>
            <button className="p-2 bg-blue-500 rounded-md shadow-md w-full text-white text-lg mt-2">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
