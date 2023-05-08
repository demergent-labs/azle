use crate::{
    errors::{CompilerOutput, Location},
    Error,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArgumentError {
    message: String,
    location: Location,
}

impl ArgumentError {
    pub fn new(message: String, location: Location) -> Self {
        Self { message, location }
    }

    pub fn error(message: String, location: Location) -> Error {
        Error::ArgumentError(Self { message, location })
    }

    pub fn to_string(&self) -> String {
        CompilerOutput {
            title: format!("ArgumentError: {}", self.message),
            location: self.location.clone(),
            annotation: "".to_string(),
            suggestion: None,
        }
        .to_string()
    }
}

impl std::error::Error for ArgumentError {}

impl std::fmt::Display for ArgumentError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<ArgumentError> for Error {
    fn from(error: ArgumentError) -> Self {
        Self::ArgumentError(error)
    }
}
