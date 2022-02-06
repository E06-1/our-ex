import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectSelectedCellNames,
  setSelected,
} from "../../features/selected/selectedSlice";
import {
  CellName,
  init,
  selectPresentTable,
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
  const [grid,setGrid] = useState<CellName[]>([]);
  const [editableCell, setEditableCell] = useState<CellName | null>(null);
  const [selectionStart, setSelectionStart] = useState<CellName | null>(null);
  const [selectionCorner, setSelectionCorner] = useState<CellName | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  /* const table = useSelector(selectPresentTable);*/
  const selectedCells = useSelector(selectSelectedCellNames); 
  const dispatch = useAppDispatch();

  const handleSelectionStart = (cellname: CellName) => {
    setIsSelecting(true);
    setSelectionStart(cellname);
  };

  const handleSelectionCorner = (cellname: CellName) => {
    if (!isSelecting) return;
    setSelectionCorner(cellname);
    if (!selectionStart || !cellname) return;
    dispatch(setSelected(determineSelection(selectionStart, cellname)));
  };

  const handleSelectionEnd = () => {
    if (!selectionCorner && selectionStart)
      dispatch(setSelected(selectionStart));
    if (selectionStart && selectionCorner)
      dispatch(
        setSelected(determineSelection(selectionStart, selectionCorner))
      );
    setSelectionStart(null);
    setSelectionCorner(null);
    setIsSelecting(false);
  };

  //Generate Cellnames on initial Render
  useEffect(() => {
    const cellNames: CellName[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          cellNames.push(`${c},${r}`)
        }
      }
      setGrid(cellNames);
  }, [rows,columns])

  return (
    <div
      className="Grid"
      style={{
        display: "grid",
        overflow: "auto",
        width: "max-content",
        gridTemplateColumns: `repeat(${columns},minmax(50px, min-content))`,
        gridTemplateRows: `repeat(${rows},minmax(50px, min-content))`,
      }}
    >
      {grid.map((cellname, index) => {/* console.log("map"); */
       return(
        <Cell
          key={cellname}
          cellname={cellname as CellName}
          isSelected={selectedCells.includes(cellname as CellName)}
          isEditable={cellname === editableCell}
          onRequestEditable={(cellname) => setEditableCell(cellname)}
          onRequestFocus={(cellname) => {
            console.log("requestFocus");

            dispatch(setSelected(cellname));
            setEditableCell(cellname === editableCell ? cellname : null);
          }}
          onSelectionStart={handleSelectionStart}
          onSelectionCorner={handleSelectionCorner}
          onSelectionEnd={handleSelectionEnd}
        />
        
      )})}
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

  const selection: CellName[] = [];
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
      selection.push(`${x},${y}`);
    }
  }
  return selection;
}

export default Grid;
