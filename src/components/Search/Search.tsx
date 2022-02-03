import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Search } from '@mui/icons-material';
import "./Search.css";


export default function BasicTextFields() {
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
      <TextField id="outlined-basic" label="Search" variant="outlined" />
    </Box>
     <Stack spacing={2} direction="row">
  
     <Button className='searchButton' variant="contained"><Search/></Button>
    
   </Stack>
   
   </div>
  );
}
