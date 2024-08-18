"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import CustomerActions from "@/components/CustomerActions";
import { AppContext } from "@/context";
import { redirect } from "next/navigation";

const Page = () => {
  const { fetchAllCycles } = AppContext();
  const [allCycle, setAllCycle] = useState([]);
  const [searchedCycle, setSearchedCycle] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    if (!authData) {
      redirect("/signin");
    }
  }, []);

  useEffect(() => {
    const getAllCurrentCycles = async () => {
      try {
        const data = await fetchAllCycles();
        if (data) {
          setAllCycle(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getAllCurrentCycles();
  }, [fetchAllCycles]); // Dependency on fetchAllCycles

  const onSearchCycle = (event) => {
    const searchValue = event.target.value.trim().toLowerCase(); // Trim whitespace and make search case-insensitive
    if (Array.isArray(allCycle) && searchValue) {
      const searchedCycleVar = allCycle.filter((cycle) =>
        cycle.name.toLowerCase().includes(searchValue)
      );

      if (searchedCycleVar) {
        setSearchedCycle(() => searchedCycleVar);
      } else {
        console.log("No cycle found with the name:", searchValue);
      }
    } else {
      console.log("Invalid search or no cycles available.");
    }
  };

  const cyclesToDisplay = searchedCycle || allCycle;

  return (
    <div>
      <Header title="Admin Portal"></Header>

      <div className="container max-w-[90%] mx-auto">
        <h3 className="text-[24px] mt-10">Customer List</h3>
        <input
          type="text"
          placeholder="Search for customers by Name"
          onChange={onSearchCycle}
          className="block w-full border-[#A3A3A3] border-2 p-[20px] rounded-xl bg-[#FBFBFB] mt-10"
        ></input>

        {cyclesToDisplay.map((cycle) => (
          <CustomerActions
            key={cycle?.id}
            cycle={cycle}
            setAllCycle={setAllCycle}
          ></CustomerActions>
        ))}
      </div>
    </div>
  );
};

export default Page;
