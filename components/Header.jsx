"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context";

const Header = ({ title, subtitle }) => {
  const { setToBeSigned, setCurrentCycle } = AppContext();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthData = localStorage.getItem("authData");
      if (storedAuthData) {
        setUserData(JSON.parse(storedAuthData));
      }
    }
  }, []);

  const onSignOut = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("currentCycle");
    localStorage.removeItem("token");
    localStorage.removeItem("cycleFilesStored");
    localStorage.clear();
    setCurrentCycle(null);
    setToBeSigned(null);
    setUserData(null);
    router.push("/signin");
  };

  return (
    <div className="cover w-full h-[400px]">
      <div className="bg-[#B18F13] bg-opacity-50 h-full">
        <div className="container max-w-[90%] h-full mx-auto">
          <Link href="/" className="w-[100px]">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-auto"
            ></Image>
          </Link>

          <div className="py-[60px]">
            <h1 className="text-[54px] font-semibold text-white">
              {title ? title : "Customer Portal"}
            </h1>
            <p className="font-medium text-[24px] text-white">{subtitle}</p>
          </div>

          {userData && (
            <div className="flex flex-row items-center">
              <p className="text-white border-2 border-white inline-block p-5 rounded-lg text-[20px] mr-10 bg">
                {userData.user?.companyName}
              </p>

              <button
                className="bg-[#B18F13] py-[15px] px-[30px] rounded-full text-white"
                onClick={onSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
