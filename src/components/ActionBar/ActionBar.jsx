import React from "react";
import Max from "./Max/Max";
import Min from "./Min/Min";
import Sum from "./Sum/Sum";
import "./ActionBar.css";
import Random from "./Sort/Random";
import SortDown from "./Sort/SortDown";

export default function ActionBar() {
  return (
    <div className="actionBarContainer">
      <Sum></Sum>
      <Max></Max>
      <Min></Min>
      <Random />
      <SortDown />
    </div>
  );
}
