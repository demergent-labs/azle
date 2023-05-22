use crate::canister_method::AnnotatedFnDecl;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct UntypedParam {}

impl UntypedParam {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl) -> Self {
        Self {}
    }
}

impl From<UntypedParam> for crate::Error {
    fn from(error: UntypedParam) -> Self {
        Self::UntypedParam(error)
    }
}
