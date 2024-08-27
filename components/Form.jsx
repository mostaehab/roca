"use client";
import FileUpload from "./FileUpload";
import { useEffect, useState } from "react";
import { AppContext } from "@/context";

const Form = ({ setSubmitted }) => {
  const { fetchCreateCycle, currentCycle, fetchGetCycle, setCurrentCycle } =
    AppContext();
  const currentDate = new Date();
  const userData = localStorage.getItem("authData");
  const [cycleData, setCycleData] = useState({
    id: 0,
    name: "",
    dateTime: currentDate.toISOString(),
    comment: "",
    userId: JSON.parse(userData)?.user?.id,
  });

  const [filesUploaded, setFilesUploaded] = useState(false);
  const [createdCycle, setCreatedCycle] = useState(false);

  useEffect(() => {
    if (filesUploaded) {
      setSubmitted(true);
    }
  }, [filesUploaded]);

  const onCycleDataChange = (event) => {
    const { name, value } = event.target;
    setCycleData({ ...cycleData, [name]: value });
  };

  const onSubmitCycle = async (event) => {
    event.preventDefault();
    try {
      const resposne = await fetchCreateCycle(cycleData);
      if (!resposne.ok) {
        return;
      }
      await resposne.json();
      setCreatedCycle(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("authData");
    if (userData) {
      const getUserCycle = async () => {
        const userId = JSON.parse(userData)?.user?.id;

        try {
          const data = await fetchGetCycle(userId);
          setCurrentCycle(data);
        } catch (error) {
          console.error("Error fetching user cycle:", error);
        }
      };

      getUserCycle();
    }
  }, [createdCycle]);

  return (
    <main>
      <div className="container max-w-[90%] mx-auto py-[50px]">
        {currentCycle[0] ? (
          <div className="mt-20">
            <div>
              <div className="w-full flex flex-col lg:flex-row mb-20">
                <div className="w-[100%] lg:w-[calc(50%-10px)]">
                  <p className="text-[20px] mb-[20px]">Accounting Documents</p>
                  <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                    Upload your any documentations to be viewed for your
                    accounts. Example: Morgage Agreements, HP Agreements...etc
                  </span>
                </div>

                <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
                  <FileUpload
                    fileDescription="AccountingDocuments"
                    setUploaded={setFilesUploaded}
                  ></FileUpload>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-[24px]">Fill in required fields</h3>
            <span className="text-[#959595]">
              Enter your personal and company information.
            </span>
            <form
              className="mt-[50px] flex flex-wrap justify-between"
              onSubmit={onSubmitCycle}
            >
              <div className="w-[100%] mb-[40px]">
                <label htmlFor="name">
                  <p className="text-[18px]">Name*</p>
                  <span className="text-[#959595]">
                    Fill in this field with your personal name
                  </span>
                </label>
                <input
                  className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                  type="text"
                  placeholder="Name"
                  value={cycleData.name}
                  onChange={onCycleDataChange}
                  name="name"
                  id="name"
                  required
                ></input>
              </div>

              <div className="w-[100%] mb-[40px]">
                <label htmlFor="name">
                  <p className="text-[18px]">Leave a comment</p>
                  <span className="text-[#959595]">
                    Leave a comment here if you want to highlight something
                  </span>
                </label>
                <textarea
                  className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                  type="text"
                  placeholder="Leave your comments here"
                  value={cycleData.comment}
                  onChange={onCycleDataChange}
                  name="comment"
                  id="comment"
                ></textarea>
              </div>

              <div>
                <input
                  type="submit"
                  value="Send"
                  className="cursor-pointer mb-[60px] bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[5px]"
                ></input>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Form;
