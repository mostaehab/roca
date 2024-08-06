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

  const onSubmitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const sumbitMessage = () => {};

  return (
    <>
      <Header></Header>

      {submitted ? (
        <SubmitMessage />
      ) : agreed ? (
        <Form onSubmitForm={onSubmitForm}></Form>
      ) : (
        <Agreement agreementHandle={agreementHandle}></Agreement>
      )}
    </>
  );
};

export default page;
