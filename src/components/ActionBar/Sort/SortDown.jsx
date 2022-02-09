import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
export default function SortDown() {
  const dispatch = useAppDispatch();

  // using current selector, no additional selection available
  const selectedCells = useSelector(selectSelectedCells("current"));

  const getSortedCells = () => {
    const cellNames = Object.keys(selectedCells);

    //retrieving cell content to array
    const cellContent = Object.values(selectedCells).map(
      (value) => value.content
    );
    //sorting cell content
    cellContent.sort((a, b) => b - a);

    //checking if any of the values are string
    const onlyNumValues = cellContent.reduce(
      (boolean, content) =>
        boolean && !Number.isNaN(Number.parseFloat(content)),
      true
    );
    //if values are numeric
    if (onlyNumValues) cellContent.sort((a, b) => b - a);
    // if values are a string
    else cellContent.sort();

    //removes the last value from an array and returns it
    return cellNames.map((cellname) => {
      const value = cellContent.pop();

      //for each cell returning new content value
      return { cellname, content: value };
    });
  };

  return (
    <div className="sortButton">
      <Button
        onClick={() => {
          const random = getSortedCells();
          console.log("random is", random);
          dispatch(setCellContent(random));
        }}
        variant="contained"
        color="success"
      >
        <ArrowDownwardIcon />
        Sort
        <ArrowUpwardIcon className="iconUp" />
      </Button>
    </div>
  );
}
