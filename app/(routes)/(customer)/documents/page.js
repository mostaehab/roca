"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Agreement from "@/components/Agreement";
import Form from "@/components/Form";
import SubmitMessage from "@/components/SubmitMessage";
import { redirect } from "next/navigation";
import { AppContext } from "@/context";
const page = () => {
  const { currentCycle, fetchGetFiles, toBeSigned, setToBeSigned } =
    AppContext();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [cycleFiles, setCycleFiles] = useState(null);

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

      if (filtered[0]) {
        localStorage.setItem("cycleFilesStored", JSON.stringify(filtered));
        redirect("/filesmanagement");
      }
    }
  }, [cycleFiles]);

  console.log(cycleFiles);

  const agreementHandle = () => {
    setAgreed(!agreed);
  };

  return (
    <>
      <Header></Header>

      {submitted ? (
        <SubmitMessage />
      ) : agreed ? (
        <Form setSubmitted={setSubmitted}></Form>
      ) : (
        <Agreement
          agreementHandle={agreementHandle}
          setSubmitted={setSubmitted}
        ></Agreement>
      )}
    </>
  );
};

export default page;
