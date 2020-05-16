use deno_core::plugin_api::{Buf, Interface, Op, ZeroCopyBuf};

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface){
    interface.register_op("send", send);
}

pub fn send(_interface: &mut dyn Interface, data: &[u8], _zero_copy: Option<ZeroCopyBuf>) -> Op {
    let content = String::from_utf8_lossy(data);
    println!("-- send --\n{:#?}", content);
    let result = b"test";
    let result_box: Buf = Box::new(*result);
    Op::Sync(result_box)
}