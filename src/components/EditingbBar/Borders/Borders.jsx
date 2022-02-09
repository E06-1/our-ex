import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { selectSelectedCellNames } from "../../../features/selected/selectedSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store";
import { mergeCellStyle } from "../../../features/table/tableSlice";
import {
  selectSelectionCorner,
  selectSelectionStart,
} from "../../../features/selected/selectedSlice";
import BorderAllIcon from '@mui/icons-material/BorderAll';
import "./Borders.css"

export default function PositionedMenu() {
  const dispatch = useAppDispatch();
  const selected = useSelector(selectSelectedCellNames("current"));
  const start = useSelector(selectSelectionStart("current"));
  const corner = useSelector(selectSelectionCorner("current"));

  const [normal, setNormal] = React.useState(false);
  const [bold, setBold] = React.useState(false);
  const [dotted, setDotted] = React.useState(false);
  const [color, setColor] = React.useState("black");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNormalBorder = () => {
    setNormal(!normal);

    if (normal === false) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { border: "solid 1px lightgray" },
        })
      );
    } else if (normal === true) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { border: "solid 1.5px ", borderCollapse: "collapse" },
        })
      );
    }
  };

  const handleBoldBorder = () => {
    setBold(!bold);

    if (bold === false) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { border: "solid 1px lightgray " },
        })
      );
    } else if (bold === true) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { border: "solid 2px " },
        })
      );
    }
  };

  const handleDottedBorder = () => {
    setDotted(!dotted);

    if (dotted === false) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { border: "solid 1px lightgray " },
        })
      );
    } else if (dotted === true) {
      dispatch(
        mergeCellStyle({
          cellname: selected,
          style: { border: "dotted 1.5px " },
        })
      );
    }
  };

  const handleOutlineBorder = () => {
    const borderCells = determineBorders(selected, start, corner);

    for(let i in borderCells){
        dispatch(
            mergeCellStyle({
                cellname:borderCells[i],
                style: {
                    [`border${i}`]: "solid 3px "
                }
            })
        )
    }

    console.log(borderCells);

  
  };



  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BorderAllIcon className="borderIcon" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleNormalBorder}>Normal</MenuItem>
        <MenuItem onClick={handleBoldBorder}>Bold</MenuItem>
        <MenuItem onClick={handleDottedBorder}>Dotted</MenuItem>
        <MenuItem onClick={handleOutlineBorder}>Outline</MenuItem>
      </Menu>
    </div>
  );
}

function determineBorders(cellNames, start, corner) {
  const startCoordinates = start.split(",").map(coordinate => Number.parseInt(coordinate));
  const cornerCoordinates = corner.split(",").map(coordinate => Number.parseInt(coordinate));
  const bottomCoordinate =
    startCoordinates[1] >= cornerCoordinates[1]
      ? startCoordinates[1]
      : cornerCoordinates[1];
  const topCoordinate =
    startCoordinates[1] <= cornerCoordinates[1]
      ? startCoordinates[1]
      : cornerCoordinates[1];

  const rightCoordinate =
    startCoordinates[0] >= cornerCoordinates[0]
      ? startCoordinates[0]
      : cornerCoordinates[0];
  const leftCoordinate =
    startCoordinates[0] <= cornerCoordinates[0]
      ? startCoordinates[0]
      : cornerCoordinates[0];


  return cellNames.reduce(
    (result, cellName) => {
      const coordinates = cellName.split(",").map(coordinate => Number.parseInt(coordinate));

      if (coordinates[0] === leftCoordinate) {
        result.Left.push(cellName);
      }

      if (coordinates[0] === rightCoordinate) {
        result.Right.push(cellName);
      }

      if (coordinates[1] === topCoordinate) {
        result.Top.push(cellName);
      }

      if (coordinates[1] === bottomCoordinate) {
        result.Bottom.push(cellName);
      }

      return result;

    },
    { Top: [], Bottom: [], Left: [], Right: [] }
  );
}
