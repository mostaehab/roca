"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import CycleList from "@/components/CycleList";
import UserList from "@/components/UserList";

const Page = () => {
  const [pageView, setPageView] = useState(true);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData) {
      redirect("/signin");
    }

    if (authData?.user?.role !== "System Admin") {
      redirect("/documents");
    }
  }, []);

  return (
    <div>
      <Header title="Admin Portal"></Header>

      <div className="container max-w-[90%] mx-auto">
        <div className="my-10">
          <button
            onClick={() => setPageView(true)}
            className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mr-[10px]"
          >
            Cycles List
          </button>
          <button
            onClick={() => setPageView(false)}
            className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white"
          >
            Customer List
          </button>
        </div>
        {pageView ? <CycleList></CycleList> : <UserList></UserList>}
      </div>
    </div>
  );
};

export default Page;
