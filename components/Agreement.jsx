"use client";
import { RiErrorWarningLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { AppContext } from "@/context";

const Agreement = ({ agreementHandle, setSubmitted }) => {
  const { fetchGetFiles, fetchGetCycle, setCurrentCycle, currentCycle } =
    AppContext();
  const [cycleFiles, setCycleFiles] = useState(null);

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
  }, [fetchGetCycle, setCurrentCycle]);

  useEffect(() => {
    const getCycleFiles = async () => {
      if (currentCycle && currentCycle.length > 0) {
        try {
          const response = await fetchGetFiles(currentCycle[0]?.id);
          if (!response.ok) {
            return;
          }
          const data = await response.json();
          setCycleFiles(data[0]);
          localStorage.setItem("cycleFiles", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching cycle files:", error);
        }
      }
    };

    getCycleFiles();
  }, [currentCycle, fetchGetFiles]);

  useEffect(() => {
    if (cycleFiles) {
      setSubmitted(true);
    }
  }, [cycleFiles, setSubmitted]);

  return (
    <main>
      <div className="container max-w-[90%] mx-auto py-[50px]">
        <h3 className="text-[24px]">Agreement</h3>
        <div>
          <p className="mt-[50px] leading-7 rounded-lg bg-[#F8F8F8] p-[20px] border-2 border-[DADADA]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Why do we use it? It is
            a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose.
          </p>

          <span className="text-[#959595] block mt-[20px] w-[70%]">
            <RiErrorWarningLine className="text-[30px] mb-[10px]"></RiErrorWarningLine>
            Please read the agreement carefully before proceeding. By
            continuing, you acknowledge that you have understood and accepted
            all the terms and conditions.
          </span>

          <button
            className="bg-[#B18F13] py-[15px] px-[30px] rounded-full text-white mt-[20px]"
            onClick={agreementHandle}
          >
            I Agree
          </button>
        </div>
      </div>
    </main>
  );
};

export default Agreement;
