import { Notification } from "../mod.ts";

Notification.new()
  .summary("test 🤔🤞")
  .appname("simple example")
  .icon("firefox")
  .show();
