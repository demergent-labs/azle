use swc_ecma_ast::ClassProp;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingTypeAnnotation {}

impl MissingTypeAnnotation {
    pub fn from_class_prop(_: &ClassProp) -> Self {
        Self {}
    }
}

impl std::error::Error for MissingTypeAnnotation {}

impl From<MissingTypeAnnotation> for crate::Error {
    fn from(error: MissingTypeAnnotation) -> Self {
        Self::MissingTypeAnnotation(error)
    }
}

impl std::fmt::Display for MissingTypeAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Missing type annotation. External canister methods must specify a return type."
        )
    }
}
