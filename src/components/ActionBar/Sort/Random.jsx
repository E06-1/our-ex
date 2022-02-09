import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";

export default function Random() {
  const dispatch = useAppDispatch();

  // using current selector, no additional selection available
  const selectedCells = useSelector(selectSelectedCells("current"));

  const getRandomizedCells = () => {
    const cellNames = Object.keys(selectedCells);

    //retrieving cell content to array
    const cellContent = Object.values(selectedCells).map(
      (value) => value.content
    );

    return cellNames.map((cellname) => {
      //randomize cell content array
      const value = cellContent[Math.floor(Math.random() * cellContent.length)];

      //splicing already used value
      cellContent.splice(cellContent.indexOf(value), 1);

      //for each cell returning new content value
      return { cellname, content: value };
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          const random = getRandomizedCells();

          dispatch(setCellContent(random));
        }}
        variant="contained"
        color="success"
      >
        Randomize
      </Button>
    </div>
  );
}
