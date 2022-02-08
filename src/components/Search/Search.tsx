import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import "./Search.css";
import { useSelector } from "react-redux";

import { initialState } from '../../features/search/searchSlice';
import { RootState } from '../../store';
import { selectPresentTable } from '../../features/table/tableSlice';



export default function BasicTextFields() {

  const table = useSelector(selectPresentTable)

  

  const [phrase, setPhrase] = React.useState("") 
  
  console.log(table);
  
  console.log(phrase);
  
  return (
      <div className='searchContainer'>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField onChange={event => setPhrase(event.target.value)}  id="outlined-basic" label="Search" variant="outlined" />
    </Box>
     <Stack spacing={2} direction="row">
  
    
    
   </Stack>
   
   </div>
  );
}
