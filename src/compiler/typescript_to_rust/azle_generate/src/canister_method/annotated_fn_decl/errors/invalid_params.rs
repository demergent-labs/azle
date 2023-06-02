use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InvalidParams {
    location: Location,
}

impl InvalidParams {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>) -> Self {
        Self {
            location: annotated_fn_decl
                .source_map
                .get_location(annotated_fn_decl.fn_decl.function.span),
        }
    }
}

impl std::error::Error for InvalidParams {}

impl From<InvalidParams> for crate::Error {
    fn from(error: InvalidParams) -> Self {
        Self::InvalidParams(error)
    }
}

impl std::fmt::Display for InvalidParams {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let compiler_output = CompilerOutput {
            title: "Something is impossibly wrong with your parameters. Please open an issue showing your canister methods and this error.".to_string(),
            annotation: "".to_string(),
            suggestion: None,
            location: self.location.clone(),
        };
        write!(f, "{}", compiler_output)
    }
}
