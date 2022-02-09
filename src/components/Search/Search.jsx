import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import "./Search.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectPresentTable } from "../../features/table/tableSlice";
import { useAppDispatch } from "../../store";
import { setSearchResults } from "../../features/search/searchSlice";
import "./Search.css";

const debounce = (() => {
  let timeOut = null;

  return (fn) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }

    timeOut = setTimeout(() => {
      fn();
      timeOut = null;
    }, 500);
  };
})();
export default function BasicTextFields() {
  const table = useSelector(selectPresentTable);

  const dispatch = useAppDispatch();

  const [phrase, setPhrase] = React.useState("");

  const handleChange = (event) => {
    setPhrase("" + event.target.value);
  };
  useEffect(() => {
    debounce(() => {
      if (phrase === "") {
        dispatch(setSearchResults([]));
        return;
      }

      const cellNames = [];

      for (let i in table) {
        if (table[i].content.includes(phrase)) {
          cellNames.push(i);
        }
      }

      dispatch(setSearchResults(cellNames));
    });
  }, [phrase, dispatch, table]);

  return (
    <div className="searchContainer">
      <Box
      
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
        className="search"
          onChange={handleChange}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </Box>
      <Stack spacing={2} direction="row"></Stack>
    </div>
  );
}
