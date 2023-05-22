use crate::canister_method::AnnotatedFnDecl;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct QualifiedType {}

impl QualifiedType {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl) -> Self {
        Self {}
    }
}

impl From<QualifiedType> for crate::Error {
    fn from(error: QualifiedType) -> Self {
        Self::QualifiedType(error)
    }
}

impl std::fmt::Display for QualifiedType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
