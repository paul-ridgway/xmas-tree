import { createLogger } from "../../../shared/utils/logger";
import { isPi } from "../../../shared/utils/detect-rpi";

const logger = createLogger("IOProvider");

export interface IIO {
  render(pixels: Uint32Array): void;
}

let io: IIO;

export const getIO = (leds: number, gpio: number): IIO => {
  logger.info("get");
  if (!io) {
    if (isPi()) {
      const IO = require("./pi-io").PiIO;
      logger.info("Returning new PI IO");
      io = new IO(leds, gpio);
    } else {
      logger.info("Returning new Mock IO");
      const IO = require("./mock-io").MockIO;
      io = new IO();
    }
  }
  return io;
};
