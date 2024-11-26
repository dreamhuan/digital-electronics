import { useState } from "react";

const not = (num: number) => (num === 0 ? 1 : 0);
export const NotGate = ({
  x,
  y,
  onMouseDown,
}: {
  x: number;
  y: number;
  onMouseDown: (e: React.MouseEvent) => void;
}) => {
  const [in1, setIn1] = useState(0);
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
        <line x1="-20" y1="25" x2="0" y2="25" stroke="black" strokeWidth="2" />
        <text
          x="-25"
          y="27"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => setIn1(in1 === 0 ? 1 : 0)}
        >
          {in1}
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
          {not(in1)}
        </text>
        <text
          x="50"
          y="25"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
        >
          非
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
