"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { AppContext } from "@/context";
import { redirect } from "next/navigation";
import FadeLoader from "react-spinners/FadeLoader";

const page = () => {
  const { fetchLoginUser, setToBeSigned } = AppContext();
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });
  const [res, setRes] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      const userData = localStorage.getItem("authData");
      const userRole = JSON.parse(userData)?.user?.role;

      if (userRole && userRole === "System Admin") {
        redirect("/customerlist");
      } else if (userRole && userRole === "Client") {
        redirect("/documents");
      }
    }
  }, [loginAttempted]);

  const onLoginDataChange = (event) => {
    const { name, value } = event.target;
    setLoginUserData({ ...loginUserData, [name]: value });
  };

  const onUserLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    localStorage.clear();
    setToBeSigned(null);
    try {
      const response = await fetchLoginUser(loginUserData);

      if (!response || !response.status) {
        setRes(null);
        return;
      }

      if (response.status === 400) {
        setRes(400);
        return;
      }

      setRes(response.status);
      setLoginAttempted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header subtitle="Sign In"></Header>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="w-[50%] my-[180px]">
          {res === 400 || res === null ? (
            <div className="p-10 bg-red-500 rounded-2xl bg-opacity-70 mb-[50px] ">
              <p className="text-white text-[18px]">
                Invalid email or password
              </p>
            </div>
          ) : null}

          {loading && <FadeLoader color="#e6d600"></FadeLoader>}

          <h3 className="text-[26px] mb-[20px] font-medium">Sign in</h3>

          <form onSubmit={onUserLogin}>
            <div className="mb-7">
              <label htmlFor="email">
                <p className="text-[18px]">Email*</p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                value={loginUserData.email}
                onChange={onLoginDataChange}
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
                value={loginUserData.password}
                onChange={onLoginDataChange}
                required
              ></input>
            </div>

            <p>
              Need to create an account?,{" "}
              <Link className="font-semibold" href="/signup">
                Sign Up
              </Link>
            </p>
            <input
              type="submit"
              value="Sign In"
              className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
