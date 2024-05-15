"use client";
import axios from "axios";
axios.defaults.withCredentials = true;
import Link from "next/link";
import { useState } from "react";
import Loading from "./Loading";
import SuccessToast from "./Toast";
import { useRouter } from "next/navigation";

export default function LoginForm(props: any) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", isSuccess: false });

  const loginUser = (event: any) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    setLoading(true);
    setToast({
      message: "",
      isSuccess: false,
    });
    axios
      .post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then(function (response: any) {
        console.log(response);
        if (response.data.message == true) {
          setToast({
            message: "Login Successful! Redirecting...",
            isSuccess: true,
          });
          push("/auth");
        } else {
          setToast({
            message: "Invalid Credentials! Please try again.",
            isSuccess: false,
          });
        }
      })
      .catch(function (error: any) {
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
        <p className="text-3xl font-bold text-center mb-6">Login</p>
        <form onSubmit={loginUser}>
          <div>
            <label
              htmlFor="loginemail"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Email ID
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="loginEmail"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your registered email"
              />
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="loginPassword"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="loginPassword"
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="#"
              className="text-blue-600 text-sm"
              onClick={() => {
                props.handleLoginOrRegister(false);
              }}
            >
              Not Registered?
              <span className="underline underline-offset-1">Sign up</span>
            </Link>
            <button className="p-2 bg-blue-500 rounded-md shadow-md w-full text-white text-lg mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
