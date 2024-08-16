"use client";
import Link from "next/link";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import { FiFileText } from "react-icons/fi";

const page = () => {
  return (
    <div>
      <Header></Header>
      <div className="container max-w-[90%] mx-auto my-10">
        <h3 className="text-[24px] mt-10">Files Management</h3>

        <div>
          <h4 className="mt-[25px] text-[18px]">Requested Files</h4>
          <span className="text-[16px] text-[#A6A6A6]">
            Upload the files requested here.
          </span>

          <div className="mt-[25px]">
            <div className="flex flex-row justify-between">
              <div className="w-[calc(50%-30px)]">
                <FileUpload></FileUpload>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-10"></hr>
        <div>
          <h4 className="mt-[25px] text-[18px]">Documents to be signed</h4>
          <span className="text-[16px] text-[#A6A6A6]">
            Please sign the documents below.
          </span>

          <Link href="/pdf">
            <div>
              <div className="mt-5 mb-20 cursor-pointer border-2 border-[#B18F13] flex flex-row justify-between bg-[#FBFBFB] rounded-xl p-3">
                <div className="flex flex-row">
                  <FiFileText className="text-[24px] text-[#989898] mr-3" />
                  <span className="text-[#666666]">file name</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
