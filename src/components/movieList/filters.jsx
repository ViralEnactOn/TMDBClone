/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function filters() {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="p-3 bg-white rounded-lg mt-5 drop-shadow-2xl">
      <div className="flex justify-between" onClick={() => handleIsOpen()}>
        <div className="font-semibold">Filters</div>
        <div>
          <ChevronRightIcon />
        </div>
      </div>
      {isOpen && (
        <>
          <div className="border-t-2 mt-2 pt-2 text-gray-400">
            Release Dates
          </div>

          <div className="flex justify-between">
            <div className="self-center opacity-40 text-sm">from</div>
            <div className="border-2 rounded-lg p-2">
              <input type="date" className="text-xs "></input>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="self-center opacity-40 text-sm">to</div>
            <div className="border-2 rounded-lg p-2">
              <input type="date" className="text-xs "></input>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default filters;
