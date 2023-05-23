use swc_ecma_ast::{TsFnParam, TsFnType};

use crate::{
    canister_method::{annotated_fn_decl::errors::GetParamRange, AnnotatedFnDecl},
    ts_ast::SourceMapped,
};

use swc_ecma_ast::Param;

use crate::{
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ArrayDestructuringInParamsNotSupported {
    message: String,
}

impl ArrayDestructuringInParamsNotSupported {
    pub fn from_ts_fn_param(_: &TsFnParam) -> Self {
        Self {
            message: "Array destructuring in parameters is unsupported at this time".to_string(),
        }
    }

    pub fn from_annotated_fn_decl(annotated_fn_decl: &AnnotatedFnDecl, param: &Param) -> Self {
        Self {
            message: annotated_fn_decl
                .build_array_destructure_error_message(param)
                .to_string(),
        }
    }

    pub fn from_ts_fn_type(_: &SourceMapped<TsFnType>) -> Self {
        Self {
            message: "Array destructuring in parameters is unsupported at this time".to_string(),
        }
    }
}

impl From<ArrayDestructuringInParamsNotSupported> for crate::Error {
    fn from(error: ArrayDestructuringInParamsNotSupported) -> Self {
        Self::ArrayDestructuringInParamsNotSupported(error)
    }
}

impl std::fmt::Display for ArrayDestructuringInParamsNotSupported {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl AnnotatedFnDecl<'_> {
    fn build_array_destructure_error_message(&self, param: &Param) -> CompilerOutput {
        let array_pat = param.pat.as_array().expect("Oops! Looks like we introduced a bug while refactoring. Please open a ticket at https://github.com/demergent-labs/azle/issues/new");

        let range = param.get_destructure_range(self.source_map);
        let replacement_name = "myParam".to_string(); // TODO: Come up with a better name from the ts_type_ann

        CompilerOutput {
            title: "Array destructuring in parameters is unsupported at this time".to_string(),
            location: Location {
                origin: self.source_map.get_origin(array_pat.span),
                line_number: self.source_map.get_line_number(array_pat.span),
                source: self.source_map.get_source(array_pat.span),
                range,
            },
            annotation: "Attempted to destructure here".to_string(),
            suggestion: Some(Suggestion {
                title: "Remove destructuring in favor of a concrete name".to_string(),
                source: self.source_map.generate_source_with_range_replaced(
                    array_pat.span,
                    range,
                    &replacement_name,
                ),
                range: (range.0, range.0 + replacement_name.len()),
                annotation: None,
                import_suggestion: None,
            }),
        }
    }
}
