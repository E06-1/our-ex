import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import {
  selectFocusedCell,
  selectSelectedCells,
  selectIsSelecting,
} from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { useState, useEffect } from "react";
import { startAdditionalSelection } from "../../../features/selected/selectedSlice";
import { setCellContentWithRemeberedStyle } from "../../../features/thunkActions";
import { setCellContent } from "../../../features/table/tableSlice";

export default function Random() {
  const dispatch = useAppDispatch();

  const selectedCells = useSelector(selectSelectedCells("current"));

  const getRandomizedCells = () => {
    const cellNames = Object.keys(selectedCells);
    const cellContent = Object.values(selectedCells).map(
      (value) => value.content
    );

    return cellNames.map((cellname) => {
      const value = cellContent[Math.floor(Math.random() * cellContent.length)];

      cellContent.splice(cellContent.indexOf(value), 1);
      return { cellname, content: value };
    });
  };

  // All values from selected cells

  // setRandom(values.sort(() => Math.random() - 0.5));

  return (
    <div>
      <Button
        onClick={() => {
          const random = getRandomizedCells();
          console.log("random is", random);
          dispatch(setCellContent(random));
        }}
        variant="contained"
        color="success"
      >
        Randomize
      </Button>
    </div>
  );
}
