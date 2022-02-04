import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { useState, useEffect } from "react";
export default function Min() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells);
  // const getMin = (array) => Math.max(...array);

  // setting where result will be calculated
  const [resultCell, setResultCell] = useState(null);

  //setting MIN button to wait till selected cells will be chosen
  const [waitingForSelection, setWaitingForSelection] = useState(false);

  //updating Min Value
  const [minValue, SetMinValue] = useState(null);

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
    //getting min value
    SetMinValue(Math.min(...onlyNumValues));
  }, [selectedCells, waitingForSelection]);

  useEffect(() => {
    if (!minValue) return;
    //setting in resultCell => content: MinValue
    dispatch(setCellContent({ cellname: resultCell, content: minValue }));
  }, [minValue, dispatch, resultCell]);

  return (
    <Button
      onClick={() => {
        setResultCell(Object.keys(selectedCells)[0]);
        setWaitingForSelection(true);
      }}
      variant="contained"
    >
      Min
    </Button>
  );
}
