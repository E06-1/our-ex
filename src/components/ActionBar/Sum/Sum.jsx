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

export default function Sum() {
  const dispatch = useAppDispatch();

  //allows select multiple times and still receive result in a result cell
  const selectedCells = useSelector(selectSelectedCells("additional"));

  const isSelecting = useSelector(selectIsSelecting("additional"));

  const focusedCell = useSelector(selectFocusedCell);

  // setting where result will be calculated
  const [resultCell, setResultCell] = useState(null);

  //updating Sum Value
  const [sumValue, SetSumValue] = useState(null);

  //resetting values if not selected
  useEffect(() => {
    if (!isSelecting) {
      setResultCell(null);
      SetSumValue(null);
    }
  }, [isSelecting]);

  useEffect(() => {
    if (!isSelecting) return;

    //stop calculating if result sell is included in selected cells
    if (Object.keys(selectedCells).includes(resultCell)) return;

    // All values from selected cells
    const values = Object.values(selectedCells).map((value) =>
      Number.parseInt(value.content)
    );
    //Only number array of selected cells
    const onlyNumValues = values.filter((item) => !Number.isNaN(item));

    // do nothing if no content in selected cells
    if (onlyNumValues.length === 0) return;

    // summing up all values and updating the state
    SetSumValue(onlyNumValues.reduce((a, b) => a + b, 0));
  }, [selectedCells, isSelecting, resultCell]);

  useEffect(() => {
    if (!sumValue) return;

    //setting in resultCell => content: SumValue
    dispatch(
      setCellContentWithRemeberedStyle({
        cellname: resultCell,
        content: sumValue,
      })
    );
  }, [sumValue, dispatch, resultCell]);

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
        Sum
      </Button>
    </div>
  );
}
