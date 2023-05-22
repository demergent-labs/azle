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
