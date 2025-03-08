import { useState } from "react";
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
    not1: { x: 200, y: 50 },
    and1: { x: 500, y: 50 },
    not2: { x: 200, y: 250 },
    and2: { x: 500, y: 250 },
    or1: { x: 800, y: 150 },
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
  const gateConfArr = [
    {
      id: "a",
      comp: In,
      props: {
        tag: "A",
      },
    },
    {
      id: "b",
      comp: In,
      props: {
        tag: "B",
      },
    },
    {
      id: "not1",
      comp: NotGate,
      props: {},
    },
    {
      id: "not2",
      comp: NotGate,
      props: {},
    },
    {
      id: "and1",
      comp: AndOrGate,
      props: {
        type: "and",
      },
    },
    {
      id: "and2",
      comp: AndOrGate,
      props: {
        type: "and",
      },
    },
    {
      id: "or1",
      comp: AndOrGate,
      props: {
        type: "or",
      },
    },
  ] as const;
  const linkConfArr = [
    "a_not1_In_1_0_1",
    "a_and2_In_2_0_1",
    "b_not2_In_1_0_1",
    "b_and1_In_2_0_2",
    "not1_and1_1_2_0_1",
    "not2_and2_1_2_0_2",
    "and1_or1_1_2_0_1",
    "and2_or1_1_2_0_2",
  ];
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

        {gateConfArr.map((conf) => {
          const inValues = linkConfArr
            .map((linkConf) => linkConf.split("_"))
            .filter((confItems) => confItems[1] === conf.id)
            .reduce((acc, cur) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [a, b, c, d, e, f] = cur;
              acc[`inX${f}`] = linkValues[`${a}_${b}`];
              return acc;
            }, {} as Record<string, number>);

          const Comp = conf.comp;
          return (
            <Comp
              key={conf.id}
              posX={positions[conf.id].x}
              posY={positions[conf.id].y}
              {...conf.props}
              {...inValues}
              onMouseDown={(e) => handleMouseDown(e, conf.id)}
              setOutValue={(o: number) => {
                const values = linkConfArr
                  .map((linkConf) => linkConf.split("_"))
                  .filter((confItems) => confItems[0] === conf.id)
                  .map(([a, b]) => `${a}_${b}`)
                  .reduce((acc, cur) => {
                    acc[cur] = o;
                    return acc;
                  }, {} as Record<string, number>);
                setLinkValues((pre) => ({
                  ...pre,
                  ...values,
                }));
              }}
            />
          );
        })}
        {linkConfArr.map((linkConf) => {
          const [inName, outName, sType, eType, sNum, eNum] =
            linkConf.split("_");
          return (
            <Link
              key={linkConf}
              posInX={positions[inName].x}
              posInY={positions[inName].y}
              posOutX={positions[outName].x}
              posOutY={positions[outName].y}
              sType={sType}
              eType={eType}
              sNum={sNum}
              eNum={eNum}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default App;
