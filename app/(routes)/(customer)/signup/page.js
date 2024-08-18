"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { AppContext } from "@/context";
const page = () => {
  const { onRegisterUser } = AppContext();
  const [registerUser, setRegisterUser] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onValueChange = (event) => {
    const { name, value } = event.target;

    setRegisterUser({ ...registerUser, [name]: value });
  };

  const passwordValidation = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCaseRegex = /[A-Z]/;
    let error = "";

    if (!specialCharRegex.test(password)) {
      error =
        "Password must include at least one special character (e.g., @, ?, !).";
    } else if (!upperCaseRegex.test(password)) {
      error = "Password must include at least one uppercase letter.";
    }

    return error;
  };

  const onSubmitRegisterForm = async (event) => {
    event.preventDefault();
    const error = passwordValidation(registerUser.password);

    if (error) {
      setPasswordError(error);
      return;
    }

    const response = await onRegisterUser(registerUser);
    setStatus(response);
  };

  return (
    <div>
      <Header subtitle="Sign Up"></Header>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="w-[50%] my-[150px]">
          <div>
            {status?.ok ? (
              <div className="p-10 bg-green-600 rounded-2xl bg-opacity-70 mb-[50px] ">
                <p className="text-white text-[18px]">
                  Your account has been created, Please Sign in to activate your
                  account
                </p>
                <Link
                  href="/signin"
                  className="bg-[#B18F13] py-[15px] px-[30px] rounded-full text-white mt-[20px] inline-block"
                >
                  Sign in
                </Link>
              </div>
            ) : null}
            <h3 className="text-[26px] mb-[20px] font-medium">Sign up</h3>
          </div>
          <form onSubmit={onSubmitRegisterForm}>
            <div className="mb-7">
              <label htmlFor="companyName">
                <p className="text-[18px]">Company Name*</p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="text"
                placeholder="Company Name"
                name="companyName"
                id="companyName"
                value={registerUser.companyName}
                onChange={onValueChange}
                required
              ></input>
            </div>

            <div className="mb-7">
              <label htmlFor="phoneNumber">
                <p className="text-[18px]">Phone Number*</p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                id="phoneNumber"
                value={registerUser.phoneNumber}
                onChange={onValueChange}
                maxLength={20}
                required
              ></input>
            </div>

            <div className="mb-7">
              <label htmlFor="email">
                <p className="text-[18px]">Email*</p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={registerUser.email}
                onChange={onValueChange}
                required
              ></input>
            </div>

            <div className="mb-7">
              <label htmlFor="password">
                <p className="text-[18px]">Password*</p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={registerUser.password}
                onChange={onValueChange}
                minLength="6"
                required
              ></input>
              <div className="mt-5 text-red-500">
                {passwordError || (
                  <span className="block">{passwordError}</span>
                )}
              </div>
            </div>
            <p>
              Already having an account?,{" "}
              <Link className="font-semibold" href="/signin">
                Sign In
              </Link>
            </p>
            <input
              type="submit"
              value="Sign Up"
              className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
