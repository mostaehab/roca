"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Agreement from "@/components/Agreement";
import Form from "@/components/Form";
import SubmitMessage from "@/components/SubmitMessage";
const page = () => {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
