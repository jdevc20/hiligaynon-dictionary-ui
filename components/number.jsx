import React, { useState } from "react";

// Function to insert commas into a number every three digits from the right
function insertCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to convert numeric input to Hiligaynon text format
function numberToHiligaynonText(number) {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("Input must be a valid number.");
  }

  const numberMappings = new Map([
    [1, "isa"],
    [2, "duha"],
    [3, "tatlo"],
    [4, "apat"],
    [5, "lima"],
    [6, "anom"],
    [7, "pito"],
    [8, "walo"],
    [9, "siyam"],
    [10, "napulo"],
    // Add more mappings as needed
  ]);

  // Function to convert a number less than 1000 to Hiligaynon text
  function numberLessThan1000ToText(num) {
    let text = "";

    // Handle hundreds place
    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      text += `${numberMappings.get(hundreds)} ka gatos`;
      num %= 100;
      if (num > 0) text += " kag ";
    }

    // Handle tens and units place
    if (num >= 10) {
      const tens = Math.floor(num / 10);
      text += `${numberMappings.get(tens)} ka napulo`;
      num %= 10;
      if (num > 0) text += " kag ";
    }

    if (num > 0) {
      text += `${numberMappings.get(num)}`;
    }

    return text;
  }

  // Main conversion process
  let text = "";

  if (number === 0) {
    return "zero";
  }

  if (number >= 1000000000 && number <= 999000000000) { // Limit to 999 billion
    const billions = Math.floor(number / 1000000000);
    text += `<span class="billion">${numberMappings.get(billions)} ka bilyon</span>`;
    number %= 1000000000;
    if (number > 0) text += ", kag ";
  }

  if (number >= 1000000) {
    const millions = Math.floor(number / 1000000);
    text += `<span class="million">${numberLessThan1000ToText(millions)} ka milyon</span>`;
    number %= 1000000;
    if (number > 0) text += ", kag ";
  }

  if (number >= 1000) {
    const thousands = Math.floor(number / 1000);
    text += `<span class="thousand">${numberLessThan1000ToText(thousands)} ka libo</span>`;
    number %= 1000;
    if (number > 0) text += ", kag ";
  }

  if (number > 0) {
    text += `<span class="hundred">${numberLessThan1000ToText(number)}</span>`;
  }

  return text;
}

function NumberToHiligaynonText() {
  const [inputNumber, setInputNumber] = useState("");
  const [hiligaynonText, setHiligaynonText] = useState("");

  const handleConvert = () => {
    try {
      const number = parseInt(inputNumber.replace(/,/g, ""), 10); // Remove commas if present
      if (isNaN(number)) {
        throw new Error("Input must be a valid number.");
      }
      
      const formattedNumber = insertCommas(number);
      const convertedText = numberToHiligaynonText(number);
      setHiligaynonText(convertedText);
      setInputNumber(formattedNumber); // Update input to show formatted number
    } catch (error) {
      console.error(error.message);
      setHiligaynonText("Invalid input. Please enter a valid number.");
    }
  };

  // Function to render the Hiligaynon text with span tags for each segment
  const renderHiligaynonText = (text) => {
    // Use dangerouslySetInnerHTML to render HTML content
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="container page">
      <div className="NumberToHiligaynonText">
        <h2>Hiligaynon Number Converter</h2>
        <input
          type="text"
          className="form-control full-width-textarea"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          placeholder="Enter a number"
        />
        <button className="btn btn-primary m-2" onClick={handleConvert}>
          Convert
        </button>
        <p>Translated to Hiligaynon:</p>
        <p>{renderHiligaynonText(hiligaynonText)}</p>
      </div>
    </div>
  );
}

export default NumberToHiligaynonText;
