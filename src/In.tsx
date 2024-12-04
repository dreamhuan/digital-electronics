import { useEffect, useState } from "react";

export const In = ({
  inX1,
  posX,
  posY,
  tag,
  onMouseDown,
  setOutValue,
}: {
  inX1?: number;
  posX: number;
  posY: number;
  tag?: string;
  onMouseDown: (e: React.MouseEvent) => void;
  setOutValue?: (out: number) => void;
}) => {
  const [in1, setIn1] = useState(0);
  const [, setOut] = useState(0);

  useEffect(() => {
    if (inX1 !== undefined) {
      setIn1(inX1);
    }
  }, [inX1]);

  useEffect(() => {
    const o = in1;
    setOut(o);
    setOutValue?.(o);
  }, [in1]);

  return (
    <>
      <g transform={`translate(${posX}, ${posY})`}>
        <text
          x="0"
          y="0"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => setIn1(in1 === 0 ? 1 : 0)}
        >
          {tag}:
        </text>
        <text
          x="15"
          y="0"
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => setIn1(in1 === 0 ? 1 : 0)}
        >
          {in1}
        </text>
      </g>
      <rect
        x={posX - 10}
        y={posY - 10}
        width="20"
        height="20"
        fill="transparent"
        onMouseDown={onMouseDown}
        style={{ cursor: "move" }}
      />
    </>
  );
};
