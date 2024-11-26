import { useState } from "react";

export const AndOrGate = ({
  x,
  y,
  type = "and",
  onMouseDown,
}: {
  x: number;
  y: number;
  type?: "and" | "or";
  onMouseDown: (e: React.MouseEvent) => void;
}) => {
  const [in1, setIn1] = useState(0);
  const [in2, setIn2] = useState(0);
  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        <rect
          x="0"
          y="0"
          width="100"
          height="50"
          fill="lightblue"
          stroke="black"
        />
        <line x1="-20" y1="10" x2="0" y2="10" stroke="black" strokeWidth="2" />
        <text
          x="-25"
          y="12"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => setIn1(in1 === 0 ? 1 : 0)}
        >
          {in1}
        </text>
        <line x1="-20" y1="40" x2="0" y2="40" stroke="black" strokeWidth="2" />
        <text
          x="-25"
          y="42"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => setIn2(in2 === 0 ? 1 : 0)}
        >
          {in2}
        </text>
        <line
          x1="100"
          y1="25"
          x2="120"
          y2="25"
          stroke="black"
          strokeWidth="2"
        />
        <text
          x="125"
          y="27"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
        >
          {type === "and" ? in1 & in2 : in1 | in2}
        </text>
        <text
          x="50"
          y="25"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
        >
          {type === "and" ? "与" : "或"}
        </text>
      </g>
      <rect
        x={x}
        y={y}
        width="100"
        height="50"
        fill="transparent"
        onMouseDown={onMouseDown}
        style={{ cursor: "move" }}
      />
    </>
  );
};