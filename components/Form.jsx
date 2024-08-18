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
  const [currentView, setCurrentView] = useState("FinanceAgreements");
  const [uploadedFinance, setUploadedFinance] = useState(false);
  const [uploadedBank, setUploadedBank] = useState(false);
  const [uploadedReceipts, setUploadedReceipts] = useState(false);
  const [createdCycle, setCreatedCycle] = useState(false);

  useEffect(() => {
    if (uploadedFinance && uploadedBank && uploadedReceipts) {
      setSubmitted(true);
    }
  }, [uploadedFinance, uploadedBank, uploadedReceipts]);

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
          <div>
            <div className="my-[60px]">
              <h3 className="text-[24px]">Upload Files</h3>
              <span className="text-[#959595]">
                Upload your financial documents for submission.
              </span>

              <div className="mt-10">
                <ul className="flex flex-row">
                  <li className="flex flex-col items-center mr-[10px] w-[170px] cursor-pointer">
                    <span
                      className={`flex justify-center items-center text-white w-[70px] h-[70px] text-center text-[24px] rounded-full mb-[10px] ${
                        currentView === "FinanceAgreements"
                          ? "bg-[#B18F13]"
                          : "bg-[#fae59a]"
                      } `}
                    >
                      1
                    </span>
                    <span className="block">Finance Agreements</span>
                  </li>

                  <li className="flex flex-col items-center mr-[10px] w-[170px] cursor-pointer">
                    <span
                      className={`flex justify-center items-center text-white w-[70px] h-[70px] text-center text-[24px] rounded-full mb-[10px] ${
                        currentView === "BankStatment"
                          ? "bg-[#B18F13]"
                          : "bg-[#fae59a]"
                      } `}
                    >
                      2
                    </span>
                    <span className="block">Bank Statment</span>
                  </li>

                  <li className="flex flex-col items-center mr-[10px] w-[170px] cursor-pointer">
                    <span
                      className={`flex justify-center items-center text-white w-[70px] h-[70px] text-center text-[24px] rounded-full mb-[10px] ${
                        currentView === "Receipts"
                          ? "bg-[#B18F13]"
                          : "bg-[#fae59a]"
                      } `}
                    >
                      3
                    </span>
                    <span className="block">Receipts</span>
                  </li>
                </ul>
              </div>
            </div>

            {currentView === "FinanceAgreements" && (
              <div>
                <div className="w-full flex flex-col lg:flex-row mb-20">
                  <div className="w-[100%] lg:w-[calc(50%-10px)]">
                    <p className="text-[20px] mb-[20px]">Finance Agreements</p>
                    <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                      Upload your any documentations to be viewed for your
                      accounts. Example: Morgage Agreements, HP Agreements...etc
                    </span>
                  </div>

                  <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
                    <FileUpload
                      setCurrentView={setCurrentView}
                      fileDescription="FinanceAgreements"
                      nextView="BankStatment"
                      setUploaded={setUploadedFinance}
                    ></FileUpload>
                  </div>
                </div>
              </div>
            )}

            {currentView === "BankStatment" && (
              <div>
                <div className="w-full flex flex-col lg:flex-row mb-20">
                  <div className="w-[100%] lg:w-[calc(50%-10px)]">
                    <p className="text-[20px] mb-[20px]">Bank Statment</p>
                    <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                      Upload your company's bank statements. Bank statements
                      show your financial transactions, including deposits,
                      withdrawals, and balances. They are important for
                      verifying your financial activities and maintaining
                      accurate records
                    </span>
                  </div>

                  <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
                    <FileUpload
                      setCurrentView={setCurrentView}
                      fileDescription="BankStatment"
                      nextView="Receipts"
                      setUploaded={setUploadedBank}
                    ></FileUpload>
                  </div>
                </div>
              </div>
            )}

            {currentView === "Receipts" && (
              <div>
                <div className="w-full flex flex-col lg:flex-row mb-20">
                  <div className="w-[100%] lg:w-[calc(50%-10px)]">
                    <p className="text-[20px] mb-[20px]">Receipts</p>
                    <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                      Provide your receipts for various expenses. Receipts are
                      proof of your business expenditures and are necessary for
                      accounting and tax purposes. They help in tracking
                      spending and verifying expense claims.
                    </span>
                  </div>

                  <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
                    <FileUpload
                      fileDescription="Receipts"
                      setUploaded={setUploadedReceipts}
                    ></FileUpload>
                  </div>
                </div>
              </div>
            )}
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
