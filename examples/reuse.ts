import { Notification } from "../mod.ts";

    const notification = Notification.new()
        .summary("News update")
        .icon("computer")
        .body("Something bad happened")

    // notification.show().unwrap();

    // std::thread::sleep(std::time::Duration::from_millis(1500));

    // notification.body("just kidding, nothing happened");
    // notification.show().unwrap();