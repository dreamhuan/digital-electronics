import { LGraphNode, LiteGraph } from "litegraph.js";
class XOR extends LGraphNode {
  constructor() {
    super("异或门");
    //add some input slots
    this.addInput("A", "boolean");
    this.addInput("B", "boolean");
    //add some output slots
    this.addOutput("XOR", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let A = this.getInputData(0);
    if (A === undefined) A = 0;
    let B = this.getInputData(1);
    if (B === undefined) B = 0;
    //assing data to outputs
    this.setOutputData(0, !!(A ^ B));
  }
}

class NOR extends LGraphNode {
  constructor() {
    super("或非门");
    //add some input slots
    this.addInput("A", "boolean");
    this.addInput("B", "boolean");
    //add some output slots
    this.addOutput("NOR", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let A = this.getInputData(0);
    if (A === undefined) A = 0;
    let B = this.getInputData(1);
    if (B === undefined) B = 0;
    //assing data to outputs
    this.setOutputData(0, !(A | B));
  }
}

class ADD extends LGraphNode {
  constructor() {
    super("全加器");
    //add some input slots
    this.addInput("A", "boolean");
    this.addInput("B", "boolean");
    this.addInput("C_in", "boolean");
    //add some output slots
    this.addOutput("Y", "boolean");
    this.addOutput("C_out", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let A = this.getInputData(0);
    if (A === undefined) A = 0;
    let B = this.getInputData(1);
    if (B === undefined) B = 0;
    let C_in = this.getInputData(2);
    if (C_in === undefined) C_in = 0;
    //assing data to outputs
    this.setOutputData(0, !!((A + B + C_in) % 2));
    this.setOutputData(1, !!((A + B + C_in) >> 1));
  }
}

class ALU extends LGraphNode {
  constructor() {
    super("8位加法器");
    //add some input slots
    this.addInput("A0", "boolean");
    this.addInput("A1", "boolean");
    this.addInput("A2", "boolean");
    this.addInput("A3", "boolean");
    this.addInput("A4", "boolean");
    this.addInput("A5", "boolean");
    this.addInput("A6", "boolean");
    this.addInput("A7", "boolean");
    this.addInput("B0", "boolean");
    this.addInput("B1", "boolean");
    this.addInput("B2", "boolean");
    this.addInput("B3", "boolean");
    this.addInput("B4", "boolean");
    this.addInput("B5", "boolean");
    this.addInput("B6", "boolean");
    this.addInput("B7", "boolean");
    this.addInput("LU", "boolean");
    //add some output slots
    this.addOutput("O0", "boolean");
    this.addOutput("O1", "boolean");
    this.addOutput("O2", "boolean");
    this.addOutput("O3", "boolean");
    this.addOutput("O4", "boolean");
    this.addOutput("O5", "boolean");
    this.addOutput("O6", "boolean");
    this.addOutput("O7", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let A0 = this.getInputData(0);
    if (A0 === undefined) A0 = 0;
    let A1 = this.getInputData(1);
    if (A1 === undefined) A1 = 0;
    let A2 = this.getInputData(2);
    if (A2 === undefined) A2 = 0;
    let A3 = this.getInputData(3);
    if (A3 === undefined) A3 = 0;
    let A4 = this.getInputData(4);
    if (A4 === undefined) A4 = 0;
    let A5 = this.getInputData(5);
    if (A5 === undefined) A5 = 0;
    let A6 = this.getInputData(6);
    if (A6 === undefined) A6 = 0;
    let A7 = this.getInputData(7);
    if (A7 === undefined) A7 = 0;
    let B0 = this.getInputData(8);
    if (B0 === undefined) B0 = 0;
    let B1 = this.getInputData(9);
    if (B1 === undefined) B1 = 0;
    let B2 = this.getInputData(10);
    if (B2 === undefined) B2 = 0;
    let B3 = this.getInputData(11);
    if (B3 === undefined) B3 = 0;
    let B4 = this.getInputData(12);
    if (B4 === undefined) B4 = 0;
    let B5 = this.getInputData(13);
    if (B5 === undefined) B5 = 0;
    let B6 = this.getInputData(14);
    if (B6 === undefined) B6 = 0;
    let B7 = this.getInputData(15);
    if (B7 === undefined) B7 = 0;
    let LU = this.getInputData(16);
    if (LU === undefined) LU = 0;
    let O0 = 0;
    let O1 = 0;
    let O2 = 0;
    let O3 = 0;
    let O4 = 0;
    let O5 = 0;
    let O6 = 0;
    let O7 = 0;
    if (LU) {
      const A =
        A7 * 2 ** 7 +
        A6 * 2 ** 6 +
        A5 * 2 ** 5 +
        A4 * 2 ** 4 +
        A3 * 2 ** 3 +
        A2 * 2 ** 2 +
        A1 * 2 ** 1 +
        A0;
      const B =
        B7 * 2 ** 7 +
        B6 * 2 ** 6 +
        B5 * 2 ** 5 +
        B4 * 2 ** 4 +
        B3 * 2 ** 3 +
        B2 * 2 ** 2 +
        B1 * 2 ** 1 +
        B0;
      const O = A + B;
      O0 = O % 2;
      O1 = (O >> 1) % 2;
      O2 = (O >> 2) % 2;
      O3 = (O >> 3) % 2;
      O4 = (O >> 4) % 2;
      O5 = (O >> 5) % 2;
      O6 = (O >> 6) % 2;
      O7 = (O >> 7) % 2;
    }

    //assing data to outputs
    this.setOutputData(0, !!O0);
    this.setOutputData(1, !!O1);
    this.setOutputData(2, !!O2);
    this.setOutputData(3, !!O3);
    this.setOutputData(4, !!O4);
    this.setOutputData(5, !!O5);
    this.setOutputData(6, !!O6);
    this.setOutputData(7, !!O7);
  }
}

class Latch extends LGraphNode {
  prevData = 0;
  constructor() {
    super("锁存器");
    //add some input slots
    this.addInput("EN", "boolean");
    this.addInput("DI", "boolean");
    //add some output slots
    this.addOutput("DO", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let EN = this.getInputData(0);
    if (EN === undefined) EN = 0;
    let DI = this.getInputData(1);
    if (DI === undefined) DI = 0;
    let DO = this.prevData;
    if (EN) {
      DO = DI;
      this.prevData = DI;
    }
    //assing data to outputs
    this.setOutputData(0, DO);
  }
}

class RWMemory extends LGraphNode {
  prevData = 0;
  constructor() {
    super("读写存储器");
    //add some input slots
    this.addInput("Addr", "boolean");
    this.addInput("ENI", "boolean");
    this.addInput("ENO", "boolean");
    this.addInput("DI", "boolean");
    //add some output slots
    this.addOutput("DO", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let Addr = this.getInputData(0);
    if (Addr === undefined) Addr = 0;
    let ENI = this.getInputData(1);
    if (ENI === undefined) ENI = 0;
    let ENO = this.getInputData(2);
    if (ENO === undefined) ENO = 0;
    let DI = this.getInputData(3);
    if (DI === undefined) DI = 0;
    let DO = this.prevData;
    if (Addr && ENI) {
      DO = DI;
      this.prevData = DI;
    }
    //assing data to outputs
    this.setOutputData(0, Addr && ENO ? DO : false);
  }
}

class Cache extends LGraphNode {
  memory = 0;
  constructor() {
    super("寄存器");
    //add some input slots
    this.addInput("I0", "boolean");
    this.addInput("I1", "boolean");
    this.addInput("I2", "boolean");
    this.addInput("I3", "boolean");
    this.addInput("I4", "boolean");
    this.addInput("I5", "boolean");
    this.addInput("I6", "boolean");
    this.addInput("I7", "boolean");
    this.addInput("AI", "boolean");
    this.addInput("AO", "boolean");
    //add some output slots
    this.addOutput("O0", "boolean");
    this.addOutput("O1", "boolean");
    this.addOutput("O2", "boolean");
    this.addOutput("O3", "boolean");
    this.addOutput("O4", "boolean");
    this.addOutput("O5", "boolean");
    this.addOutput("O6", "boolean");
    this.addOutput("O7", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let I0 = this.getInputData(0);
    if (I0 === undefined) I0 = 0;
    let I1 = this.getInputData(1);
    if (I1 === undefined) I1 = 0;
    let I2 = this.getInputData(2);
    if (I2 === undefined) I2 = 0;
    let I3 = this.getInputData(3);
    if (I3 === undefined) I3 = 0;
    let I4 = this.getInputData(4);
    if (I4 === undefined) I4 = 0;
    let I5 = this.getInputData(5);
    if (I5 === undefined) I5 = 0;
    let I6 = this.getInputData(6);
    if (I6 === undefined) I6 = 0;
    let I7 = this.getInputData(7);
    if (I7 === undefined) I7 = 0;

    let AI = this.getInputData(8);
    if (AI === undefined) AI = 0;
    let AO = this.getInputData(9);
    if (AO === undefined) AO = 0;

    let O0 = 0;
    let O1 = 0;
    let O2 = 0;
    let O3 = 0;
    let O4 = 0;
    let O5 = 0;
    let O6 = 0;
    let O7 = 0;

    if (AI) {
      const I =
        I7 * 2 ** 7 +
        I6 * 2 ** 6 +
        I5 * 2 ** 5 +
        I4 * 2 ** 4 +
        I3 * 2 ** 3 +
        I2 * 2 ** 2 +
        I1 * 2 ** 1 +
        I0;

      this.memory = I;
    }

    if (AO) {
      const O = this.memory;
      O0 = O % 2;
      O1 = (O >> 1) % 2;
      O2 = (O >> 2) % 2;
      O3 = (O >> 3) % 2;
      O4 = (O >> 4) % 2;
      O5 = (O >> 5) % 2;
      O6 = (O >> 6) % 2;
      O7 = (O >> 7) % 2;
    }

    //assing data to outputs
    this.setOutputData(0, !!O0);
    this.setOutputData(1, !!O1);
    this.setOutputData(2, !!O2);
    this.setOutputData(3, !!O3);
    this.setOutputData(4, !!O4);
    this.setOutputData(5, !!O5);
    this.setOutputData(6, !!O6);
    this.setOutputData(7, !!O7);
  }
}

class RAM extends LGraphNode {
  memArr = [0, 0, 0, 0, 0, 0, 0, 0];
  constructor() {
    super("随机访问存储器");
    //add some input slots
    this.addInput("I0", "boolean");
    this.addInput("I1", "boolean");
    this.addInput("I2", "boolean");
    this.addInput("I3", "boolean");
    this.addInput("I4", "boolean");
    this.addInput("I5", "boolean");
    this.addInput("I6", "boolean");
    this.addInput("I7", "boolean");
    this.addInput("S0", "boolean");
    this.addInput("S1", "boolean");
    this.addInput("S2", "boolean");
    this.addInput("RI", "boolean");
    this.addInput("RO", "boolean");
    //add some output slots
    this.addOutput("O0", "boolean");
    this.addOutput("O1", "boolean");
    this.addOutput("O2", "boolean");
    this.addOutput("O3", "boolean");
    this.addOutput("O4", "boolean");
    this.addOutput("O5", "boolean");
    this.addOutput("O6", "boolean");
    this.addOutput("O7", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let I0 = this.getInputData(0);
    if (I0 === undefined) I0 = 0;
    let I1 = this.getInputData(1);
    if (I1 === undefined) I1 = 0;
    let I2 = this.getInputData(2);
    if (I2 === undefined) I2 = 0;
    let I3 = this.getInputData(3);
    if (I3 === undefined) I3 = 0;
    let I4 = this.getInputData(4);
    if (I4 === undefined) I4 = 0;
    let I5 = this.getInputData(5);
    if (I5 === undefined) I5 = 0;
    let I6 = this.getInputData(6);
    if (I6 === undefined) I6 = 0;
    let I7 = this.getInputData(7);
    if (I7 === undefined) I7 = 0;

    let S0 = this.getInputData(8);
    if (S0 === undefined) S0 = 0;
    let S1 = this.getInputData(9);
    if (S1 === undefined) S1 = 0;
    let S2 = this.getInputData(10);
    if (S2 === undefined) S2 = 0;

    let RI = this.getInputData(11);
    if (RI === undefined) RI = 0;
    let RO = this.getInputData(12);
    if (RO === undefined) RO = 0;

    let O0 = 0;
    let O1 = 0;
    let O2 = 0;
    let O3 = 0;
    let O4 = 0;
    let O5 = 0;
    let O6 = 0;
    let O7 = 0;

    const Addr = S2 * 2 ** 2 + S1 * 2 ** 1 + S0;
    if (RI) {
      const I =
        I7 * 2 ** 7 +
        I6 * 2 ** 6 +
        I5 * 2 ** 5 +
        I4 * 2 ** 4 +
        I3 * 2 ** 3 +
        I2 * 2 ** 2 +
        I1 * 2 ** 1 +
        I0;

      this.memArr[Addr] = I;
    }

    if (RO) {
      const O = this.memArr[Addr];
      O0 = O % 2;
      O1 = (O >> 1) % 2;
      O2 = (O >> 2) % 2;
      O3 = (O >> 3) % 2;
      O4 = (O >> 4) % 2;
      O5 = (O >> 5) % 2;
      O6 = (O >> 6) % 2;
      O7 = (O >> 7) % 2;
    }

    //assing data to outputs
    this.setOutputData(0, !!O0);
    this.setOutputData(1, !!O1);
    this.setOutputData(2, !!O2);
    this.setOutputData(3, !!O3);
    this.setOutputData(4, !!O4);
    this.setOutputData(5, !!O5);
    this.setOutputData(6, !!O6);
    this.setOutputData(7, !!O7);
  }
}

class CLKTrigger extends LGraphNode {
  prevClk = 0;
  innerQ = 0;
  constructor() {
    super("边沿触发器");
    //add some input slots
    this.addInput("D", "boolean");
    this.addInput("clk", "boolean");
    //add some output slots
    this.addOutput("Q", "boolean");
    this.addOutput("Q非", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let D = this.getInputData(0);
    if (D === undefined) D = 0;
    let clk = this.getInputData(1);
    if (clk === undefined) clk = 0;
    if (!this.prevClk && clk) {
      this.innerQ = D;
    }
    const Q = this.innerQ;
    this.prevClk = clk;
    //assing data to outputs
    this.setOutputData(0, !!Q);
    this.setOutputData(1, !Q);
  }
}

class PulseSignal extends LGraphNode {
  time = Date.now();
  prevClk = false;
  constructor() {
    super("脉冲信号");
    //add some output slots
    this.addOutput("clk", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    let clk = this.prevClk;
    if (Date.now() - this.time > 1000) {
      this.time = Date.now();
      this.prevClk = !this.prevClk;
      clk = this.prevClk;
      // console.log("PulseSignal change to", clk);
    }
    //assing data to outputs
    this.setOutputData(0, !!clk);
  }
}

class Through extends LGraphNode {
  time = Date.now();
  prevClk = false;
  constructor() {
    super("数据直传");
    //add some input slots
    this.addInput("I", "boolean");
    //add some output slots
    this.addOutput("O", "boolean");
    //add some properties
    this.properties = { precision: 1 };
  }

