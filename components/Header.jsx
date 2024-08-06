import Link from "next/link";
import Image from "next/image";

const Header = ({ title, subtitle }) => {
  return (
    <div className="cover w-full h-[400px]">
      <div className="bg-[#B18F13] bg-opacity-50 h-full">
        <div className="container max-w-[90%] h-full mx-auto">
          <Link href="/" className="w-[100px]">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-auto"
            ></Image>
          </Link>

          <div className="py-[60px]">
            <h1 className="text-[54px] font-semibold text-white">
              {title ? title : "Customer Portal"}
            </h1>
            <p className="font-medium text-[24px] text-white">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
