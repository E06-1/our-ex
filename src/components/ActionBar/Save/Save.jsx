import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { selectPresentTable } from "../../../features/table/tableSlice";

export default function Save() {
  const table = useSelector(selectPresentTable);
  const [url, setUrl] = useState("/");
  useEffect(() => {
    const file = new File([JSON.stringify(table)], "table.ox", {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    setUrl(url);
  }, [table]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <a
          href={url}
          download={true}
          // onClick={(e) => (e.target.href = "./data.ox")}
        >
          {" "}
          <Button variant="contained" component="span">
            Save <SaveIcon />
          </Button>
        </a>
      </label>
    </Stack>
  );
}
