import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../store";
import { reset } from "../../../features/table/tableSlice";

export default function Reset() {
  const dispatch = useAppDispatch();

  return (
    <Button color="error" variant="outlined" onClick={() => dispatch(reset())}>
      Reset <RestartAltIcon />{" "}
    </Button>
  );
}
