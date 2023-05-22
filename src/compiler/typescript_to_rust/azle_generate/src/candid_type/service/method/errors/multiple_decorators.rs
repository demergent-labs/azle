use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MultipleDecorators {}

impl MultipleDecorators {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::MultipleDecorators => "Too many decorators. External canister methods can only specify one decorator: @query or @update.",
        Self {}
    }
}

impl From<MultipleDecorators> for crate::Error {
    fn from(error: MultipleDecorators) -> Self {
        Self::MultipleDecorators(error)
    }
}
