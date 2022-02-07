import React, {
  useState,
  useLayoutEffect,
  useEffect,
  KeyboardEventHandler,
} from "react";
import { useSelector } from "react-redux";
import {
  selectIsSelecting,
  selectRefreshSelection,
  selectSelectedCellNames,
  selectSelectionCorner,
  selectSelectionStart,
} from "../../../features/selected/selectedSlice";
import {
  CellName,
  deleteCellContent,
  setCellContent,
} from "../../../features/table/tableSlice";
import { useAppDispatch } from "../../../store";

interface SelectionProps {
  selectionRef: React.MutableRefObject<{
    start: HTMLDivElement | null;
    corner: HTMLDivElement | null;
  } | null>;
  type: "current" | "additional";
  style?: React.CSSProperties
}

function Selection({ selectionRef, type, style}: SelectionProps) {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [size, setSize] = useState({ height: 0, width: 0 });
  const selectionStart = useSelector(selectSelectionStart(type));
  const selectionCorner = useSelector(selectSelectionCorner(type));
  const selectionNames = useSelector(selectSelectedCellNames(type));
  const refresh = useSelector(selectRefreshSelection);

  useLayoutEffect(() => {
    if(type === "additional" && !selectionStart && !selectionCorner) {setOffset({top: 0, left: 0}); setSize({ height: 0, width: 0 })}
    if (!selectionStart || !selectionCorner || !selectionRef.current) return;

    const startDiv = selectionRef.current.start;
    const cornerDiv = selectionRef.current.corner;

    if (!startDiv || !cornerDiv) return;
    const offset = {
      top:
        startDiv.offsetTop < cornerDiv.offsetTop
          ? startDiv.offsetTop
          : cornerDiv.offsetTop,
      left:
        startDiv.offsetLeft < cornerDiv.offsetLeft
          ? startDiv.offsetLeft
          : cornerDiv.offsetLeft,
    };

    setOffset(offset);
    setSize({
      height:
        cornerDiv.offsetTop > offset.top
          ? cornerDiv.offsetTop + cornerDiv.offsetHeight - startDiv.offsetTop
          : startDiv.offsetTop + startDiv.offsetHeight - offset.top,
      width:
        cornerDiv.offsetLeft > offset.left
          ? cornerDiv.offsetLeft + cornerDiv.offsetWidth - startDiv.offsetLeft
          : startDiv.offsetLeft + startDiv.offsetWidth - offset.left,
    });
  }, [selectionStart, selectionCorner, selectionRef, refresh]);

  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e.key === "Delete") dispatch(deleteCellContent(selectionNames));
    };
    const grid = document.getElementsByClassName("Grid")[0];
    grid.addEventListener("keydown", handleKeyDown);

    return () => grid.removeEventListener("keydown", handleKeyDown);
  }, [selectionNames, dispatch]);
  return (
    <div
      className="Selection"
      style={{
        boxSizing: "border-box",
        position: "absolute",
        top: offset.top,
        left: offset.left,
        height: size.height,
        width: size.width,
        pointerEvents: "none",
        ...style
      }}
    ></div>
  );
}

export default Selection;
