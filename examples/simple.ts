import { Notification } from "../mod.ts";

const notification = Notification.new()
  .summary("test 🤔🤞")
  .appname("simple example")
  .icon("firefox")
  .show();
