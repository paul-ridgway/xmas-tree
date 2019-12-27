import * as colors from "colors";
import * as winston from "winston";

const addMeta = (info: any): string => {
  const meta = [];
  if (info.meta !== undefined) {
    meta.push(colors.cyan(`                     META: ${JSON.stringify(info.meta)}`));
  }
  if (info.stack !== undefined) {
    meta.push(colors.red.bold(`STACK TRACE:\n${info.stack}`));
  }
  if (meta.length === 0) {
    return "";
  }
  return `\n${meta.join("\n")}`;
};

export const createLogger = (name: string): winston.Logger => {

  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      // winston.format.simple(),
      winston.format.printf(
        (msg) => `${msg.timestamp}, ${msg.level.toUpperCase()} (${name!}): ${msg.message}${addMeta(msg)}`,
      ),
      winston.format.colorize(),
    ),
    transports: [new winston.transports.Console()],
  });
};
