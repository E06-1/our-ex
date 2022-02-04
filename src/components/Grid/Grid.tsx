import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectSelectedCells,
  setSelected,
} from "../../features/selected/selectedSlice";
import {
  CellName,
  init,
  selectTable,
  setCellContent,
} from "../../features/table/tableSlice";
import { useAppDispatch } from "../../store";
import Cell from "./Cell/Cell";
import "./Grid.css";

interface GridProps {
  rows: number;
  columns: number;
}

function Grid({ rows, columns }: GridProps) {
  const [editableCell, setEditableCell] = useState<CellName | null>(null);
  const [selectionStart, setSelectionStart] = useState<CellName | null>(null);
  const [selectionCorner, setSelectionCorner] = useState<CellName | null>(null);
  const [newSelection, setNewSelection] = useState<CellName[]>([]);

  const table = useSelector(selectTable);
  const selectedCells = useSelector(selectSelectedCells);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const resetAction = init({ rows, columns });
    dispatch(resetAction);
  }, [rows, columns, dispatch]);

  const handleSelectionStart = (cellname: CellName) => {
    setSelectionStart(cellname);
  };

  const handleSelectionCorner = (cellname: CellName) => {
    setSelectionCorner(cellname);
    if(!selectionStart || !cellname) return;
    dispatch(setSelected(determineSelection(selectionStart, cellname)))
  };

  const handleSelectionEnd = () => {
    if(!selectionStart || !selectionCorner) return;
    dispatch(setSelected(determineSelection(selectionStart, selectionCorner)))
    setSelectionStart(null)
    setSelectionCorner(null)
  };

  useEffect(() => {
    if(!selectionStart || !selectionCorner) return;
    setNewSelection(determineSelection(selectionStart, selectionCorner))
  }, [selectionStart, selectionCorner])

  return (
    <div
      className="Grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns},minmax(50px, min-content))`,
        gridTemplateRows: `repeat(${rows},minmax(50px, min-content))`,
      }}
    >
      {Object.keys(table.present).map((cellname, index) => (
        <Cell
          key={cellname}
          cellname={cellname as CellName}
          isSelected={selectedCells.includes(cellname as CellName)}
          isEditable={cellname === editableCell}
          onRequestEditable={(cellname) => setEditableCell(cellname)}
          onRequestFocus={(cellname) => {
            dispatch(setSelected(cellname));
            setEditableCell(cellname === editableCell ? cellname : null);
          }}
          onSelectionStart={handleSelectionStart}
          onSelectionCorner={handleSelectionCorner}
          onSelectionEnd={handleSelectionEnd}
        />
      ))}
    </div>
  );
}

function determineSelection(
  selectionStart: CellName,
  selectionCorner: CellName
) {
  let startCords = selectionStart
    .split(",")
    .map((str) => Number.parseInt(str))
    .reduce((coords, value, index) => {
      if (index === 0) return { ...coords, x: value };
      if (index === 1) return { ...coords, y: value };
      return coords;
    }, {} as { x: number; y: number });

  let endCords = selectionCorner
    .split(",")
    .map((str) => Number.parseInt(str))
    .reduce((coords, value, index) => {
      if (index === 0) return { ...coords, x: value };
      if (index === 1) return { ...coords, y: value };
      return coords;
    }, {} as { x: number; y: number });

    const selection: CellName[] = []
  for (
    let x = startCords.x;
    startCords.x <= endCords.x ? x <= endCords.x : x >= endCords.x;
    startCords.x <= endCords.x ? x++ : x--
  ) {
    for (
      let y = startCords.y;
      startCords.y <= endCords.y ? y <= endCords.y : y >= endCords.y;
      startCords.y <= endCords.y ? y++ : y--
    ) {
      selection.push(`${x},${y}`)
    }
    
  }
  return selection;
}

export default Grid;
