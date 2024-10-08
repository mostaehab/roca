"use client";
import React, { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import { modifyPdf } from "@/utils/pdfUtils";
import { AppContext } from "@/context";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

const page = () => {
  const {
    fetchDownlaodFile,
    currentCycle,
    fetchUploadFiles,
    fetchGetCycle,
    setCurrentCycle,
    deleteFiles,
    toBeSigned,
  } = AppContext();
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [base64Image, setBase64Image] = useState("");
  const [digitalSign, setDigitalSign] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [link, setLink] = useState(null);
  const [file, setFile] = useState(null);
  const [toBeUploaded, setToBeUploaded] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();
  const router = useRouter();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData) {
      redirect("/signin");
    }
  }, []);

  const onBackHome = async () => {
    try {
      const response = await deleteFiles(file?.[0]?.id);
      console.log(response);
      router.push("/filesmanagement");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const userData = JSON.parse(localStorage.getItem("authData"));
      setData(userData);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const getUserCycle = async () => {
        const userId = data?.user?.id;

        try {
          const dataCycle = await fetchGetCycle(userId);
          if (!dataCycle) {
            return;
          }

          setCurrentCycle(dataCycle);
        } catch (error) {
          console.error("Error fetching user cycle:", error);
        }
      };

      getUserCycle();
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== undefined) {
      const filesNames = toBeSigned?.map((file) => file?.fileName);
      const currentPath = window.location.pathname.slice(1); // Remove leading slash
      if (!filesNames?.includes(currentPath)) {
        redirect("/filesmanagement");
      }
      const fileName = window.location.pathname.slice(1);
      const file = toBeSigned?.filter((file) => file.fileName === fileName);
      setFile(file);
    }
  }, []);

  useEffect(() => {
    const downloadFile = async () => {
      const data = await fetchDownlaodFile(file?.[0]?.id);
      const pdfFile = new File([data], "pdf", { type: "application/pdf" });
      const reader = new FileReader();
      reader.readAsDataURL(pdfFile);
      reader.onloadend = () => {
        const base64 = reader.result;
        setLink(base64);
      };
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
      const pdfFile = new File([blob], `${file?.[0]?.fileName}`, {
        type: "application/pdf",
      });
      console.log(pdfFile);
      setToBeUploaded(pdfFile);
      setPdfUrl(url);
    };
    if (link && file) {
      loadPdf();
    }
  }, [base64Image]);

  const onSubmitUpload = async (event) => {
    event.preventDefault();

    if (currentCycle) {
      let formData = new FormData();
      formData.append("FileName", toBeUploaded.name);
      formData.append("FileDescription", "Signed Document");
      formData.append("CreatedAt", currentDate.toISOString());
      formData.append("Id", 0);
      formData.append(`file`, toBeUploaded);
      formData.append("UpdatedAt", currentDate.toISOString());
      formData.append("CreatedBy", data.user.companyName);
      formData.append("UserCycleId", currentCycle[0]?.id);
      formData.append("fileTypeId", 3);

      setLoading(true);
      try {
        await fetchUploadFiles(formData);
        setUploaded(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

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
    setSubmitted(true);
  };

  return (
    <div>
      <Header></Header>
      <div className="container mx-auto max-w-[90%]">
        <div>
          <h3 className="text-[24px] mt-10">File View</h3>

          <p>{file?.[0]?.fileName}</p>

          <div className="w-[60%] h-[80vh] mx-auto  rounded-xl">
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

            {loading && <div className="mt-[20px]">Uploading Files...</div>}
            {uploaded && (
              <div className="mt-[20px] text-green-600">
                Files Uploaded successfully
              </div>
            )}

            {uploaded ? (
              <div>
                <button
                  onClick={onBackHome}
                  className="cursor-pointer bg-[#B18F13] mb-10 py-[15px] px-[40px] rounded-full text-white mt-[20px] text-[10px] lg:text-[18px]"
                >
                  Back to home
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="submit"
                  className="cursor-pointer bg-[#B18F13] mb-10 mr-5 py-[15px] px-[40px] rounded-full text-white mt-[20px] text-[10px] lg:text-[18px]"
                  value="Submit"
                ></input>

                <button
                  onClick={clearCanvas}
                  className="cursor-pointer bg-white border-[#B18F13] border-2 mb-10 py-[15px] px-[40px] rounded-full mt-[20px] mr-5 text-[10px] lg:text-[18px]"
                >
                  Clear
                </button>

                {submitted && (
                  <button
                    onClick={onSubmitUpload}
                    className="cursor-pointer bg-[#B18F13] mb-10 py-[15px] px-[40px] rounded-full text-white mt-[20px] text-[10px] lg:text-[18px]"
                  >
                    Upload
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
