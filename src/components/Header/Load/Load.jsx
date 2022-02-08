import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import { isTable } from "../../../util/typeCheck";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../store";
import { overwrite } from "../../../features/table/tableSlice";

const Input = styled("input")({
  display: "none",
});

export default function UploadButtons() {
  const dispatch = useAppDispatch();

  const inputHandler = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    console.log("text is", text);
    const table = JSON.parse(text);
    if (isTable(table)) dispatch(overwrite(table));
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept=".ox"
          id="contained-button-file"
          multiple
          type="file"
          onInput={inputHandler}
        />
        <Button variant="outlined" component="span">
          Load <DriveFolderUploadIcon />
        </Button>
      </label>
    </Stack>
  );
}
