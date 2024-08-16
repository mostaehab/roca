"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import { AppContext } from "@/context";
const page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendMail = (email) => {
    if (isClient) {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <div>
      <Header title="Admin Portal"></Header>

      <div className="container max-w-[90%] mx-auto">
        <h3 className="text-[24px] mt-10">Customer List</h3>
        <input
          type="text"
          placeholder="Search for customers"
          className="block w-full border-[#A3A3A3] border-2 p-[20px] rounded-xl bg-[#FBFBFB] mt-10"
        ></input>

        <div className="bg-[#FBFBFB] border-[#A3A3A3] mt-10 mb-10 border-2 rounded-2xl">
          <div className="bg-[#B18F13] p-10 rounded-t-2xl flex flex-row items-center justify-between">
            <div className="flex flex-row items-cneter">
              <div>
                <p className="text-[24px] text-white mr-10">1</p>
              </div>
              <div>
                <span className="text-[#F8F8F8]">Customer Name</span>
                <p className="text-[24px] text-white">Mostafa Ehab</p>
              </div>
            </div>

            <div>
              <button className="cursor-pointer bg-[#13B135] py-[15px] px-[40px] rounded-full text-white mt-[20px]">
                Complete
              </button>
            </div>
          </div>
          <div className="p-10">
            <div className="flex flex-row justify-between">
              <div className="w-[calc(50%-30px)]">
                <h4 className="text-[18px]">Request Documents</h4>
                <p className="text-[#858585]">
                  Click the button below to be redirected to the email portal
                </p>
                <button
                  className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
                  onClick={sendMail("mamaa")}
                >
                  Request documents via email!
                </button>
              </div>

              <div className="w-[calc(50%-30px)]">
                <h4 className="text-[18px] mb-5">Documents to Sign</h4>
                <FileUpload></FileUpload>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
