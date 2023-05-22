use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TooManyReturnTypes {}

impl TooManyReturnTypes {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::TooManyReturnTypes => "Too many return types. Generic type CallResult requires 1 type argument.",
        Self {}
    }
}

impl From<TooManyReturnTypes> for crate::Error {
    fn from(error: TooManyReturnTypes) -> Self {
        Self::TooManyReturnTypes(error)
    }
}
