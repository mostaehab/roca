import React from "react";
import { FiFileText } from "react-icons/fi";
import { AppContext } from "@/context";

const FIlesContainer = ({ title, files }) => {
  const { fetchDownlaodFile } = AppContext();
  const onFileClick = async (id, name) => {
    try {
      const data = await fetchDownlaodFile(id);
      if (!data) {
        return;
      }
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(data);
      downloadLink.download = name;
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="my-10">
        <p className="my-10 bg-[#B18F13] p-10 text-white text-[24px] rounded-2xl">
          {title}
        </p>
        {files && files.length > 0 ? (
          <div className="flex flex-wrap">
            {files?.map((file) => {
              return (
                <div
                  key={file?.id}
                  onClick={() => onFileClick(file?.id, file?.fileName)}
                  className="bg-white border-[#B18F13] border-2 text-stone-600 cursor-pointer p-10  text-[18px] rounded-2xl w-full xl:w-[calc(33.333%-10px)] mr-[10px] mb-[20px]"
                >
                  <FiFileText className="text-[36px] mb-[10px]"></FiFileText>
                  {file?.fileName}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-center text-[18px]">
              This section is empty at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FIlesContainer;
