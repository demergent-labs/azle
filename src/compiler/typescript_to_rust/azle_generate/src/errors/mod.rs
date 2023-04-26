mod error_message;
mod parse_error;
mod suggestion;

pub use error_message::ErrorMessage;
pub use parse_error::ParseError;
pub use suggestion::Suggestion;

pub mod service_method;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Error {
    ParseError(ParseError),
}

impl std::error::Error for Error {}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::ParseError(parse_error) => parse_error.fmt(f),
        }
    }
}

impl From<ParseError> for Error {
    fn from(error: ParseError) -> Self {
        Self::ParseError(error)
    }
}
