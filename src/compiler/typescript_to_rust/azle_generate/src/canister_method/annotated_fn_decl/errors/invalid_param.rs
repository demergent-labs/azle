use crate::canister_method::AnnotatedFnDecl;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidParams {}

impl InvalidParams {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl) -> Self {
        Self {}
    }
}

impl From<InvalidParams> for crate::Error {
    fn from(error: InvalidParams) -> Self {
        Self::InvalidParams(error)
    }
}
