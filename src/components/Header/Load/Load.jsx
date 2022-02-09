import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { isTable } from "../../../util/typeCheck";
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

    //retrieving file text to compare to excel table
    const table = JSON.parse(text);

    //if table file is compatible, overwriting all cell styles and contend from imported file
    if (isTable(table)) dispatch(overwrite(table));
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept=".json"
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
