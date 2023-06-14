use swc_ecma_ast::TsTypeRef;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct MissingReturnType {
    location: Location,
    sug_mod: SuggestionModifications,
    canister_method_type: String,
}

impl MissingReturnType {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        ts_type_ref: &TsTypeRef,
        canister_method_type: &str,
    ) -> Self {
        let example_type_param = "<null>".to_string();
        let example_return_type = format!("{}{}", canister_method_type, example_type_param);

        let span = ts_type_ref.span;
        let range = annotated_fn_decl.source_map.get_range(span);
        let location = Location {
            origin: annotated_fn_decl.source_map.get_origin(span),
            line_number: annotated_fn_decl.source_map.get_line_number(span),
            source: format!("{} ", annotated_fn_decl.source_map.get_source(span)),
            range: (range.1, range.1 + 1),
        };
        Self {
            location,
            sug_mod: (
                annotated_fn_decl
                    .source_map
                    .generate_modified_source(span, &example_return_type),
                (range.1, range.1 + example_type_param.len()),
            ),
            canister_method_type: canister_method_type.to_string(),
        }
    }

    fn build_missing_return_type_error_msg(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Missing return type".to_string(),
            location: self.location.clone(),
            annotation: "Expected return type here".to_string(),
            suggestion: Some(Suggestion {
                title: format!(
                    "Specify a return type as a type argument to `{}`. E.g.:",
                    self.canister_method_type
                ),
                annotation: None,
                import_suggestion: None,
                source: self.sug_mod.0.clone(),
                range: self.sug_mod.1,
            }),
        }
    }
}

impl std::error::Error for MissingReturnType {}

impl From<MissingReturnType> for crate::Error {
    fn from(error: MissingReturnType) -> Self {
        Self::MissingReturnType(error)
    }
}

impl std::fmt::Display for MissingReturnType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_missing_return_type_error_msg())
    }
}
