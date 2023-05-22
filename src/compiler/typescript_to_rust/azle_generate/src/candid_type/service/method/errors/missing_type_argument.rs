use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingTypeArguments {}

impl MissingTypeArguments {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::MissingTypeArgument => "Missing type argument. Generic type CallResult requires 1 type argument.",
        Self {}
    }
}

impl From<MissingTypeArguments> for crate::Error {
    fn from(error: MissingTypeArguments) -> Self {
        Self::MissingTypeArgument(error)
    }
}

impl std::fmt::Display for MissingTypeArguments {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
