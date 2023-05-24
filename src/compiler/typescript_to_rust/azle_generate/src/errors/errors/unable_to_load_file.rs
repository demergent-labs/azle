use std::io::Error;

// TODO explore getting rid of the need for clone here so we can have the actual error
#[derive(Debug, Clone, PartialEq)]
pub struct UnableToLoadFile {
    ts_file_name: String,
    error: String,
}

impl UnableToLoadFile {
    pub fn from_error(error: Error, ts_file_name: &str) -> Self {
        Self {
            ts_file_name: ts_file_name.to_string(),
            error: error.to_string(),
        }
    }
}

impl std::error::Error for UnableToLoadFile {}

impl From<UnableToLoadFile> for crate::Error {
    fn from(error: UnableToLoadFile) -> Self {
        Self::UnableToLoadFile(error)
    }
}

impl std::fmt::Display for UnableToLoadFile {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Error: Unable to load file {}\n{}",
            self.ts_file_name, self.error
        )
    }
}
