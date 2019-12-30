import { IIO } from "./io-provider";

export class MockIO implements IIO {
  render(pixels: Uint32Array) {
    // logger.info(`render: ${inspect(pixels)}`);
  }
}
