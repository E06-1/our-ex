import React from "react";
import { useSelector } from "react-redux";
import { CellName, selectCell } from "../../../features/table/tableSlice";
import "./Cell.css";

interface CellProps {
  cellname: CellName;
}

function Cell({ cellname }: CellProps) {
  const cellstate = useSelector(selectCell(cellname));
  return (
    <input className="Cell" type="text" value={cellstate.content} style={cellstate.style} />
  );
}

export default Cell;
