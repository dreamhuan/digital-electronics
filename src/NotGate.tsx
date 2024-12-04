import { useEffect, useState } from "react";
import { ITEM_WIDTH, ITEM_HEIGHT, LINE_LENGTH, NUM_LENGTH } from "./constants";

const ITEM_HEIGHT_STEP = ITEM_HEIGHT / 2;
const not = (num: number): number => (num === 0 ? 1 : 0);
export const NotGate = ({
  inX1,
  posX,
  posY,
  onMouseDown,
  setOutValue,
}: {
  inX1?: number;
  posX: number;
  posY: number;
  onMouseDown: (e: React.MouseEvent) => void;
  setOutValue?: (out: number) => void;
}) => {
  const [in1, setIn1] = useState(0);
  const [out, setOut] = useState(0);

  useEffect(() => {
    if (inX1 !== undefined) {
      setIn1(inX1);
    }
  }, [inX1]);

  useEffect(() => {
    const o = not(in1);
    setOut(o);
    setOutValue?.(o);
  }, [in1]);

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
          x1={ITEM_WIDTH}
          y1={ITEM_HEIGHT_STEP}
          x2={ITEM_WIDTH + LINE_LENGTH}
          y2={ITEM_HEIGHT_STEP}
          stroke="black"
          strokeWidth="2"
        />
        <text
          x={ITEM_WIDTH + LINE_LENGTH + NUM_LENGTH}
          y={ITEM_HEIGHT_STEP + 2}
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
          非
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
