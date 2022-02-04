import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../store";
import { setCellContent } from "../../../features/table/tableSlice";
import { setCellStyle } from "../../../features/table/tableSlice";
import tableSlice from "../../../features/table/tableSlice";

export default function Reset() {
  const dispatch = useAppDispatch();

  return (
    <Button variant="contained">
      Reset <RestartAltIcon />{" "}
    </Button>
  );
}
