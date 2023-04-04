#[derive(Clone, Debug)]
pub enum ParseError {
    InvalidDecorator,
    InvalidReturnType,
    MissingCallResultAnnotation,
    MissingDecorator,
    MissingTypeAnnotation,
    MissingTypeArgument,
    MultipleDecorators,
    NamespaceQualifiedType,
    TooManyReturnTypes,
    UnallowedComputedProperty,
}

impl ParseError {
    pub fn error_message(&self) -> String {
        let str = match self {
            Self::InvalidDecorator => "Invalid decorator. Only @query and @update are permitted.",
            Self::InvalidReturnType => "Method has an invalid return type. Only function return types are permitted.",
            Self::MissingCallResultAnnotation => "Invalid return type. External canister methods must wrap their return types in the CallResult<T> generic type.",
            Self::MissingDecorator => "Missing decorator. External canister methods must be decorated with either @query or @update.",
            Self::MissingTypeAnnotation => "Missing type annotation. External canister methods must specify a return type.",
            Self::MissingTypeArgument => "Missing type argument. Generic type CallResult requires 1 type argument.",
            Self::MultipleDecorators => "Too many decorators. External canister methods can only specify one decorator: @query or @update.",
            Self::NamespaceQualifiedType => "Unsupported data type. Qualified types are not currently supported. Try importing the type directly.",
            Self::TooManyReturnTypes => "Too many return types. Generic type CallResult requires 1 type argument.",
            Self::UnallowedComputedProperty => "Unallowed computed property. Computed properties in external canister definitions aren't currently supported.",
        };
        str.to_string()
    }
}
