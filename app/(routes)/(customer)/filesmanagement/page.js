"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import RequestedFileUpload from "@/components/RequestedFileUpload";
import { FiFileText } from "react-icons/fi";
import { AppContext } from "@/context";
import { redirect } from "next/navigation";

const page = () => {
  const { toBeSigned, setToBeSigned, currentCycle, fetchGetFiles } =
    AppContext();
  const [cycleFiles, setCycleFiles] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData) {
      redirect("/signin");
    }
  }, []);

  useEffect(() => {
    const getCycleFiles = async () => {
      if (currentCycle && currentCycle.length > 0) {
        try {
          const response = await fetchGetFiles(currentCycle?.[0]?.id);
          if (!response.ok) {
            return;
          }
          const data = await response.json();
          setCycleFiles(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching cycle files:", error);
        }
      }
    };

    getCycleFiles();
  }, [currentCycle]);

  useEffect(() => {
    if (cycleFiles) {
      const filtered = cycleFiles?.filter((file) => file.fileTypeId === 2);

      const editedArr = filtered.map((file) => {
        const editedName = file.fileName.replace(" ", "_");
        return { ...file, fileName: editedName };
      });
      if (filtered[0]) {
        setToBeSigned(editedArr);
      }

      console.log(editedArr);

      if (filtered.length === 0) {
        redirect("/documents");
      }
    }
  }, [cycleFiles]);

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
              <div className="w-full lg:w-[calc(50%-30px)]">
                <RequestedFileUpload></RequestedFileUpload>
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

          {toBeSigned?.map((file) => {
            return (
              <Link key={file.id} href={file.fileName}>
                <div>
                  <div className="mt-5 mb-20 cursor-pointer border-2 border-[#B18F13] flex flex-row justify-between bg-[#FBFBFB] rounded-xl p-3">
                    <div className="flex flex-row">
                      <FiFileText className="text-[24px] text-[#989898] mr-3" />
                      <span className="text-[#666666]">{file.fileName}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
