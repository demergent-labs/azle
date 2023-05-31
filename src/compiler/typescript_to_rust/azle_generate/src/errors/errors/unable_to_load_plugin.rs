use std::{io::Error, path::PathBuf};

#[derive(Debug, Clone, PartialEq)]
pub struct UnableToLoadPlugin {
    plugin_file_name: String,
    error: String,
}

impl UnableToLoadPlugin {
    pub fn from_error(error: Error, plugin_file_buf: &PathBuf) -> Self {
        Self {
            plugin_file_name: plugin_file_buf.to_string_lossy().to_string(),
            error: error.to_string(),
        }
    }
}

impl std::error::Error for UnableToLoadPlugin {}

impl From<UnableToLoadPlugin> for crate::Error {
    fn from(error: UnableToLoadPlugin) -> Self {
        Self::UnableToLoadPlugin(error)
    }
}

impl std::fmt::Display for UnableToLoadPlugin {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Error: Unable to load plugin file {}\n{}",
            self.plugin_file_name, self.error
        )
    }
}
