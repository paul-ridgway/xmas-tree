import * as os from "os";

export function isDoorbell(): boolean {
  return !!os.hostname().match("doorbell");
}
