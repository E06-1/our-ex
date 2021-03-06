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

// 1. When Max is clicked determine and save in local state the additionally selected Cell
// 2. When the key event handled, calculate the max value and dispatch(setCellContent({cellname: resultCell, content: maxValue }))

export default function Max() {
  const dispatch = useAppDispatch();

  //allows select multiple times and still receive result in a result cell
  const selectedCells = useSelector(selectSelectedCells("additional"));

  const focusedCell = useSelector(selectFocusedCell);

  const isSelecting = useSelector(selectIsSelecting("additional"));

  // setting a cell where result will be calculated
  const [resultCell, setResultCell] = useState(null);

  //updating Max Value
  const [maxValue, SetMaxValue] = useState(null);

  //resetting values if not selected
  useEffect(() => {
    if (!isSelecting) {
      setResultCell(null);
      SetMaxValue(null);
    }
  }, [isSelecting]);

  useEffect(() => {
    if (!isSelecting) return;

    // All values from selected cells
    const values = Object.values(selectedCells).map((value) =>
      Number.parseInt(value.content)
    );

    //Only number array of selected cells
    const onlyNumValues = values.filter((item) => !Number.isNaN(item));

    // do nothing if no content in selected cells
    if (onlyNumValues.length === 0) return;

    //getting max value
    SetMaxValue(Math.max(...onlyNumValues));
  }, [selectedCells, isSelecting]);

  useEffect(() => {
    if (!maxValue) return;

    //setting in resultCell => content: MaxValue
    dispatch(
      setCellContentWithRemeberedStyle({
        cellname: resultCell,
        content: maxValue,
      })
    );
  }, [maxValue, dispatch, resultCell]);

  return (
    <div>
      <Button
        onClick={() => {
          setResultCell(focusedCell);
          dispatch(startAdditionalSelection());
        }}
        variant="contained"
        color="success"
      >
        Max
      </Button>
    </div>
  );
}
