export default function Link({
  posInX,
  posInY,
  posOutX,
  posOutY,
  sType,
  eType,
  eNum,
}: {
  posInX: number;
  posInY: number;
  posOutX: number;
  posOutY: number;
  sType: "In" | "1" | "2"; // TODO 为2的逻辑暂时没有写
  eType: "1" | "2";
  sNum?: "1" | "2"; // TODO 逻辑暂时没有写
  eNum?: "1" | "2";
}) {
  return (
    <line
      x1={posInX + (sType === "In" ? 25 : 135)}
      y1={posInY + (sType === "In" ? 0 : 25)}
      x2={posOutX - 35}
      y2={posOutY + (eType === "1" ? 25 : eNum === "1" ? 12 : 36)}
      stroke="black"
      strokeWidth="2"
    />
  );
}
