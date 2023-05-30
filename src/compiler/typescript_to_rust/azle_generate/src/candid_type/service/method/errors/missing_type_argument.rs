use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq)]
pub struct MissingTypeArguments {
    message: String,
}

impl MissingTypeArguments {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {
            message: "Missing type argument. Generic type CallResult requires 1 type argument."
                .to_string(),
        }
    }
}

impl std::error::Error for MissingTypeArguments {}

impl From<MissingTypeArguments> for crate::Error {
    fn from(error: MissingTypeArguments) -> Self {
        Self::MissingTypeArgument(error)
    }
}

impl std::fmt::Display for MissingTypeArguments {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}
