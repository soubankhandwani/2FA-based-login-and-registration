"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navbar from "./Navbar";

export default function Form() {
  //true for login, false for register
  const [loginOrRegister, setLoginOrRegister] = useState(true);

  const handleLoginOrRegister = (inputLoginOrRegister: boolean) => {
    setLoginOrRegister(inputLoginOrRegister);
  };

  return (
    <>
      <Navbar handleLoginOrRegister={handleLoginOrRegister} />
      {loginOrRegister ? (
        <LoginForm handleLoginOrRegister={handleLoginOrRegister} />
      ) : (
        <RegisterForm handleLoginOrRegister={handleLoginOrRegister} />
      )}
    </>
  );
}
