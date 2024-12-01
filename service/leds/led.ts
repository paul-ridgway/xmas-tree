export interface RGB {
  r: number;
  g: number;
  b: number;
}

export class LED {
  private readonly rgb: RGB;

  static fromInt32 = (v: number): LED => {
    let r = (v & 0xff0000) >> 16;
    let g = (v & 0xff00) >> 8;
    let b = v & 0xff;
    return new LED(r / 255.0, g / 255.0, b / 255.0);
  };

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.rgb = { r, g, b };
  }

  public set = (rgb: RGB) => {
    this.rgb.r = rgb.r;
    this.rgb.g = rgb.g;
    this.rgb.b = rgb.b;
    this.clamp();
  };

  public add = (rgb: RGB) => {
    this.rgb.r += rgb.r;
    this.rgb.g += rgb.g;
    this.rgb.b += rgb.b;
    this.clamp();
  };

  public toInt32 = (): number => {
    return (
      (Math.round(this.rgb.r * 255) << 16) +
      (Math.round(this.rgb.g * 255) << 8) +
      Math.round(this.rgb.b * 255)
    );
  };

  public render = (): number => {
    return (
      (Math.round(this.rgb.b * 255) << 16) +
      (Math.round(this.rgb.g * 255) << 8) +
      Math.round(this.rgb.r * 255)
    );
  };

  private clamp = () => {
    this.rgb.r = Math.max(Math.min(this.rgb.r, 1), 0);
    this.rgb.g = Math.max(Math.min(this.rgb.g, 1), 0);
    this.rgb.b = Math.max(Math.min(this.rgb.b, 1), 0);
  };
}
