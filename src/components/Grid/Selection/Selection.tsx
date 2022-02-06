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
import { CellName, deleteCellContent, setCellContent } from "../../../features/table/tableSlice";
import { useAppDispatch } from "../../../store";

function Selection({
  selectionRef,
}: {
  selectionRef: React.MutableRefObject<{
    start: HTMLDivElement | null;
    corner: HTMLDivElement | null;
  } | null>;
}) {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [size, setSize] = useState({ height: 0, width: 0 });
  const selectionStart = useSelector(selectSelectionStart);
  const selectionCorner = useSelector(selectSelectionCorner);
  const selectionNames = useSelector(selectSelectedCellNames)
  const refresh = useSelector(selectRefreshSelection);
  useLayoutEffect(() => {
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
        if(!(e instanceof KeyboardEvent)) return;
        if (e.key === "Delete") dispatch(deleteCellContent(selectionNames))
      };
    const grid = document
      .getElementsByClassName("Grid")[0]
    grid.addEventListener("keydown", handleKeyDown);

    return () => grid.removeEventListener("keydown", handleKeyDown)
  }, [selectionNames]);
  return (
    <div
      className="Selection"
      style={{
        background: "hsla(200,50%, 50%,0.2)",
        border: "2px solid blue",
        boxSizing: "border-box",
        position: "absolute",
        top: offset.top,
        left: offset.left,
        height: size.height,
        width: size.width,
        pointerEvents: "none",
      }}
    ></div>
  );
}

export default Selection;
