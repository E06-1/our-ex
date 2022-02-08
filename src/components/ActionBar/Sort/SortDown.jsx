import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";
import { selectSelectedCells } from "../../../features/selected/selectedSlice";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
export default function SortDown() {
  const dispatch = useAppDispatch();

  const selectedCells = useSelector(selectSelectedCells("current"));

  const getSortedCells = () => {
    const cellNames = Object.keys(selectedCells);
    const cellContent = Object.values(selectedCells).map(
      (value) => value.content
    );
    cellContent.sort((a, b) => b - a);
    //checking if any of the values are string
    const onlyNumValues = cellContent.reduce(
      (boolean, content) =>
        boolean && !Number.isNaN(Number.parseFloat(content)),
      true
    );
    if (onlyNumValues) cellContent.sort((a, b) => b - a);
    else cellContent.sort();
    return cellNames.map((cellname) => {
      const value = cellContent.pop();

      return { cellname, content: value };
    });
  };

  return (
    <div>
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
        Sort <ArrowUpwardIcon />
      </Button>
    </div>
  );
}
