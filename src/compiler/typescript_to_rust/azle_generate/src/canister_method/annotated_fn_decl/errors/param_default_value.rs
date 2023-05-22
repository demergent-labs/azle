use crate::canister_method::AnnotatedFnDecl;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ParamDefaultValue {}

impl ParamDefaultValue {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl) -> Self {
        Self {}
    }
}

impl From<ParamDefaultValue> for crate::Error {
    fn from(error: ParamDefaultValue) -> Self {
        Self::ParamDefaultValue(error)
    }
}

impl std::fmt::Display for ParamDefaultValue {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "TODO")
    }
}
