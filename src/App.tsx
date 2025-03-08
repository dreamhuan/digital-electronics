import { useEffect, useRef } from "react";
import { LGraph, LGraphCanvas, LiteGraph } from "litegraph.js";
import "litegraph.js/css/litegraph.css";

const needNodeTypeList = [
  "basic/boolean",
  "basic/watch",
  "logic/AND",
  "logic/OR",
  "logic/NOT",
];
export default function App() {
  const containerRef = useRef<HTMLCanvasElement | null>(null);
  const graphRef = useRef<LGraph | null>(null);
  const canvasRef = useRef<LGraphCanvas | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    if (graphRef.current && canvasRef.current) {
      return;
    }
    const graph = new LGraph();
    graphRef.current = graph;
    const canvas = new LGraphCanvas(containerRef.current, graph);
    canvasRef.current = canvas;

    console.log(LiteGraph.registered_node_types); // 打印所有已注册类型
    const allNoteTypeList = Object.keys(LiteGraph.registered_node_types);
    allNoteTypeList.forEach((type) => {
      if (!needNodeTypeList.includes(type)) {
        LiteGraph.unregisterNodeType(type);
      }
    });
    LiteGraph.searchbox_extras = {};

    const b1Node = LiteGraph.createNode("basic/boolean");
    b1Node.pos = [100, 100];
    graph.add(b1Node);
    const b2Node = LiteGraph.createNode("basic/boolean");
    b2Node.pos = [100, 300];
    graph.add(b2Node);

    const not1Node = LiteGraph.createNode("logic/NOT");
    not1Node.pos = [300, 100];
    graph.add(not1Node);
    const not2Node = LiteGraph.createNode("logic/NOT");
    not2Node.pos = [300, 300];
    graph.add(not2Node);

    const and1Node = LiteGraph.createNode("logic/AND");
    and1Node.pos = [500, 100];
    graph.add(and1Node);
    const and2Node = LiteGraph.createNode("logic/AND");
    and2Node.pos = [500, 300];
    graph.add(and2Node);

    const orNode = LiteGraph.createNode("logic/OR");
    orNode.pos = [700, 200];
    graph.add(orNode);

    const watchNode = LiteGraph.createNode("basic/watch");
    watchNode.pos = [900, 200];
    graph.add(watchNode);

    b1Node.connect(0, not1Node, 0);
    b1Node.connect(0, and2Node, 0);

    b2Node.connect(0, not2Node, 0);
    b2Node.connect(0, and1Node, 1);

    not1Node.connect(0, and1Node, 0);
    not2Node.connect(0, and2Node, 1);

    and1Node.connect(0, orNode, 0);
    and2Node.connect(0, orNode, 1);

    orNode.connect(0, watchNode, 0);
    graph.start();
  }, []);

  const download = () => {
    const data = JSON.stringify(graphRef.current?.serialize());
    const file = new Blob([data]);
    const url = URL.createObjectURL(file);
    const element = document.createElement("a");
    element.setAttribute("href", url);
    element.setAttribute("download", "graph.JSON");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000 * 60); //wait one minute to revoke url
  };

  const save = () => {
    console.log("saved");
    localStorage.setItem(
      "litegraph_digital_electronics_save",
      JSON.stringify(graphRef.current?.serialize())
    );
  };

  const load = () => {
    const data = localStorage.getItem("litegraph_digital_electronics_save");
    if (data) {
      graphRef.current?.configure(JSON.parse(data));
    }
    console.log("loaded");
  };

  const drop = function (e: React.DragEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target?.result;
      if (fileContent) {
        graphRef.current?.configure(JSON.parse(fileContent as string));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <button onClick={save}>Save</button>
        <button onClick={load}>Load</button>
        <button onClick={download}>Download</button>
      </div>
      <canvas ref={containerRef} width={1000} height={800} onDrop={drop} />
    </div>
  );
}
