import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { selectSelectedCellNames} from "../../../features/selected/selectedSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import { mergeCellStyle } from "../../../features/table/tableSlice";

import "./Font.css";
import { rememberStyle } from "../../../features/style/styleSlice";

export default function Font() {
  const dispatch = useAppDispatch();
  const selected = useSelector(selectSelectedCellNames("current"));

  const [size, setSize] = React.useState("12");
  const [family, setFamily] = React.useState("Arial, Helvetica, sans-serif");

  const handleFontSize = (event: SelectChangeEvent) => {
    setSize(event.target.value);

    dispatch(
      mergeCellStyle({
        cellname: selected,
        style: { fontSize: `${event.target.value}px` },
      })
    );
    dispatch(rememberStyle({ fontSize: `${event.target.value}px` }))
  };

  const handleFontFamily = (event: SelectChangeEvent) => {
    setFamily(event.target.value);

    dispatch(
      mergeCellStyle({
        cellname: selected,
        style: { fontFamily: `${event.target.value}` },
      })
    );
    dispatch(rememberStyle({ fontFamily: `${event.target.value}` }))
  };

  return (
    <div>
    <Box className="fontBox">
      <Select
        className="fontStyle"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={family}
        label="Arial"
        onChange={handleFontFamily}
        defaultValue="Arial, Helvetica, sans-serif"
      >
        <MenuItem
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          value={"Arial, Helvetica, sans-serif"}
        >
          Arial
        </MenuItem>
        <MenuItem
          style={{
            fontFamily:
              "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
          }}
          value={"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}
        >
          Cambria
        </MenuItem>

        <MenuItem
          style={{
            fontFamily: "'Courier New', Courier, monospace",
          }}
          value={"'Courier New', Courier, monospacey"}
        >
          Courier New
        </MenuItem>

        <MenuItem
          style={{
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
          }}
          value={"Georgia, 'Times New Roman', Times, serif"}
        >
          Georgia
        </MenuItem>

        <MenuItem
          style={{
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
          }}
          value={"Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"}
        >
          Impact
        </MenuItem>

        <MenuItem
          style={{
            fontFamily: "'Times New Roman', Times, serif",
          }}
          value={"'Times New Roman', Times, serif"}
        >
          Times New Roman
        </MenuItem>

        <MenuItem
          style={{
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          }}
          value={"Verdana, Geneva, Tahoma, sans-serif"}
        >
          Verdana
        </MenuItem>
      </Select>

      <Select
      className="fontSize"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={size}
        label="Age"
        onChange={handleFontSize}
        defaultValue="12"
      >
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={24}>24</MenuItem>
        <MenuItem value={36}>36</MenuItem>
      </Select>
    </Box>
    </div>
  );
}
