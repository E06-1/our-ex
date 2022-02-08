import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import {
  selectFocusedCell,
  selectSelectedCells,
  selectIsSelecting,
} from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { useState, useEffect } from "react";
import { startAdditionalSelection } from "../../../features/selected/selectedSlice";

export default function Sum() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells("additional"));
  const isSelecting = useSelector(selectIsSelecting("additional"));
  const focusedCell = useSelector(selectFocusedCell);
  const [resultCell, setResultCell] = useState(null);

  //setting SUM button to wait till selected cells will be chosen

  //updating Sum Value
  const [sumValue, SetSumValue] = useState(null);

  useEffect(() => {
    if (!isSelecting) {
      setResultCell(null);
      SetSumValue(null);
    }
  }, [isSelecting]);

  useEffect(() => {
    if (!isSelecting) return;

    //
    if (Object.keys(selectedCells).includes(resultCell)) return;

    // All values from selected cells
    const values = Object.values(selectedCells).map((value) =>
      Number.parseInt(value.content)
    );
    //Only number array of selected cells
    const onlyNumValues = values.filter((item) => !Number.isNaN(item));

    // Checking if its not an empty array
    if (onlyNumValues.length === 0) return;

    //getting summing up all values and updating the state
    SetSumValue(onlyNumValues.reduce((a, b) => a + b, 0));
  }, [selectedCells, isSelecting, resultCell]);

  useEffect(() => {
    if (!sumValue) return;

    //setting in resultCell => content: SumValue
    dispatch(setCellContent({ cellname: resultCell, content: sumValue }));
  }, [sumValue, dispatch, resultCell]);

  return (
    <Button
      onClick={() => {
        setResultCell(focusedCell);
        dispatch(startAdditionalSelection());
      }}
      variant="contained"
      color="success"
    >
      Sum
    </Button>
  );
}
