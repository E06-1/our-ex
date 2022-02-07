import React from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export default function Save() {
  const Input = styled("input")({
    display: "none",
  });
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept=".ox"
          id="contained-button-file"
          type="file"
          //onInput={saveHandler}
        />
        <Button variant="contained" component="span">
          Save <SaveIcon />
        </Button>
      </label>
    </Stack>
  );
}
