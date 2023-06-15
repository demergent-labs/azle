use swc_ecma_ast::BindingIdent;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion, SuggestionModifications},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

#[derive(Debug, Clone, PartialEq)]
pub struct UntypedParam {
    location: Location,
    suggestion_modifications: SuggestionModifications,
}

impl UntypedParam {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
        binding_ident: &BindingIdent,
    ) -> Self {
        let range = annotated_fn_decl.source_map.get_range(binding_ident.span);
        let raw_source = annotated_fn_decl.source_map.get_source(binding_ident.span);
        let source = if raw_source.len() <= range.1 + 1 {
            format!("{} ", raw_source)
        } else {
            raw_source
        };
        let example_type_ann = ": ParamType".to_string(); // TODO: Come up with a better name from the source
        let corrected_source = annotated_fn_decl
            .source_map
            .generate_source_with_range_replaced(
                binding_ident.span,
                (range.1, range.1),
                &example_type_ann,
            );
        let suggestion_modifications = (
            corrected_source,
            (range.1, range.1 + example_type_ann.len()),
        );

        Self {
            location: Location {
                origin: annotated_fn_decl.source_map.get_origin(binding_ident.span),
                line_number: annotated_fn_decl
                    .source_map
                    .get_line_number(binding_ident.span),
                source,
                range: (range.1, range.1 + 1),
            },
            suggestion_modifications,
        }
    }

    fn build_untyped_param_error_msg(&self) -> CompilerOutput {
        CompilerOutput {
            title: "Untyped parameter".to_string(),
            location: self.location.clone(),
            annotation: "Expected type annotation here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify a type for the parameter".to_string(),
                source: self.suggestion_modifications.0.clone(),
                range: self.suggestion_modifications.1,
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}

impl std::error::Error for UntypedParam {}

impl From<UntypedParam> for crate::Error {
    fn from(error: UntypedParam) -> Self {
        Self::UntypedParam(error)
    }
}

impl std::fmt::Display for UntypedParam {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.build_untyped_param_error_msg())
    }
}
