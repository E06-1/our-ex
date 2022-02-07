import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { useState, useEffect } from "react";

export default function Max() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells("current"));

  // 1. When Max is clicked determine and save in local state the currently selected Cell (firstSelected)
  // 2. When the selection changes calculate the max value and dispatch(setCellContent({cellname: firstSelected, content: getMax}))

  // setting where result will be calculated
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
      Max
    </Button>
  );
}

function isSameSelection(selection1, selection2) {
  const joinedSelection = { ...selection1, ...selection2 };
  return (
    Object.keys(selection1).length === Object.keys(selection2).length &&
    Object.keys(selection2).length === Object.keys(joinedSelection).length
  );
}
