import Link from "next/link";
import Image from "next/image";
import { CiLinkedin, CiInstagram } from "react-icons/ci";

const SubmitMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-[100px]">
      <Image
        src="/EnvelopeSimple.png"
        alt="Envelope"
        width={200}
        height={200}
      ></Image>
      <h3 className="text-[32px] text-[#4F4F4F] font-semibold mb-[20px] text-center">
        Thank you for your submission
      </h3>
      <p className="text-[#6D6D6D] mb-[20px] text-center">
        Documents sent successfully, we’ll get back to you soon once reviewed
      </p>
      <button className="bg-[#B18F13] py-[20px] px-[25px] rounded-full text-white">
        <Link href="/">Back to Home</Link>
      </button>

      <div className="mt-10">
        <p className="text-[20px] mb-[10px]">Social Media</p>
        <div className="text-[35px] flex flex-row justify-center">
          <Link href="/">
            <CiInstagram />
          </Link>
          <Link href="/">
            <CiLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmitMessage;
