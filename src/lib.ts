const filenameBase = "denotify";

let filenameSuffix = ".so";
let filenamePrefix = "lib";

if (Deno.build.os === "windows") {
  filenameSuffix = ".dll";
  filenamePrefix = "";
}
if (Deno.build.os === "darwin") {
  filenameSuffix = ".dylib";
}

const filename =
  `./target/debug/${filenamePrefix}${filenameBase}${filenameSuffix}`;

Deno.openPlugin(filename);

//@ts-ignore
const { send } = Deno.core.ops();

const textEncoder = new TextEncoder();

export class Notification {
  static new() {
    return new Notification();
  }

  constructor() {
  }

  send(content: string) {
    //@ts-ignore
    return Deno.core.dispatch(
      send,
      textEncoder.encode(content),
    )!;
  }
}
