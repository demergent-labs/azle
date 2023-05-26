use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingDecorator {}

impl MissingDecorator {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {}
    }
}

impl std::error::Error for MissingDecorator {}

impl From<MissingDecorator> for crate::Error {
    fn from(error: MissingDecorator) -> Self {
        Self::MissingDecorator(error)
    }
}

impl std::fmt::Display for MissingDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Missing decorator. External canister methods must be decorated with either @query or @update.")
    }
}
