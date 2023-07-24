/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

const testFunction = () => {
  const [selectedValues, setSelectedValues] = useState([
    { dropdownId: "dropdown1", selectedValue: "" },
    { dropdownId: "dropdown2", selectedValue: "" },
    { dropdownId: "dropdown3", selectedValue: "" },
    { dropdownId: "dropdown4", selectedValue: "" },
  ]);

  console.log("selectedValues", selectedValues);

  const handleDropdownChange = (event) => {
    const { id, value } = event.target;

    setSelectedValues((prevSelectedValues) =>
      prevSelectedValues.map((item) =>
        item.dropdownId === id ? { ...item, selectedValue: value } : item
      )
    );
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const exampleAsyncFunction = async () => {
    console.log("Start of the function");

    await sleep(2000);

    console.log("After 2 seconds");

    console.log("Doing other tasks...");

    await sleep(3000);

    console.log("After 3 seconds");

    console.log("End of the function");
  };

  // exampleAsyncFunction();

  return (
    <div>
      <div className="flex justify-center mt-5">
        <select id="dropdown1" onChange={handleDropdownChange}>
          <option value="">Select an option for Dropdown 1</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>

      <div className="flex justify-center mt-5">
        <select id="dropdown2" onChange={handleDropdownChange}>
          <option value="">Select an option for Dropdown 2</option>
          <option value="Option A">Option A</option>
          <option value="Option B">Option B</option>
          <option value="Option C">Option C</option>
        </select>
      </div>

      <div className="flex justify-center mt-5">
        <select id="dropdown3" onChange={handleDropdownChange}>
          <option value="">Select an option for Dropdown 3</option>
          <option value="Choice X">Choice X</option>
          <option value="Choice Y">Choice Y</option>
          <option value="Choice Z">Choice Z</option>
        </select>
      </div>

      <div className="flex justify-center mt-5">
        <select id="dropdown4" onChange={handleDropdownChange}>
          <option value="">Select an option for Dropdown 4</option>
          <option value="Apple">Apple</option>
          <option value="Banana">Banana</option>
          <option value="Orange">Orange</option>
        </select>
      </div>

      {/* <div className="flex justify-center mt-5">
        <h2>Selected Values:</h2>
        <ul className="flex justify-center flex-col mt-5">
          {selectedValues.map((item) => (
            <li key={item.dropdownId}>
              {item.dropdownId}: {item.selectedValue}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default testFunction;
