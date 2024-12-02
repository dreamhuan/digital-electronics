export default function Link({
  posInX,
  posInY,
  posOutX,
  posOutY,
}: {
  posInX: number;
  posInY: number;
  posOutX: number;
  posOutY: number;
}) {
  return (
    <line
      x1={posInX}
      y1={posInY}
      x2={posOutX}
      y2={posOutY}
      stroke="black"
      strokeWidth="2"
    />
  );
}
