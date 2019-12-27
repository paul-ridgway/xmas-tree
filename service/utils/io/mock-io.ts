import { IIO } from "./io-provider";
import { createLogger } from "../../../shared/utils/logger";
import { inspect } from "util";

const logger = createLogger("MockIO");

export class MockIO implements IIO {
  render(pixels: Uint32Array) {
    // logger.info(`render: ${inspect(pixels)}`);
  }
}
