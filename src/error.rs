use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct DenotifyError {
    msg: String,
}

impl<E: std::error::Error> From<E> for DenotifyError {
    fn from(original: E) -> Self {
        DenotifyError {
            msg: format!("{}", original),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub enum SerialiableResult {
    Ok,
    Err(DenotifyError)
}