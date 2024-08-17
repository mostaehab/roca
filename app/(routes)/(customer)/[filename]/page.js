"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { modifyPdf } from "@/utils/pdfUtils";
import { AppContext } from "@/context";
import { redirect } from "next/navigation";
const page = () => {
  const { fetchDownlaodFile } = AppContext();
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [digitalSign, setDigitalSign] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [link, setLink] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== undefined) {
      const files = JSON.parse(localStorage.getItem("cycleFilesStored"));
      const filesNames = files.map((file) => file?.fileName);
      const currentPath = window.location.pathname.slice(1); // Remove leading slash
      if (!filesNames.includes(currentPath)) {
        redirect("/filesmanagement");
      }
      const fileName = window.location.pathname.slice(1);
      const file = files.filter((file) => file.fileName === fileName);
      setFile(file);
    }
  }, []);

  useEffect(() => {
    const downloadFile = async () => {
      const data = await fetchDownlaodFile(file?.[0]?.id);
      const fileUrl = URL.createObjectURL(data);
      setLink(fileUrl);
    };

    if (file) {
      downloadFile();
    }
  }, [file]);

  useEffect(() => {
    const loadPdf = async () => {
      const imgUrl = base64Image;
      const modifiedPdf = await modifyPdf(imgUrl, link, digitalSign);
      const blob = new Blob([modifiedPdf], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    if (link) {
      loadPdf();
    }
  }, [base64Image]);

  console.log(link);

  if (isClient && canvasRef.current) {
    window.addEventListener("resize", () => {
      const canavs = canvasRef.current;
      canavs.width = 500;
    });
  }

  const onDigitalSignature = (event) => {
    const { value } = event.target;
    setDigitalSign(value);
  };

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

  const convertCanvasToImage = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const base64 = canvas.toDataURL("image/png");
    setBase64Image(base64);
  };

  return (
    <div>
      <Header></Header>
      <div className="container mx-auto max-w-[90%]">
        {downloaded ? (
          <div>
            <h3 className="text-[24px] mt-10">File View</h3>

            <p>{file?.[0]?.fileName}</p>

            <div className="w-[600px] h-[750px] mx-auto  rounded-xl">
              <iframe
                className="w-full h-full"
                src={pdfUrl ? pdfUrl : link}
              ></iframe>
            </div>
            <form onSubmit={convertCanvasToImage}>
              <label htmlFor="username" className="block mt-10">
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
                value={digitalSign}
                onChange={onDigitalSignature}
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
                  height={150}
                  width={isClient ? window.innerWidth * 0.5 : null}
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

              <input
                type="submit"
                className="cursor-pointer bg-[#B18F13] mb-10 mr-5 py-[15px] px-[40px] rounded-full text-white mt-[20px]"
                value="Submit"
              ></input>

              <button
                onClick={clearCanvas}
                className="cursor-pointer bg-white border-[#B18F13] border-2 mb-10 py-[15px] px-[40px] rounded-full mt-[20px]"
              >
                Clear
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center my-20">
            <div className="text-center">
              <h3 className="text-[24px]">File Download</h3>
              <p className="my-5 text-[18px] text-[#969696]">
                Download the provided files to sign it within our platform
              </p>
              <iframe className="w-full h-full" src={link}></iframe>
              <Link href="#" onClick={() => setDownloaded(true)}>
                <div className="bg-[#B18F13] px-10 py-5 inline-block rounded-full text-white text-[18px]">
                  Download File {file?.[0]?.fileName}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
