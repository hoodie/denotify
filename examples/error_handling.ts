import { Notification } from "../mod.ts";

const { Ok, Err } = Notification.new().summary("minimal notification").show().raw();

if (Ok) {
  console.info(Ok);
} else {
  console.error("something went wrong", {Err});
}

Notification.new().summary("minimal notification").show().match({
  Ok: (ok) => console.info(ok),
  Err: (e) => console.info(e),
})
