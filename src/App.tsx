import { useState } from "react";
import "./App.css";
import { AndOrGate } from "./AndOrGate";
import { NotGate } from "./NotGate";
import Link from "./Link";

const BOARD_WIDTH = 1000;
const BOARD_HEIGHT = 800;

function App() {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({
    and: { x: 50, y: 50 },
    or: { x: 250, y: 50 },
    not: { x: 450, y: 50 },
  }); // 初始位置
  const [linkValues, setLinkValues] = useState<Record<string, number>>({
    // 连接线的值
    and_or: 0,
    or_not: 0,
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

        <AndOrGate
          posX={positions["and"].x}
          posY={positions["and"].y}
          type="and"
          onMouseDown={(e) => handleMouseDown(e, "and")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              and_or: o,
            }))
          }
        />
        <AndOrGate
          inX1={linkValues.and_or}
          posX={positions["or"].x}
          posY={positions["or"].y}
          type="or"
          onMouseDown={(e) => handleMouseDown(e, "or")}
          setOutValue={(o: number) =>
            setLinkValues((pre) => ({
              ...pre,
              or_not: o,
            }))
          }
        />
        <NotGate
          inX1={linkValues.or_not}
          posX={positions["not"].x}
          posY={positions["not"].y}
          onMouseDown={(e) => handleMouseDown(e, "not")}
        />
        <Link
          posInX={positions["and"].x + 132}
          posInY={positions["and"].y + 25}
          posOutX={positions["or"].x - 32}
          posOutY={positions["or"].y + 10}
        />
        <Link
          posInX={positions["or"].x + 132}
          posInY={positions["or"].y + 25}
          posOutX={positions["not"].x - 32}
          posOutY={positions["not"].y + 25}
        />
      </svg>
    </div>
  );
}

export default App;
