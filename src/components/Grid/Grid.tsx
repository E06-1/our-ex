import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CellName, reset, selectTable } from "../../features/table/tableSlice";
import { useAppDispatch } from "../../store";
import Cell from "./Cell/Cell";
import "./Grid.css";

interface GridProps {
  rows: number;
  columns: number;
}

function Grid({ rows, columns }: GridProps) {
  const table = useSelector(selectTable);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(reset({ rows, columns }));
  }, [rows, columns, dispatch]);
  return (
    <div className="Grid">
      {Object.keys(table.present).map((cellname, state) => (
        <Cell cellname={cellname as CellName} />
      ))}
    </div>
  );
}

export default Grid;
