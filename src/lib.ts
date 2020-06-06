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
const { show } = Deno.core.ops();

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

type Option<T> = T | undefined;

interface NotificationPayload {
  appname: string;
  summary: string;
  subtitle: string;
  body: string;
  icon: string;
  actions: Array<string>;
  soundName: string;
}

export class Notification {
  private payload: Partial<NotificationPayload> = {};

  static new() {
    return new Notification();
  }

  constructor() {
  }

  summary(summary: string): Notification {
    this.payload.summary = summary;
    return this;
  }

  appname(appname: string): Notification {
    this.payload.appname = appname;
    return this;
  }

  subtitle(subtitle: string): Notification {
    this.payload.subtitle = subtitle;
    return this;
  }

  body(body: string): Notification {
    this.payload.body = body;
    return this;
  }

  icon(icon: string): Notification {
    this.payload.icon = icon;
    return this;
  }

  soundName(soundName: string): Notification {
    this.payload.soundName = soundName;
    return this;
  }

  /** just for testing for now */
  show() {
    const payload = JSON.stringify(this.payload);
    console.debug(payload);
    //@ts-ignore
    const response = Deno.core.dispatch(
      show,
      textEncoder.encode(payload),
    );
    // const { result } =
    return new Result(JSON.parse(textDecoder.decode(response)));
    //return result;
  }
}

interface DenotifyError {
  msg: string;
}

type ResultRaw<T, E = DenotifyError> = {
  Ok?: T;
  Err?: E;
};
type ResultMatchers<T, E> = {
  [P in keyof Required<ResultRaw<T, E>>]: (
    x: NonNullable<ResultRaw<T, E>[P]>,
  ) => void;
};
class Result<T, E = DenotifyError> {
  constructor(private content: ResultRaw<T, E>) {
  }

  public raw(): ResultRaw<T, E> {
    return this.content;
  }

  public match(
    matchers: ResultMatchers<T, E>,
  ) {
    if (this.content.Err) {
      matchers.Err(this.content.Err!);
    } else if (this.content.Ok) {
      matchers.Ok(this.content.Ok!);
    } else {
      throw new Error(
        "inconsistent content" + JSON.stringify(this.content, null, 4),
      );
    }
  }
}
