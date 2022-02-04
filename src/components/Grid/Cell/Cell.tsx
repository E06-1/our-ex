import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { setSelected } from "../../../features/selected/selectedSlice";
import {
  CellName,
  selectCell,
  setCellContent,
} from "../../../features/table/tableSlice";
import { useAppDispatch } from "../../../store";
import "./Cell.css";

interface CellProps {
  cellname: CellName;
  isSelected: boolean;
  onRequestEditable: (cellname: CellName) => void;
  isEditable: boolean;
  onRequestFocus: (cellname: CellName) => void;
  onSelectionStart: (cellname: CellName) => void;
  onSelectionCorner: (cellname: CellName) => void;
  onSelectionEnd: () => void;
}

export default React.forwardRef(function Cell(
  {
    cellname,
    isSelected,
    onRequestEditable,
    isEditable,
    onRequestFocus,
    onSelectionStart,
    onSelectionCorner,
    onSelectionEnd,
  }: CellProps,
  forwarRef
) {
  const ref = useRef<HTMLDivElement>(null);

  const cellstate = useSelector(selectCell(cellname));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerText !== cellstate.content)
      dispatch(setCellContent({ cellname, content: ref.current.innerText }));
  }, [isSelected, cellname, cellstate.content, dispatch]);

  useEffect(() => {
    if (!ref.current) return;
    if (isEditable) ref.current.focus();
  }, [isEditable]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case "Delete":
        dispatch(setCellContent({ cellname, content: "" }));
        break;
    }
  };

  return (
    <div
      id={cellname}
      className="Cell"
      style={{
        border: "1px solid lightgray",
        ...cellstate.style,
        outline: isSelected ? "2px solid red" : "transparent",
        overflow: "visible",
        zIndex: isSelected ? "2" : "0",
      }}
      onClick={() => onRequestFocus(cellname)}
      onDoubleClick={() => onRequestEditable(cellname)}
      /* onDrag={() => console.log("onDrag")} */
      onMouseDown={() => onSelectionStart(cellname)}
      onFocus={() => onRequestFocus(cellname)}
      contentEditable={isEditable}
      suppressContentEditableWarning
      ref={ref}
      tabIndex={0}
      onMouseEnter={(e) => {
        e.preventDefault();
        onSelectionCorner(cellname);
      }}
      onMouseUp={() => onSelectionEnd()}
      onDragOverCapture={(e) => e.preventDefault()}
      draggable={false}
      onDrag={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onKeyDown={handleKeyDown}
    >
      {cellstate.content}
    </div>
  );
});
