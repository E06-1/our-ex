import React from "react";
import Save from "./Save/Save";
import Load from "./Load/Load";
import Reset from "./Reset/Reset";
import { Icon } from "@iconify/react";

export default function Header() {
  return (
    <div className="header">
      <Icon icon="mdi:file-excel" className="icon" />
      <Save />
      <Load />
      <Reset />
    </div>
  );
}
