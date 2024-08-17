"use client";
import { FiUploadCloud, FiFileText, FiTrash } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { AppContext } from "@/context";

const TobeSignedUpload = ({ id, fileType, name }) => {
  const { fetchUploadFiles } = AppContext();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filesUploaded, setFilesUplaoded] = useState(false);
  const inputRef = useRef();
  const currentDate = new Date();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelected([...selected, ...Object.values(event.target.files)]);
    }
  };

  const onSubmitUpload = async (event) => {
    event.preventDefault();

    selected.forEach(async (file) => {
      let formData = new FormData();

      formData.append("FileName", file.name);
      formData.append("FileDescription", "Needs to be signed");
      formData.append("CreatedAt", currentDate.toISOString());
      formData.append("Id", 0);
      formData.append(`file`, file);
      formData.append("UpdatedAt", currentDate.toISOString());
      formData.append("CreatedBy", name);
      formData.append("UserCycleId", id);
      formData.append("fileTypeId", fileType);

      setLoading(true);
      try {
        const response = await fetchUploadFiles(formData);
        const data = await response.json();
        setFilesUplaoded(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const onSubmitClick = () => {};

  const onRemove = (index) => {
    setSelected(selected.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={onSubmitUpload}>
        <div
          onClick={onChooseFile}
          className="border-4 rounded-xl border-[#C5C5C5] border-dashed flex flex-col justify-center items-center py-5 leading-[50px] cursor-pointer"
        >
          <input
            type="file"
            onChange={handleFileChange}
            ref={inputRef}
            hidden
            multiple
            accept="application/pdf"
          ></input>
          <FiUploadCloud className="block text-[80px] text-[#B18F13]"></FiUploadCloud>
          <p className="text-[#9D9D9D]">
            Drag and drop or click to upload files
          </p>
        </div>

        {selected.length > 0 &&
          selected.map((file, index) => (
            <div
              key={index}
              className="mt-5 border-2 border-[#B18F13] flex flex-row justify-between bg-[#FBFBFB] rounded-xl p-3"
            >
              <div className="flex flex-row">
                <FiFileText className="text-[24px] text-[#989898] mr-3" />
                <span className="text-[#666666]">{file.name}</span>
              </div>
              <div onClick={() => onRemove(index)} className="cursor-pointer">
                <FiTrash className="text-[24px] text-[#989898]" />
              </div>
            </div>
          ))}

        {loading && <div>Loading</div>}
        {filesUploaded && <div>Files uploaded successfully</div>}

        <div>
          <input
            type="submit"
            value="Upload"
            className="cursor-pointer my-[50px] bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white"
            onClick={onSubmitClick}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default TobeSignedUpload;
