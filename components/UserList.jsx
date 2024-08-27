"use client";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { AppContext } from "@/context";
const UserList = () => {
  const { fetchAllUsers } = AppContext();
  const [allUsers, setAllUsers] = useState(null);
  const [searchedItems, setSearchedItems] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const data = await fetchAllUsers();
        if (!data) {
          return;
        }
        setAllUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const onUserSearch = async (event) => {
    const searchValue = event.target.value;
    try {
      const data = await fetchAllUsers(searchValue);
      if (!data) {
        return;
      }

      setSearchedItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayedItems = searchedItems || allUsers;

  return (
    <div>
      {" "}
      <h3 className="text-[24px]">Customer List</h3>
      <input
        type="text"
        placeholder="Search for customers by Name"
        className="block w-full border-[#A3A3A3] border-2 p-[20px] rounded-xl bg-[#FBFBFB] mt-10 mb-[20px]"
        onChange={onUserSearch}
      ></input>
      <div className="flex flex-wrap">
        {displayedItems &&
          displayedItems?.map((user) => {
            return (
              <UserCard
                key={user?.id}
                companyName={user?.companyName}
                email={user?.email}
                id={user?.id}
              ></UserCard>
            );
          })}
      </div>
    </div>
  );
};

export default UserList;
