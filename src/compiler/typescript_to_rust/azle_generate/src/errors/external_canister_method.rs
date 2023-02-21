#[derive(Clone, Debug)]
pub enum ParseError {
    IncorrectTypeArgumentsToCanisterResult,
    InvalidDecorator,
    InvalidMethodName,
    InvalidReturnType,
    MissingCanisterResultAnnotation,
    MissingDecorator,
    MissingTypeAnnotation,
    MissingTypeArgument,
    MultipleDecorators,
    NamespaceQualifiedType,
}

impl ParseError {
    pub fn error_message(&self) -> String {
        let str = match self {
            Self::IncorrectTypeArgumentsToCanisterResult => "Incorrect number of type arguments to generic type CanisterResult<T>.",
            Self::InvalidDecorator => "Decorator not allowed on constructor",
            Self::InvalidMethodName => "Contains a computed method name which isn't currently supported",
            Self::InvalidReturnType => "Method has an invalid return type. Only function return types are permitted",
            Self::MissingCanisterResultAnnotation => "Return type of property is not a CanisterResult. External canister methods must wrap their return types in the CanisterResult<T> generic type.",
            Self::MissingDecorator => "Property is missing a decorator. It must be decorated with either @query, or @update",
            Self::MissingTypeAnnotation => "Method is missing a type annotation",
            Self::MissingTypeArgument => "Missing type argument to generic return type CanisterResult<T>.",
            Self::MultipleDecorators => "Child property specifies multiple decorators.",
            Self::NamespaceQualifiedType => "Qualified names in member return types are not currently supported. Try importing the type directly.",
        };
        str.to_string()
    }
}
