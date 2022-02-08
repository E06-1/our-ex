import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
export default function SortDown() {
  return (
    <div>
      <Button variant="contained" color="success">
        Sort <ArrowDownwardIcon />
      </Button>
    </div>
  );
}
