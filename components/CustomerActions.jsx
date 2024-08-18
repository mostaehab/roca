import React, { useState, useEffect } from "react";
import TobeSignedUpload from "@/components/TobeSignedUpload";
import { AppContext } from "@/context";
import Link from "next/link";

const CustomerActions = ({ cycle, setAllCycle }) => {
  const [expandedCycleId, setExpandedCycleId] = useState(null);
  const [sendMail, setSendMail] = useState(false);
  const { onDeleteCycle } = AppContext();

  useEffect(() => {
    if (sendMail) {
      window.location.href = `mailto:email`;
    }
  }, [sendMail]);

  const onSendMail = () => {
    setSendMail(true);
  };

  const onExpand = (cycleId) => {
    setExpandedCycleId(expandedCycleId === cycleId ? null : cycleId);
  };

  const onCycleDelete = async (cycleId) => {
    setExpandedCycleId(expandedCycleId);
    try {
      await onDeleteCycle(cycleId);
      setAllCycle((prev) => prev.filter((cycle) => cycle.id !== cycleId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div
        key={cycle.id}
        className="bg-[#FBFBFB] border-[#A3A3A3] mt-10 mb-10 border-2 rounded-2xl"
      >
        <div
          onClick={() => onExpand(cycle.id)}
          className="bg-[#B18F13] p-10 rounded-t-2xl block lg:flex flex-row items-center justify-between cursor-pointer"
        >
          <div className="flex flex-row items-center">
            <div>
              <p className="text-[24px] text-white mr-10">{cycle.id}</p>
            </div>
            <div>
              <span className="text-[#F8F8F8]">Customer Name</span>
              <p className="text-[24px] text-white">{cycle.name}</p>
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
              <div className="w-[calc(50%-30px)] mb-[20px]">
                <h4 className="text-[18px]">Request Documents</h4>
                <p className="text-[#858585]">
                  Click the button below to be redirected to the email portal
                </p>
                <button
                  className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
                  onClick={onSendMail}
                >
                  Request documents via email!
                </button>

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

              <div className="lg:w-[calc(50%-30px)] w-full">
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
