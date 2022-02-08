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

export default function Min() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells("additional"));
  const focusedCell = useSelector(selectFocusedCell);

  const isSelecting = useSelector(selectIsSelecting("additional"));
  // const getMin = (array) => Math.max(...array);

  // setting where result will be calculated
  const [resultCell, setResultCell] = useState(null);

  //setting MIN button to wait till selected cells will be chosen

  //updating Min Value
  const [minValue, SetMinValue] = useState(null);

  useEffect(() => {
    if (!isSelecting) return;

    // All values from selected cells
    const values = Object.values(selectedCells).map((value) =>
      Number.parseInt(value.content)
    );
    //Only number array of selected cells
    const onlyNumValues = values.filter((item) => !Number.isNaN(item));

    // Checking if its not an empty array
    if (onlyNumValues.length === 0) return;
    //getting min value
    SetMinValue(Math.min(...onlyNumValues));
  }, [selectedCells, isSelecting]);

  useEffect(() => {
    if (!minValue) return;
    //setting in resultCell => content: MinValue
    dispatch(setCellContent({ cellname: resultCell, content: minValue }));
  }, [minValue, dispatch, resultCell]);

  return (
    <Button
      onClick={() => {
        setResultCell(focusedCell);
        dispatch(startAdditionalSelection());
      }}
      variant="contained"
    >
      Min
    </Button>
  );
}
