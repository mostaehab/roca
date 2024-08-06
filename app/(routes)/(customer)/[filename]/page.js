"use client";
import React, { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

const page = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const startDrawing = (event) => {
    const context = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    context.beginPath();
    context.moveTo(
      event.pageX - canvas.offsetLeft,
      event.pageY - canvas.offsetTop
    );
    setDrawing(true);
  };

  const endDrawing = () => {
    setDrawing(false);
  };

  const draw = (event) => {
    if (!drawing) return;
    const context = canvasRef.current.getContext("2d");
    const canvas = canvasRef.current;
    context.lineTo(
      event.pageX - canvas.offsetLeft,
      event.pageY - canvas.offsetTop
    );
    context.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const convertCanvasToImage = () => {
    const canvas = canvasRef.current;
    const base64 = canvas.toDataURL("image/png");
    setBase64Image(base64);
  };

  return (
    <div>
      <Header></Header>

      <div className="container mx-auto max-w-[90%]">
        <h3 className="text-[24px] mt-10">File View</h3>

        <p>File Name</p>

        <div className="w-[600px] h-[750px] mx-auto  rounded-xl">
          <iframe className="w-full h-full" src="/mostafa.pdf"></iframe>
        </div>
        <label for="username" className="block mt-10">
          <p className="text-[18px]">
            Signature*
            <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
              1
            </span>
          </p>
        </label>
        <input
          className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
          type="text"
          placeholder="Signature"
          name="signature"
          id="signature"
          required
        ></input>

        <div className="mt-10">
          <p className="text-[18px] mb-[15px]">
            Freehand Signature*
            <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
              2
            </span>
          </p>
          <canvas
            ref={canvasRef}
            height={300}
            width={window.innerWidth * 0.9}
            className="border-[#DADADA] border-2 rounded-xl bg-slate-200"
            onMouseDown={startDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onMouseMove={draw}
            onTouchEnd={endDrawing}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
          ></canvas>
        </div>

        <button
          onClick={convertCanvasToImage}
          className="cursor-pointer bg-[#B18F13] mb-10 mr-5 py-[15px] px-[40px] rounded-full text-white mt-[20px]"
        >
          Submit
        </button>

        <button
          onClick={clearCanvas}
          className="cursor-pointer bg-white border-[#B18F13] border-2 mb-10 py-[15px] px-[40px] rounded-full mt-[20px]"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default page;
