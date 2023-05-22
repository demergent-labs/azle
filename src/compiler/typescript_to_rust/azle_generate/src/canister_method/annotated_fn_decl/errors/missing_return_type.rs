use crate::canister_method::AnnotatedFnDecl;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingReturnType {}

impl MissingReturnType {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl) -> Self {
        Self {}
    }
}

impl From<MissingReturnType> for crate::Error {
    fn from(error: MissingReturnType) -> Self {
        Self::MissingReturnType(error)
    }
}

impl std::fmt::Display for MissingReturnType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
