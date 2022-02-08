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

export default function Min() {
  const dispatch = useAppDispatch();

  //allows select multiple times and still receive result in a result cell
  const selectedCells = useSelector(selectSelectedCells("additional"));

  const focusedCell = useSelector(selectFocusedCell);

  const isSelecting = useSelector(selectIsSelecting("additional"));

  // setting where result will be calculated
  const [resultCell, setResultCell] = useState(null);

  //updating Min Value
  const [minValue, SetMinValue] = useState(null);

  //resetting values if not selected
  useEffect(() => {
    if (!isSelecting) {
      setResultCell(null);
      SetMinValue(null);
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

    //getting min value
    SetMinValue(Math.min(...onlyNumValues));
  }, [selectedCells, isSelecting]);

  useEffect(() => {
    if (!minValue) return;

    //setting in resultCell => content: MinValue
    dispatch(
      setCellContentWithRemeberedStyle({
        cellname: resultCell,
        content: minValue,
      })
    );
  }, [minValue, dispatch, resultCell]);

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
        Min
      </Button>
    </div>
  );
}
