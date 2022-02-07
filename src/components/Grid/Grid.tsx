import React, { useEffect, useState, useRef } from "react";
import { CellName } from "../../features/table/tableSlice";
import Cell from "./Cell/Cell";
import "./Grid.css";
import Header from "./Header/Header";
import Selection from "./Selection/Selection";

interface GridProps {
  rows: number;
  columns: number;
}

function Grid({ rows, columns }: GridProps) {
  const [grid, setGrid] = useState<JSX.Element[]>([]);
  const selectionRef = useRef<{
    start: HTMLDivElement | null;
    corner: HTMLDivElement | null;
  }>({ start: null, corner: null });

  //Generate Cellnames on initial Render
  useEffect(() => {
    const grid: JSX.Element[] = [];
    for (let r = 0; r < rows + 1; r++) {
      for (let c = 0; c < columns + 1; c++) {
        const cellname: CellName = `${c},${r}`;
        if (r === 0 && c === 0) {
          grid.push(<Header key={cellname} type="column" index={c}/>);
        } else if (r === 0) {
          grid.push(<Header key={cellname} type="column" index={c}/>);
        } else if (c === 0) {
          grid.push(<Header key={cellname}  type="row" index={r}/>);
        } else {
          grid.push(
            <Cell key={cellname} cellname={cellname} ref={selectionRef} />
          );
        }
      }
    }
    setGrid(grid);
  }, [rows, columns]);
  return (
    <div
      className="Grid"
      style={{
        display: "grid",
        width: "max-content",
        gridTemplateColumns: `2em repeat(${columns},minmax(15ch, min-content))`,
        gridTemplateRows: `repeat(${rows + 1},minmax(2em, min-content))`,
      }}
    >
      {grid}
      <Selection selectionRef={selectionRef} type="current" style={{background: "hsla(170,50%, 50%,0.2)",
        border: "2px solid green",}}/>
      <Selection selectionRef={selectionRef} type="additional" style={{background: "hsla(200,50%, 50%,0.2)",
        border: "2px solid blue",}}/>
    </div>
  );
}

export default Grid;
