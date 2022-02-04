import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { useState, useEffect } from "react";

export default function Sum() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells);
  //array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
  // const sum = (total, value) => total + value;

  const [resultCell, setResultCell] = useState(null);

  //setting MAX button to wait till selected cells will be chosen
  const [waitingForSelection, setWaitingForSelection] = useState(false);

  //updating Max Value
  const [maxValue, SetMaxValue] = useState(null);

  useEffect(() => {
    if (!waitingForSelection) return;

    // All values from selected cells
    const values = Object.values(selectedCells).map((value) =>
      Number.parseInt(value.content)
    );
    //Only number array of selected cells
    const onlyNumValues = values.filter((item) => !Number.isNaN(item));
    //console.log("values are", onlyNumValues);
    if (onlyNumValues.length === 0) return;
    //getting max value
    SetMaxValue(Math.max(...onlyNumValues));
    console.log("num values", onlyNumValues);
    // onlyNumValues.reduce(function(total, currentValue), initialValue)
    console.log("max value", Math.max(...onlyNumValues));
  }, [selectedCells, waitingForSelection]);

  useEffect(() => {
    if (!maxValue) return;

    //setting in resultCell => content: MaxValue
    dispatch(setCellContent({ cellname: resultCell, content: maxValue }));
  }, [maxValue, dispatch, resultCell]);

  return (
    <Button
      onClick={() => {
        setResultCell(Object.keys(selectedCells)[0]);
        setWaitingForSelection(true);
      }}
      variant="contained"
    >
      Sum
    </Button>
  );
}
