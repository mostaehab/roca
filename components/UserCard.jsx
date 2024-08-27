import React, { useState } from "react";
import { AppContext } from "@/context";
const UserCard = ({ companyName, email, id }) => {
  const { resetPassword } = AppContext();
  const [userData, setUserData] = useState({
    email: email,
    password: "",
  });
  const [restPassword, setResetPassword] = useState(false);
  const [resetting, setRestting] = useState(false);
  const [done, setDone] = useState(false);

  const onWritePassword = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const onRestPassword = async (event) => {
    event.preventDefault();
    try {
      setRestting(true);
      const resposne = await resetPassword(userData);
      if (!resposne) {
        return;
      }
      setDone(true);
    } catch (error) {
      console.log(error);
    } finally {
      setRestting(false);
    }
  };

  return (
    <div className="w-full xl:w-[calc(50%-20px)] my-[10px] bg-[#FBFBFB] border-[#A3A3A3] border-2 p-10 rounded-2xl mr-[20px]">
      <div>
        <p className="bg-[#B18F13] w-[70px] h-[70px] text-white rounded-full flex flex-auto justify-center items-center text-[18px]">
          {id}
        </p>
        <div className="flex flex-row my-10">
          <p className="mr-[30px]">
            <span className="block text-[18px]">Company Name</span>
            <span className="text-[24px]">{companyName}</span>
          </p>
          <p>
            <span className="block text-[18px]">Email</span>
            <span className="text-[24px]">{email}</span>
          </p>
        </div>

        {restPassword ? (
          <form>
            <input
              type="text"
              placeholder="New password"
              className="block w-full border-[#A3A3A3] border-2 p-[20px] rounded-xl bg-[#FBFBFB] mt-10 mb-[20px]"
              name="password"
              value={userData.password}
              onChange={onWritePassword}
              required
            ></input>
            {resetting && <span className="block">Resetting password...</span>}
            {done && (
              <span className="block">Password changed successfully</span>
            )}
            <button
              type="submit"
              className="cursor-pointer border-[#B18F13] border-2 bg-white py-[15px] px-[40px] rounded-full inline-block"
              onClick={onRestPassword}
            >
              Reset Password
            </button>
          </form>
        ) : (
          <button
            className="cursor-pointer border-[#B18F13] border-2 bg-white py-[15px] px-[40px] rounded-full inline-block"
            onClick={() => setResetPassword(true)}
          >
            Reset Password
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
