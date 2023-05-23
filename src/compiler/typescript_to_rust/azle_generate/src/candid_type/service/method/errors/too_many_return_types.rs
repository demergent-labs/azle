use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TooManyReturnTypes {}

impl TooManyReturnTypes {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {}
    }
}

impl From<TooManyReturnTypes> for crate::Error {
    fn from(error: TooManyReturnTypes) -> Self {
        Self::TooManyReturnTypes(error)
    }
}

impl std::fmt::Display for TooManyReturnTypes {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Too many return types. Generic type CallResult requires 1 type argument."
        )
    }
}
