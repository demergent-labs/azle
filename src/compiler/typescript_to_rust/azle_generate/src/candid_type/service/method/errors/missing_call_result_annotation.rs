use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingCallResultAnnotation {}

impl MissingCallResultAnnotation {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {}
    }
}

impl From<MissingCallResultAnnotation> for crate::Error {
    fn from(error: MissingCallResultAnnotation) -> Self {
        Self::MissingCallResultAnnotation(error)
    }
}

impl std::fmt::Display for MissingCallResultAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Invalid return type. External canister methods must wrap their return types in the CallResult<T> generic type.")
    }
}
