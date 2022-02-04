import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { useState, useEffect } from "react";

export default function Max() {
  const dispatch = useAppDispatch();
  const selectedCells = useSelector(selectSelectedCells);

  // 1. When Max is clicked determine and save in local state the currently selected Cell (firstSelected)
  // 2. When the selection changes calculate the max value and dispatch(setCellContent({cellname: firstSelected, content: getMax}))
  const [resultCell, setResultCell] = useState(null);

  const [waitingForSelection, setWaitingForSelection] = useState(false);
  const [maxValue, SetMaxValue] = useState(null);
  useEffect(() => {
    if (!waitingForSelection) return;
    const values = Object.values(selectedCells).map((value) =>
      Number.parseInt(value.content)
    );
    SetMaxValue(Math.max(...values));
  }, [selectedCells, waitingForSelection]);

  useEffect(() => {
    if (!maxValue) return;
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
