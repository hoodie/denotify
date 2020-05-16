use serde::{Serialize, Deserialize};
use deno_core::plugin_api::{Buf, Interface, Op, ZeroCopyBuf};

#[cfg(all(unix, not(target_os = "macos")))]
use std::collections::HashSet;


#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface){
    interface.register_op("show", show);
} 

#[derive(Debug, Serialize, Deserialize)]
pub struct Notification {
    /// Filled by default with executable name.
    pub appname: Option<String>,

    /// Single line to summarize the content.
    pub summary: Option<String>,

    /// Subtitle for macOS
    pub subtitle: Option<String>,

    /// Multiple lines possible, may support simple markup,
    /// check out `get_capabilities()` -> `body-markup` and `body-hyperlinks`.
    pub body:    Option<String>,

    /// Use a file:// URI or a name in an icon theme, must be compliant freedesktop.org.
    pub icon:    Option<String>,

    // /// Check out `Hint`
    // #[cfg(all(unix, not(target_os = "macos")))]
    // pub hints:   HashSet<Hint>, // linux
    /// See `Notification::actions()` and `Notification::action()`
    pub actions: Option<Vec<String>>,
    pub sound_name: Option<String>, // macos&windows
    pub path_to_image: Option<String>, // windows
    // /// Lifetime of the Notification in ms. Often not respected by server, sorry.
    // pub timeout: Timeout, // both gnome and galago want allow for -1
}

pub fn show(_interface: &mut dyn Interface, data: &[u8], _zero_copy: Option<ZeroCopyBuf>) -> Op {
    let content = String::from_utf8_lossy(data);
    println!("-- send --\n{:#?}", content);

    match serde_json::from_slice::<'_, Notification>(data) {
     Ok(notification) => println!("-- notification--\n{:#?}", notification),
     Err(e) => eprintln!("{}", e),

    }
    let result = b"test";
    let result_box: Buf = Box::new(*result);
    Op::Sync(result_box)
}