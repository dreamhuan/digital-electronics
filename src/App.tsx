import { useState } from "react";
import "./App.css";
import { AndOrGate } from "./AndOrGate";
import { NotGate } from "./NotGate";
import Link from "./Link";
import { In } from "./In";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 800;

function App() {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({
    not1: { x: 150, y: 50 },
    and1: { x: 350, y: 50 },
    not2: { x: 150, y: 250 },
    and2: { x: 350, y: 250 },
    or1: { x: 550, y: 150 },
    a: { x: 50, y: 75 },
    b: { x: 50, y: 275 },
  }); // 初始位置
  const [linkValues, setLinkValues] = useState<Record<string, number>>({
    // 连接线的值
    a_not1: 0,
    a_and2: 0,
    b_not2: 0,
    b_and1: 0,
    not1_and1: 0,
    not2_and2: 0,
    and1_or1: 0,
    and2_or1: 0,
  });
  const [draggingId, setDraggingId] = useState(""); // 是否正在拖拽
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 鼠标偏移量

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    setDraggingId(id);
    // 计算鼠标点击点与矩形左上角的偏移
    setOffset({
      x: e.clientX - positions[id].x,
      y: e.clientY - positions[id].y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // 限制矩形在画布范围内
      setPositions((pre) => ({
        ...pre,
        [draggingId]: {
          x: Math.max(0, Math.min(newX, BOARD_WIDTH - 100)), // 500 是 SVG 宽度，100 是矩形宽度
          y: Math.max(0, Math.min(newY, BOARD_HEIGHT - 50)), // 400 是 SVG 高度，50 是矩形高度
        },
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggingId(""); // 停止拖拽
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        id="designer_grids"
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        onMouseMove={handleMouseMove} // 监听鼠标移动
        onMouseUp={handleMouseUp} // 鼠标释放时停止拖拽
        onMouseLeave={handleMouseUp} // 鼠标移出画布时停止拖拽
        style={{
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
          display: "block",
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid black",
          userSelect: "none",
        }}
      >
        <defs>
          <pattern
            id="grid_item"
            width="61"
            height="61"
            patternUnits="userSpaceOnUse"
          >
            <path
              strokeWidth="1"
              fill="none"
              d="M0 15L60 15M15 0L15 60M0 30L60 30M30 0L30 60M0 45L60 45M45 0L45 60"
              stroke="rgb(242,242,242)"
            ></path>
            <path
              strokeWidth="1"
              fill="none"
              d="M0 60L60 60M60 0L60 60"
              stroke="rgb(229,229,229)"
            ></path>
          </pattern>
        </defs>
        <rect
          id="board"
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          fill="url(#grid_item)"
        ></rect>

        <In
          tag="A"
          posX={positions["a"].x}
          posY={positions["a"].y}
          onMouseDown={(e) => handleMouseDown(e, "a")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              a_not1: o,
              a_and2: o,
            }))
          }
        />
        <In
          tag="B"
          posX={positions["b"].x}
          posY={positions["b"].y}
          onMouseDown={(e) => handleMouseDown(e, "b")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              b_not2: o,
              b_and1: o,
            }))
          }
        />

        <NotGate
          inX1={linkValues.a_not1}
          posX={positions["not1"].x}
          posY={positions["not1"].y}
          onMouseDown={(e) => handleMouseDown(e, "not1")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              not1_and1: o,
            }))
          }
        />

        <NotGate
          inX1={linkValues.b_not2}
          posX={positions["not2"].x}
          posY={positions["not2"].y}
          onMouseDown={(e) => handleMouseDown(e, "not2")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              not2_and2: o,
            }))
          }
        />
        <AndOrGate
          inX1={linkValues.b_and1}
          inX2={linkValues.not1_and1}
          posX={positions["and1"].x}
          posY={positions["and1"].y}
          type="and"
          onMouseDown={(e) => handleMouseDown(e, "and1")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              and1_or1: o,
            }))
          }
        />
        <AndOrGate
          inX1={linkValues.a_and2}
          inX2={linkValues.not2_and2}
          posX={positions["and2"].x}
          posY={positions["and2"].y}
          type="and"
          onMouseDown={(e) => handleMouseDown(e, "and2")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              and2_or1: o,
            }))
          }
        />
        <AndOrGate
          inX1={linkValues.and1_or1}
          inX2={linkValues.and2_or1}
          posX={positions["or1"].x}
          posY={positions["or1"].y}
          type="or"
          onMouseDown={(e) => handleMouseDown(e, "or1")}
        />
        <Link
          posInX={positions["a"].x + 25}
          posInY={positions["a"].y}
          posOutX={positions["not1"].x - 35}
          posOutY={positions["not1"].y + 25}
        />
        <Link
          posInX={positions["a"].x + 25}
          posInY={positions["a"].y}
          posOutX={positions["and2"].x - 35}
          posOutY={positions["and2"].y + 5}
        />
        <Link
          posInX={positions["b"].x + 25}
          posInY={positions["b"].y}
          posOutX={positions["not2"].x - 35}
          posOutY={positions["not2"].y + 25}
        />
        <Link
          posInX={positions["b"].x + 25}
          posInY={positions["b"].y}
          posOutX={positions["and1"].x - 35}
          posOutY={positions["and1"].y + 10}
        />
        <Link
          posInX={positions["not1"].x + 132}
          posInY={positions["not1"].y + 25}
          posOutX={positions["and1"].x - 32}
          posOutY={positions["and1"].y + 40}
        />
        <Link
          posInX={positions["not2"].x + 132}
          posInY={positions["not2"].y + 25}
          posOutX={positions["and2"].x - 32}
          posOutY={positions["and2"].y + 40}
        />
        <Link
          posInX={positions["and1"].x + 132}
          posInY={positions["and1"].y + 25}
          posOutX={positions["or1"].x - 32}
          posOutY={positions["or1"].y + 5}
        />
        <Link
          posInX={positions["and2"].x + 132}
          posInY={positions["and2"].y + 25}
          posOutX={positions["or1"].x - 32}
          posOutY={positions["or1"].y + 45}
        />
      </svg>
    </div>
  );
}

export default App;
