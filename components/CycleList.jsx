import React, { useState, useEffect } from "react";
import CustomerActions from "./CustomerActions";
import { AppContext } from "@/context";

const CycleList = () => {
  const { fetchAllCycles } = AppContext();
  const [currentCycles, setCurrentCycles] = useState(null);
  const [searchedItems, setSearchedItems] = useState(null);

  useEffect(() => {
    const getAllCurrentCycles = async () => {
      try {
        const data = await fetchAllCycles();
        if (data) {
          setCurrentCycles(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getAllCurrentCycles();
  }, [fetchAllCycles]);

  const onCycleSearch = async (event) => {
    const searchValue = event.target.value;
    try {
      const data = await fetchAllCycles(searchValue);
      if (!data) {
        return;
      }

      setSearchedItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayedItems = searchedItems || currentCycles;

  return (
    <div>
      <h3 className="text-[24px]">Cycles List</h3>
      <input
        type="text"
        placeholder="Search for customers by Name"
        onChange={onCycleSearch}
        className="block w-full border-[#A3A3A3] border-2 p-[20px] rounded-xl bg-[#FBFBFB] mt-10"
      ></input>

      {displayedItems?.[0] ? (
        displayedItems?.map((cycle) => (
          <CustomerActions
            key={cycle?.id}
            cycle={cycle}
            setCurrentCycles={setCurrentCycles}
          ></CustomerActions>
        ))
      ) : (
        <div className="text-center text-[24px] mt-20">
          There are no cycles at the moment
        </div>
      )}
    </div>
  );
};

export default CycleList;
