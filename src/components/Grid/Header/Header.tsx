import React, { useLayoutEffect, useRef, useState } from "react";

interface HeaderProps {
  type: "row" | "column";
  index: number;
}

function Header({ type, index }: HeaderProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState(0)

    useLayoutEffect(() => {
        if(!ref.current || type === "row") return;
        setOffset(ref.current.offsetTop)     
    }, [type])
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        background: "hsl(0, 0%,95%)",
        border: "1px solid lightgray",
        position: "sticky",
        top: type === "column" ? `${offset}px` : "",
        left: type === "row" ? "0" : "",
        zIndex: type === "column" ? "1" : "0"
      }}
      ref={ref}
    >
      {determineLabel({ type, index })}
    </div>
  );
}

function determineLabel({ type, index }: Pick<HeaderProps, "type" | "index">) {
  const abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  if (type === "row") return index;
  const maxChars = Math.ceil(index / abc.length);
  const label: string[] = [];

  for (let c = 1; c <= maxChars; c++) {
    label.push(abc[(index - 1) % abc.length]);
    index = Math.floor(index / abc.length);
  }

  return label.reverse().join("");
}

export default Header;
