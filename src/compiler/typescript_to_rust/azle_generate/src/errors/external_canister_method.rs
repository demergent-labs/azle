#[derive(Clone, Debug)]
pub enum ParseError {
    MissingDecorator(String),
    InvalidMethodName(String),
    InvalidDecorator(String),
    MultipleDecorators(String),
    QualifiedNameError(String),
    MissingCanisterResultAnnotation(String),
    InvalidReturnType(String),
    IncorrectTypeArgumentsToCanisterResult(String),
    MissingTypeAnnotation(String),
}

impl ParseError {
    pub fn error_message(&self) -> &String {
        match self {
            ParseError::MissingDecorator(e) => e,
            ParseError::InvalidMethodName(e) => e,
            ParseError::InvalidDecorator(e) => e,
            ParseError::MultipleDecorators(e) => e,
            ParseError::QualifiedNameError(e) => e,
            ParseError::MissingCanisterResultAnnotation(e) => e,
            ParseError::InvalidReturnType(e) => e,
            ParseError::IncorrectTypeArgumentsToCanisterResult(e) => e,
            ParseError::MissingTypeAnnotation(e) => e,
        }
    }
}
