import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { ActionCreators } from "redux-undo";
import {selectFutureTable, selectPastTable} from '../../../features/table/tableSlice';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';




export default function UndoRedo() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  
  //selecting past/future table array
  const pastTable = useSelector(selectPastTable);
  const futureTable = useSelector(selectFutureTable);

  // handleClick/close used for dropdown menu 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

// dispatching REDO / UNDO actions 
  const handleUndo = ()=> {
     setAnchorEl(null);
     dispatch(ActionCreators.undo())
  }
  const handleRedo = ()=> {
    setAnchorEl(null);
    dispatch(ActionCreators.redo())
 }
  return (
    <div className='redoUndoContainer'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <UndoIcon />  
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > {/* checking if there are any past/ future tables to disable buttons if false */}
        <MenuItem disabled= {pastTable.length === 0 ? true: false}  onClick={handleUndo}><UndoIcon/> Undo</MenuItem>
        <MenuItem  disabled= {futureTable.length === 0 ? true: false}  onClick={handleRedo}><RedoIcon/> Redo</MenuItem>
      </Menu>
    </div>
  );
}
