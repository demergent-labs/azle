use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Plugin {
    pub path: String,
    pub register_function: String,
}
