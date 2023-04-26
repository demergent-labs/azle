#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ParseError {}

impl std::error::Error for ParseError {}

impl std::fmt::Display for ParseError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Description of ParseError")
    }
}
