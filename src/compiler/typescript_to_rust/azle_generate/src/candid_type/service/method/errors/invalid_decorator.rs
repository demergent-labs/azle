use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidDecorator {}

impl InvalidDecorator {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {}
    }
}

impl std::error::Error for InvalidDecorator {}

impl From<InvalidDecorator> for crate::Error {
    fn from(error: InvalidDecorator) -> Self {
        Self::InvalidDecorator(error)
    }
}

impl std::fmt::Display for InvalidDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Invalid decorator. Only @query and @update are permitted."
        )
    }
}
