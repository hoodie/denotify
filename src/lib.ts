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
    return Deno.core.dispatch(
      show,
      textEncoder.encode(payload),
    )!;
  }
}
