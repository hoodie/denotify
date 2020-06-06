import { Result } from "./error.ts";

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

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

type Option<T> = T | undefined;

export interface NotificationPayload {
  appname: string;
  summary: string;
  subtitle: string;
  body: string;
  icon: string;
  actions: Array<string>;
  soundName: string;
}

export function show(
  notification: Readonly<Partial<NotificationPayload>>,
): Result {
  // @ts-ignore
  const { show } = Deno.core.ops();
  const payload = JSON.stringify(notification);
  console.debug(notification);
  //@ts-ignore
  const response = Deno.core.dispatch(
    show,
    textEncoder.encode(payload),
  );
  // const { result } =
  return new Result(JSON.parse(textDecoder.decode(response)));
  //return result;
}
