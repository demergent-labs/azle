#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FileSyntaxError {}

impl FileSyntaxError {
    pub fn from_file_name(file_name: &str) -> Self {
        Self {}
        // Err(error) => panic!("{}: Syntax Error: {}", ts_file_name, error.kind().msg()), TODO I don't know how to reconcile this with the above Syntax error
    }
}

impl From<FileSyntaxError> for crate::Error {
    fn from(error: FileSyntaxError) -> Self {
        Self::FileSyntaxError(error)
    }
}
