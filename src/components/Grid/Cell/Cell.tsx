import { textAlign } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  endSelection,
  refreshSelection,
  selectIsEditable,
  selectIsSelected,
  setEditableCell,
  setFocusedCell,
  setSelectionCorner,
  setSelectionStart,
  startSelection,
} from "../../../features/selected/selectedSlice";
import { CellName, selectCell } from "../../../features/table/tableSlice";
import { setCellContentWithRemeberedStyle } from "../../../features/thunkActions";
import { store, useAppDispatch } from "../../../store";
import "./Cell.css";

interface CellProps {
  cellname: CellName;
}

export default React.forwardRef<
  { start: HTMLDivElement | null; corner: HTMLDivElement | null },
  CellProps
>(function Cell({ cellname }: CellProps, selectionRef) {
  const ref = useRef<HTMLDivElement | null>(null);

  const cellstate = useSelector(selectCell(cellname));
  const isEditable = useSelector(selectIsEditable(cellname));
  const dispatch = useAppDispatch();

  const [rememberedStyle, setRememberedStyle] = useState<React.CSSProperties>(
    {}
  );

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.innerText !== cellstate.content)
      dispatch(
        setCellContentWithRemeberedStyle({
          cellname,
          content: ref.current.innerText,
        })
      );
  }, [cellname, cellstate.content, dispatch, isEditable]);

  useEffect(() => {
    if (isEditable) {
      if (!ref.current) return;
      setRememberedStyle(store.getState().style);
      setCaret(ref.current);
    } else {
      setRememberedStyle({});
    }
  }, [isEditable, cellstate]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key.length === 1 && !isEditable) {
      dispatch(setEditableCell(cellname));
    }
  };

  return (
    <div
      id={cellname}
      className="Cell"
      style={{
        border: "1px solid lightgray",
        ...cellstate.style,
        ...rememberedStyle,
        overflow: "visible",
        userSelect: isEditable ? "text" : "none",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      onDoubleClick={() => {
        dispatch(setEditableCell(cellname));
      }}
      onFocus={() => {
        dispatch(setFocusedCell(cellname));
        if (
          !(selectionRef instanceof Function) &&
          selectionRef &&
          selectionRef.current
        ) {
          selectionRef.current.start = ref.current;
          selectionRef.current.corner = ref.current;
        }
      }}
      onMouseDown={() => {
        dispatch(startSelection());
        dispatch(setSelectionStart(cellname));
        if (
          !(selectionRef instanceof Function) &&
          selectionRef &&
          selectionRef.current
        ) {
          selectionRef.current.start = ref.current;
          selectionRef.current.corner = ref.current;
        }
      }}
      /* onFocus={() => onRequestFocus(cellname)} */
      contentEditable={isEditable}
      suppressContentEditableWarning
      ref={(element) => {
        ref.current = element;
      }}
      tabIndex={0}
      onMouseEnter={(e) => {
        if (!store.getState().selected.isSelecting) return;
        dispatch(setSelectionCorner(cellname));
        if (
          !(selectionRef instanceof Function) &&
          selectionRef &&
          selectionRef.current
        )
          selectionRef.current.corner = ref.current;
      }}
      onMouseUp={() => dispatch(endSelection())}
      onDragOverCapture={(e) => e.preventDefault()}
      draggable={false}
      onDrag={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onKeyDown={handleKeyDown}
      onInput={() => dispatch(refreshSelection())}
    >
      {cellstate.content}
    </div>
  );
});

function setCaret(element: HTMLElement) {
  const nodes = element.childNodes;
  if (nodes.length === 0) element.innerText = " ";
  const range = document.createRange();
  const selection = window.getSelection();

  range.setStart(nodes[0], 0);
  range.setEnd(
    nodes[0],
    nodes[0].textContent?.length ? nodes[0].textContent?.length : 0
  );
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
}
