use deno_core::plugin_api::{Buf, Interface, Op, ZeroCopyBuf};

mod error;
mod notification;

use crate::notification::Notification;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
    interface.register_op("show", op_show);
}

pub fn op_show(_interface: &mut dyn Interface, data: &[u8], _zero_copy: &mut [ZeroCopyBuf]) -> Op {
    match serde_json::from_slice::<'_, Notification>(data) {
        Ok(notification) => {
            let result = serde_json::to_string(&notification.show()).unwrap();
            let result_box: Buf = Buf::from(result.as_bytes());
            Op::Sync(result_box)
        }
        Err(e) => {
            eprintln!("{}", e);
            let result_box: Buf = Buf::from(format!("{}", e).as_bytes());
            Op::Sync(result_box)
        }
    }
}
