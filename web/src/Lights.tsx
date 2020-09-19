import React, { createRef } from 'react';
import './App.css';

export interface LightsState {
  values: number[];
}

export class Lights extends React.Component<{}, LightsState> {

  private canvasRef = createRef<HTMLCanvasElement>();
  private updateTimeout?: NodeJS.Timer;

  constructor(context?: any) {
    super(context);
    this.state = { values: [] };
  }

  componentDidMount = () => {
    this.updateTimeout = setTimeout(() => this.update(), 40);
  }

  componentWillUnmount() {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }

  update() {
    fetch("/api/leds/values", { method: "POST" })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ values: Object.values(res) });
        this.updateTimeout = setTimeout(() => this.update(), 40);
      }).catch((err) => {
        console.warn(`Error: ${err}`);
        this.updateTimeout = setTimeout(() => this.update(), 250);
      })
  }

  pad(str: string, len: number, padChar: string) {
    while (str.length < len) {
      str = padChar + str;
    }
    return str;
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current!;
    const ctx = canvas.getContext("2d");
    let x = 0;
    let y = 0;
    if (ctx) {
      for (const val of this.state.values.reverse()) {

        ctx.fillStyle = "#" + this.pad(val.toString(16), 6, "0");;
        ctx.fillRect(x, y, 10, 10);
        x += 12;
        if (x + 12 >= (28 * 12)) {
          y += 12;
          x = 0;
        }
      }
    }

  }

  render = () => (
    <canvas style={{ background: "#000000" }} ref={this.canvasRef} width={640} height={480} />
  );
}
