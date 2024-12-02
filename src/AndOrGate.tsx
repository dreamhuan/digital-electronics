import { useEffect, useState } from "react";

export const AndOrGate = ({
  inX1,
  inX2,
  posX,
  posY,
  type = "and",
  onMouseDown,
  setOutValue,
}: {
  inX1?: number;
  inX2?: number;
  posX: number;
  posY: number;
  type?: "and" | "or";
  onMouseDown: (e: React.MouseEvent) => void;
  setOutValue?: (out: number) => void;
}) => {
  const [in1, setIn1] = useState(0);
  const [in2, setIn2] = useState(0);
  const [out, setOut] = useState(0);

  useEffect(() => {
    if (inX1 !== undefined) {
      setIn1(inX1);
    }
    if (inX2 !== undefined) {
      setIn2(inX2);
    }
  }, [inX1, inX2]);

  useEffect(() => {
    const o = type === "and" ? in1 & in2 : in1 | in2;
    setOut(o);
    setOutValue?.(o);
  }, [in1, in2]);

  return (
    <>
      <g transform={`translate(${posX}, ${posY})`}>
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
          {out}
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
        x={posX}
        y={posY}
        width="100"
        height="50"
        fill="transparent"
        onMouseDown={onMouseDown}
        style={{ cursor: "move" }}
      />
    </>
  );
};