  onExecute() {
    //retrieve data from inputs
    let I = this.getInputData(0);
    if (I === undefined) I = 0;

    // console.log("Through", I);
    //assing data to outputs
    this.setOutputData(0, !!I);
  }
}

class PC extends LGraphNode {
  prevClk = 0;
  innerQ = 0;

  constructor() {
    super("计数器");
    //add some input slots
    this.addInput("clk", "boolean");
    this.addInput("rst", "boolean");
    //add some output slots
    this.addOutput("Q0", "boolean");
    this.addOutput("Q1", "boolean");
    this.addOutput("Q2", "boolean");
    this.addOutput("Q3", "boolean");
    //add some properties
    this.properties = { precision: 1, count: 0 };
  }

  onDrawForeground(ctx: CanvasRenderingContext2D, graphcanvas) {
    if (this.flags.collapsed) return;
    ctx.save();
    ctx.font = "bold 30px 'Arial'";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.properties.count, 65, 55);
    ctx.restore();
  }

  onExecute() {
    //retrieve data from inputs
    let clk = this.getInputData(0);
    if (clk === undefined) clk = 0;
    let rst = this.getInputData(1);
    if (rst === undefined) rst = 0;

    if (!this.prevClk && clk) {
      this.innerQ = (this.innerQ + 1) % 16;
    }
    if (rst) {
      this.innerQ = 0;
    }
    const Q = this.innerQ;
    this.prevClk = clk;
    this.properties.count = Q;

    const Q0 = Q % 2;
    const Q1 = (Q >> 1) % 2;
    const Q2 = (Q >> 2) % 2;
    const Q3 = (Q >> 3) % 2;

    //assing data to outputs
    this.setOutputData(0, !!Q0);
    this.setOutputData(1, !!Q1);
    this.setOutputData(2, !!Q2);
    this.setOutputData(3, !!Q3);
  }
}

export default function initCustomNode() {
  LiteGraph.registerNodeType("custom/XOR", XOR);
  LiteGraph.registerNodeType("custom/NOR", NOR);
  LiteGraph.registerNodeType("custom/ADD", ADD);
  LiteGraph.registerNodeType("custom/ALU", ALU);
  LiteGraph.registerNodeType("custom/Latch", Latch);
  LiteGraph.registerNodeType("custom/RWMemory", RWMemory);
  LiteGraph.registerNodeType("custom/Cache", Cache);
  LiteGraph.registerNodeType("custom/RAM", RAM);
  LiteGraph.registerNodeType("custom/CLKTrigger", CLKTrigger);
  LiteGraph.registerNodeType("tools/PulseSignal", PulseSignal);
  LiteGraph.registerNodeType("tools/Through", Through);
  LiteGraph.registerNodeType("custom/PC", PC);
}
