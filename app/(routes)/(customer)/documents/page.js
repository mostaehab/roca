"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Agreement from "@/components/Agreement";
import Form from "@/components/Form";
import SubmitMessage from "@/components/SubmitMessage";
import { redirect } from "next/navigation";
const page = () => {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /*useEffect(() => {
    if (typeof window !== undefined) {
      const userData = localStorage.getItem("authData");
      const userRole = JSON.parse(userData).user?.role;

      if (userRole && userRole === "System Admin") {
        redirect("/customerlist");
      }
    }
  }, []);*/

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
