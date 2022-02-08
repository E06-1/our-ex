import React from "react";
import Save from "./Save/Save";
import Load from "./Load/Load";
import Reset from "./Reset/Reset";
import { Icon } from "@iconify/react";
import { FaGripLinesVertical } from "react-icons/fa";

export default function Header() {
  return (
    <div className="mainFunctionButtons">
      <Icon icon="mdi:file-excel" className="icon" />
      <Save />
      <Load />
      <Reset />
      <FaGripLinesVertical className="divider" />
    </div>
  );
}
