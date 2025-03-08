import { useEffect, useState } from "react";
import { ITEM_WIDTH, ITEM_HEIGHT, LINE_LENGTH, NUM_LENGTH } from "./constants";

const ITEM_HEIGHT_STEP = ITEM_HEIGHT / 4;
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
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
          fill="lightblue"
          stroke="black"
        />
        <line
          x1={-LINE_LENGTH}
          y1={ITEM_HEIGHT_STEP}
          x2="0"
          y2={ITEM_HEIGHT_STEP}
          stroke="black"
          strokeWidth="2"
        />
        <text
          x={-(LINE_LENGTH + NUM_LENGTH)}
          y={ITEM_HEIGHT_STEP + 2}
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
          x1={-LINE_LENGTH}
          y1={ITEM_HEIGHT_STEP * 3}
          x2="0"
          y2={ITEM_HEIGHT_STEP * 3}
          stroke="black"
          strokeWidth="2"
        />
        <text
          x={-(LINE_LENGTH + NUM_LENGTH)}
          y={ITEM_HEIGHT_STEP * 3 + 2}
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
          x1={ITEM_WIDTH}
          y1={ITEM_HEIGHT / 2}
          x2={ITEM_WIDTH + LINE_LENGTH}
          y2={ITEM_HEIGHT / 2}
          stroke="black"
          strokeWidth="2"
        />
        <text
          x={ITEM_WIDTH + LINE_LENGTH + NUM_LENGTH}
          y={ITEM_HEIGHT / 2 + 2}
          fontSize="16"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
        >
          {out}
        </text>
        <text
          x={ITEM_WIDTH / 2}
          y={ITEM_HEIGHT / 2}
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
        width={ITEM_WIDTH}
        height={ITEM_HEIGHT}
        fill="transparent"
        onMouseDown={onMouseDown}
        style={{ cursor: "move" }}
      />
    </>
  );
};
