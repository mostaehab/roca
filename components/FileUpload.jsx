import { FiUploadCloud, FiFileText, FiTrash } from "react-icons/fi";
import { useState, useRef } from "react";

const FileUpload = () => {
  const [selected, setSelected] = useState([]);
  const inputRef = useRef();

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelected([...selected, ...Object.values(event.target.files)]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const onRemove = (index) => {
    setSelected(selected.filter((_, i) => i !== index));
  };

  console.log(selected);

  return (
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default FileUpload;
