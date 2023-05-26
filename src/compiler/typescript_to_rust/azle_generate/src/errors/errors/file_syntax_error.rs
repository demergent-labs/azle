use swc_ecma_parser::error::Error;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FileSyntaxError {
    ts_file_name: String,
    error: String,
}

impl FileSyntaxError {
    pub fn from_file_name(file_name: &str, error: Error) -> Self {
        Self {
            ts_file_name: file_name.to_string(),
            error: error.kind().msg().to_string(),
        }
    }
}

impl std::error::Error for FileSyntaxError {}

impl From<FileSyntaxError> for crate::Error {
    fn from(error: FileSyntaxError) -> Self {
        Self::FileSyntaxError(error)
    }
}

impl std::fmt::Display for FileSyntaxError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}: Syntax Error: {}", self.ts_file_name, self.error)
    }
}
