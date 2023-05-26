use crate::{
    errors::{CompilerOutput, Location},
    Error,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TypeError {
    message: String,
    location: Location,
}

impl TypeError {
    pub fn new(message: String, location: Location) -> Self {
        TypeError { message, location }
    }

    pub fn error(message: String, location: Location) -> Error {
        Error::TypeError(Self { message, location })
    }

    pub fn to_string(&self) -> String {
        CompilerOutput {
            title: format!("TypeError: {}", self.message),
            location: self.location.clone(),
            annotation: "".to_string(),
            suggestion: None,
        }
        .to_string()
    }
}

impl std::error::Error for TypeError {}

impl std::fmt::Display for TypeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<TypeError> for Error {
    fn from(error: TypeError) -> Self {
        Self::TypeError(error)
    }
}
