import React, { useState } from "react";
import TobeSignedUpload from "@/components/TobeSignedUpload";
import { AppContext } from "@/context";
import Link from "next/link";
import { LuExpand, LuShrink } from "react-icons/lu";

const CustomerActions = ({ cycle, setCurrentCycles }) => {
  const { onDeleteCycle, updateCycle, requestFile } = AppContext();
  const [expandedCycleId, setExpandedCycleId] = useState(null);
  const putBody = {
    ...cycle,
    completed: true,
  };
  const [requestedBody, setRequestBody] = useState({
    id: 0,
    name: "",
    required: true,
    userCycleId: cycle.id,
  });

  const onExpand = (cycleId) => {
    setExpandedCycleId(expandedCycleId === cycleId ? null : cycleId);
  };

  const onCycleDelete = async (cycleId) => {
    setExpandedCycleId(expandedCycleId);
    try {
      await onDeleteCycle(cycleId);
      setCurrentCycles((prev) => prev.filter((cycle) => cycle.id !== cycleId));
    } catch (error) {
      console.error(error);
    }
  };

  const onFileRequest = async (event) => {
    event.preventDefault();
    try {
      const requestId = await requestFile(requestedBody);
      console.log(requestId);
      if (!requestId) {
        console.log("not working");
        return;
      }
      const data = await updateCycle(cycle.id, putBody);
    } catch (error) {
      console.log(error);
    }
  };

  const onFileRequestChange = (event) => {
    const { name, value } = event.target;
    setRequestBody({ ...requestedBody, [name]: value });
  };

  return (
    <div>
      <div
        key={cycle.id}
        className="bg-[#FBFBFB] border-[#A3A3A3] mt-10 mb-10 border-2 rounded-2xl"
      >
        <div className="bg-[#B18F13] p-10 rounded-2xl block lg:flex flex-row items-center justify-between ">
          <div className="flex flex-row items-center">
            <div>
              <p className="text-[24px] text-white mr-10">{cycle.id}</p>
            </div>
            <div className="mr-[30px]">
              <span className="text-[#F8F8F8]">Customer Name</span>
              <p className="text-[24px] text-white">{cycle.name}</p>
            </div>
            <div
              className="bg-white p-[5px] text-[34px] rounded-lg cursor-pointer text-zinc-500"
              onClick={() => onExpand(cycle.id)}
            >
              {expandedCycleId === cycle.id ? (
                <LuShrink></LuShrink>
              ) : (
                <LuExpand></LuExpand>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={() => onCycleDelete(cycle.id)}
              className="cursor-pointer bg-[#13B135] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
            >
              Complete
            </button>
          </div>
        </div>

        {expandedCycleId === cycle.id && (
          <div className="p-10">
            <div className="block lg:flex flex-row justify-between">
              <div className="w-full lg:w-[calc(50%-30px)] text-[10px] lg:text-[16px] mb-[20px]">
                <h4 className="text-[18px]">Request Documents</h4>
                <p className="text-[#858585]">
                  Request the reqiured documents from this specific customer
                </p>
                <form onSubmit={onFileRequest}>
                  <textarea
                    className="block w-full h-[80px] p-[10px] border-[#bbbbbb] border-2 rounded-xl mt-[10px]"
                    onChange={onFileRequestChange}
                    name="name"
                    value={requestedBody.name}
                    required
                  ></textarea>
                  <button
                    className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
                    type="submit"
                  >
                    Request documents via email!
                  </button>
                </form>

                <div className="mt-10">
                  <h4 className="text-[18px]">View Documents</h4>
                  <p className="text-[#858585]">
                    Click the button below to be redirected to the customer
                    files portal
                  </p>
                  <Link
                    href={`/customerlist/${cycle.id}`}
                    className="cursor-pointer border-[#B18F13] border-2 bg-white py-[15px] px-[40px] rounded-full mt-[20px] inline-block"
                  >
                    See customer documents
                  </Link>
                </div>
              </div>

              <div className="lg:w-[calc(50%-30px)] w-full text-[10px] lg:text-[16px]">
                <h4 className="text-[18px] mb-5">Documents to Sign</h4>
                <TobeSignedUpload
                  id={cycle.id}
                  fileType="2"
                  name={cycle.name}
                ></TobeSignedUpload>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerActions;
