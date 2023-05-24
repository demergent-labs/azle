use swc_ecma_ast::BindingIdent;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
};

#[derive(Debug, Clone, PartialEq)]
pub struct UntypedParam {
    compiler_output: CompilerOutput,
}

impl UntypedParam {
    pub fn from_annotated_fn_decl(
        annotated_fn_decl: &AnnotatedFnDecl,
        binding_ident: &BindingIdent,
    ) -> Self {
        Self {
            compiler_output: annotated_fn_decl.build_untyped_param_error_msg(binding_ident),
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
        write!(f, "{}", self.compiler_output)
    }
}

impl AnnotatedFnDecl<'_> {
    pub(super) fn build_untyped_param_error_msg(
        &self,
        binding_ident: &BindingIdent,
    ) -> CompilerOutput {
        let range = self.source_map.get_range(binding_ident.span);
        let raw_source = self.source_map.get_source(binding_ident.span);
        let example_type_ann = ": ParamType".to_string(); // TODO: Come up with a better name from the source
        let source = if raw_source.len() <= range.1 + 1 {
            format!("{} ", raw_source)
        } else {
            raw_source
        };

        let corrected_source = self.source_map.generate_source_with_range_replaced(
            binding_ident.span,
            (range.1, range.1),
            &example_type_ann,
        );

        CompilerOutput {
            title: "Untyped parameter".to_string(),
            location: Location {
                origin: self.source_map.get_origin(binding_ident.span),
                line_number: self.source_map.get_line_number(binding_ident.span),
                source,
                range: (range.1, range.1 + 1),
            },
            annotation: "Expected type annotation here".to_string(),
            suggestion: Some(Suggestion {
                title: "Specify a type for the parameter".to_string(),
                source: corrected_source,
                range: (range.1, range.1 + example_type_ann.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
