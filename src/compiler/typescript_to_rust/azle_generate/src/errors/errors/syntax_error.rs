use crate::{
    errors::{CompilerOutput, Location},
    Error,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SyntaxError {
    message: String,
    location: Location,
}

impl SyntaxError {
    pub fn new(message: String, location: Location) -> Self {
        Self { message, location }
    }

    pub fn error(message: String, location: Location) -> Error {
        Error::SyntaxError(Self { message, location })
    }

    pub fn to_string(&self) -> String {
        CompilerOutput {
            title: format!("SyntaxError: {}", self.message),
            location: self.location.clone(),
            annotation: "".to_string(),
            suggestion: None,
        }
        .to_string()
    }
}

impl std::error::Error for SyntaxError {}

impl std::fmt::Display for SyntaxError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<SyntaxError> for Error {
    fn from(error: SyntaxError) -> Self {
        Self::SyntaxError(error)
    }
}
