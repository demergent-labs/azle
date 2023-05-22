use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingDecorator {}

impl MissingDecorator {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::MissingDecorator => "Missing decorator. External canister methods must be decorated with either @query or @update.",
        Self {}
    }
}

impl From<MissingDecorator> for crate::Error {
    fn from(error: MissingDecorator) -> Self {
        Self::MissingDecorator(error)
    }
}
