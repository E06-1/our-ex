import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../store";
import { reset } from "../../../features/table/tableSlice";

export default function Reset() {
  const dispatch = useAppDispatch();
  // dispatching action:reset the whole table
  return (
    <div>
      <Button
        color="error"
        variant="outlined"
        onClick={() => dispatch(reset())}
      >
        Reset <RestartAltIcon />{" "}
      </Button>
    </div>
  );
}
