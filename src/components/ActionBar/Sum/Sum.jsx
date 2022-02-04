import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { useState, useEffect } from "react";

export default function Sum() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells);

  const [resultCell, setResultCell] = useState(null);

  //setting SUM button to wait till selected cells will be chosen
  const [waitingForSelection, setWaitingForSelection] = useState(false);

  //updating Sum Value
  const [sumValue, SetSumValue] = useState(null);

  useEffect(() => {
    if (!waitingForSelection) return;

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
  }, [selectedCells, waitingForSelection]);

  useEffect(() => {
    if (!sumValue) return;

    //setting in resultCell => content: SumValue
    dispatch(setCellContent({ cellname: resultCell, content: sumValue }));
  }, [sumValue, dispatch, resultCell]);

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
