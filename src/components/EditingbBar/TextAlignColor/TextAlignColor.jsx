import * as React from "react";
import { styled } from "@mui/material/styles";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import SketchExample from "./ColorPicker";

import { selectSelectedCellNames } from "../../../features/selected/selectedSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import { mergeCellStyle } from "../../../features/table/tableSlice";
import { textAlign } from "@mui/system";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function TextAlignColor() {
  const dispatch = useAppDispatch();
  const selected = useSelector(selectSelectedCellNames("current"));

  const [alignment, setAlignment] = React.useState("left");
  const [fontWeight, setFontWeight] = React.useState(false);
  const [fontStyle, setFontStyle] = React.useState(false);
  const [textDecoration, setTextDecoration] = React.useState(false);
  const [fontColor, setFontColor] = React.useState("red");
  const [background, setBackground] = React.useState("white");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);

    dispatch(
      mergeCellStyle({
        cellname: selected,
        style: { textAlign: `${newAlignment}` },
      })
    );
  };

  const handleFontWeight = () => {
    setFontWeight(!fontWeight);

    if (fontWeight === false) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { fontWeight: "normal" },
        })
      );
    } else if (fontWeight === true) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { fontWeight: "bold" },
        })
      );
    }
  };

  const handleFontStyle = () => {
    setFontStyle(!fontStyle);

    if (fontStyle === false) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { fontStyle: "normal" },
        })
      );
    } else if (fontStyle === true) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { fontStyle: "italic" },
        })
      );
    }
  };

  const handleTextDecoration = () => {
    setTextDecoration(!textDecoration);

    if (textDecoration === false) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { textDecoration: "none" },
        })
      );
    } else if (textDecoration === true) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { textDecoration: "underline" },
        })
      );
    }
  };

  const handleColor = () => {
    dispatch(
      mergeCellStyle({
        cellname: selected,
        style: { color: fontColor },
      })
    );
  };

  const handleBackgroundColor = () => {
    dispatch(
      mergeCellStyle({
        cellname: selected,
        style: { backgroundColor: background },
      })
    );
  };

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified">
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          value={(fontWeight, fontStyle, textDecoration)}
          aria-label="text formatting"
        >
          <ToggleButton
            onClick={handleFontWeight}
            value={"bold"}
            aria-label="bold"
          >
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton
            onClick={handleFontStyle}
            value={"italic"}
            aria-label="italic"
          >
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton
            onClick={handleTextDecoration}
            value={"underlined"}
            aria-label="underlined"
          >
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton
            onClick={handleBackgroundColor}
            value="color"
            aria-label="color"
          >
            <FormatColorFillIcon />
            <SketchExample
              onChange={(color) =>
                setBackground(
                  `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                )
              }
            />
          </ToggleButton>
          <ToggleButton onClick={handleColor} value="color" aria-label="color">
            <FormatColorTextIcon />
            <SketchExample
              onChange={(color) =>
                setFontColor(
                  `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                )
              }
            />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
