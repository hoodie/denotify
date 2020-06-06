use serde::{Deserialize, Serialize};

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
    pub body: Option<String>,

    /// Use a file:// URI or a name in an icon theme, must be compliant freedesktop.org.
    pub icon: Option<String>,

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

impl Notification {
    pub fn show(&self) {
        let notification: notify_rust::Notification = self.into();
        notification.show().unwrap();
    }
}

impl Into<notify_rust::Notification> for &Notification {
    fn into(self) -> notify_rust::Notification {
        let mut notification = notify_rust::Notification::new();

        if let Some(app_name) = &self.appname {
            notification.appname(&app_name);
        }

        if let Some(summary) = &self.summary {
            notification.summary(&summary);
        }

        if let Some(icon) = &self.icon {
            notification.icon(&icon);
        }

        notification.finalize()
    }
}