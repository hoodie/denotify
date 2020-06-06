use deno_core::plugin_api::{Buf, Interface, Op, ZeroCopyBuf};

mod notification;

use crate::notification::Notification;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
    interface.register_op("show", show);
}

pub fn show(_interface: &mut dyn Interface, data: &[u8], _zero_copy: &mut [ZeroCopyBuf]) -> Op {
    match serde_json::from_slice::<'_, Notification>(data) {
        Ok(notification) => {
            notification.show();
        }
        Err(e) => eprintln!("{}", e),
    }

    let result = b"true";
    let result_box: Buf = Box::new(*result);
    Op::Sync(result_box)
}
