use std::path::PathBuf;
use syn::Error;

#[derive(Debug, Clone, PartialEq)]
pub struct UnableToParsePlugin {
    plugin_file_name: String,
    error: String,
}

impl UnableToParsePlugin {
    pub fn from_error(error: Error, plugin_file_buf: &PathBuf) -> Self {
        Self {
            plugin_file_name: plugin_file_buf.to_string_lossy().to_string(),
            error: error.to_string(),
        }
    }
}

impl std::error::Error for UnableToParsePlugin {}

impl From<UnableToParsePlugin> for crate::Error {
    fn from(error: UnableToParsePlugin) -> Self {
        Self::UnableToParsePlugin(error)
    }
}

impl std::fmt::Display for UnableToParsePlugin {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Error: Unable to parse plugin file {}\n{}",
            self.plugin_file_name, self.error
        )
    }
}
