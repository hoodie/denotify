import { Result } from "./error.ts";
import { NotificationPayload, show } from "./plugin.ts";

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
  show(): Result {
    return show(this.payload);
  }
}
