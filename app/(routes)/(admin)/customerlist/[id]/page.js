"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import FIlesContainer from "@/components/FIlesContainer";
import { AppContext } from "@/context";
const page = () => {
  const { getCycleById, fetchGetFiles } = AppContext();
  const [currentCycle, setCurrentCycle] = useState(null);
  const [cycleFiles, setCycleFiles] = useState(null);
  const [financeAgreements, setFinanceAgreements] = useState(null);
  const [bankStatment, setBankStatment] = useState(null);
  const [receipts, setReceipts] = useState(null);
  const [requested, setRequested] = useState(null);
  const [signed, setSigned] = useState(null);
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData) {
      redirect("/signin");
    }
  }, []);

  useEffect(() => {
    const getCycle = async () => {
      const cycleId = window.location.pathname.slice("customerlist".length + 2);
      try {
        const data = await getCycleById(cycleId);
        if (!data) {
          return;
        }
        setCurrentCycle(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCycle();
  }, []);

  useEffect(() => {
    const getCycleFiles = async () => {
      try {
        const response = await fetchGetFiles(currentCycle?.id);
        const data = await response.json();
        setCycleFiles(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentCycle) {
      getCycleFiles();
    }
  }, [currentCycle]);

  useEffect(() => {
    if (cycleFiles) {
      const financeAgreements = cycleFiles.filter((file) => {
        return file?.fileDescription === "FinanceAgreements";
      });
      setFinanceAgreements(financeAgreements);

      const bankStatment = cycleFiles.filter((file) => {
        return file?.fileDescription === "BankStatment";
      });
      setBankStatment(bankStatment);

      const receipts = cycleFiles.filter((file) => {
        return file?.fileDescription === "Receipts";
      });
      setReceipts(receipts);
      const requested = cycleFiles.filter((file) => {
        return file?.fileDescription === "Requested File";
      });
      setRequested(requested);

      const signedDocument = cycleFiles.filter((file) => {
        return file?.fileDescription === "Signed Document";
      });
      setSigned(signedDocument);
    }
  }, [cycleFiles]);

  return (
    <div>
      <Header title="Admin Portal"></Header>
      <div className="container max-w-[90%] mx-auto">
        <div className="mt-10">
          <p className="text-[24px]">Customer Name</p>
          <p className="text-[20px] font-semibold">{currentCycle?.name}</p>
        </div>

        {cycleFiles && (
          <div>
            {" "}
            <FIlesContainer
              title="Finance Agreements"
              files={financeAgreements}
            ></FIlesContainer>
            <FIlesContainer
              title="Bank Statments"
              files={bankStatment}
            ></FIlesContainer>
            <FIlesContainer title="Receipts" files={receipts}></FIlesContainer>
            <FIlesContainer
              title="Requested Files"
              files={requested}
            ></FIlesContainer>
            <FIlesContainer
              title="Signed Files"
              files={signed}
            ></FIlesContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
