import React from "react";
import Load from "./Load/Load";
import Max from "./Max/Max";
import Min from "./Min/Min";
import Reset from "./Reset/Reset";
import Save from "./Save/Save";
import Sum from "./Sum/Sum";
import "./ActionBar.css";

export default function ActionBar() {
  return (
    <div className="actionBarContainer">
      <Save></Save>
      <Load></Load>
      <Reset></Reset>
      <Sum></Sum>
      <Max></Max>
      <Min></Min>
    </div>
  );
}
