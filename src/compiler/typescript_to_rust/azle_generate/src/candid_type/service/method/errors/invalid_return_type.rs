use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidReturnType {}

impl InvalidReturnType {
    pub fn from_class_prop(class_prop: &ClassProp) -> Self {
        // Self::InvalidReturnType => "Method has an invalid return type. Only function return types are permitted.",
        Self {}
    }
}

impl From<InvalidReturnType> for crate::Error {
    fn from(error: InvalidReturnType) -> Self {
        Self::InvalidReturnType(error)
    }
}

impl std::fmt::Display for InvalidReturnType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
