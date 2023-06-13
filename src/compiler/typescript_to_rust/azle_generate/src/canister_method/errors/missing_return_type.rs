use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, Location, Suggestion},
    traits::{GetName, GetSourceFileInfo},
    ts_ast::SourceMapped,
};

/// Returned when Azle detects a canister method that doesn't specify a return type.
///
/// # Example
///
/// ```ts
/// import { $query } from 'azle';
///
/// $query;
/// export function canisterMethod() {}
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MissingReturnTypeAnnotation {
    pub function_name: String,
    pub location: Location,
}

impl MissingReturnTypeAnnotation {
    pub fn from_annotated_fn_decl(annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>) -> Self {
        let span = annotated_fn_decl.fn_decl.function.span;

        let function_name = annotated_fn_decl.fn_decl.ident.get_name();

        let line_number = annotated_fn_decl.source_map.get_line_number(span);
        let origin = annotated_fn_decl.source_map.get_origin(span);

        // TODO: Not very robust.
        let range = match annotated_fn_decl.fn_decl.function.params.last() {
            Some(param) => {
                let last_param_span_end_pos =
                    annotated_fn_decl.source_map.get_range(param.span).1 + 1;
                (last_param_span_end_pos, last_param_span_end_pos + 1)
            }
            None => {
                let ident_span_end_pos = annotated_fn_decl
                    .source_map
                    .get_range(annotated_fn_decl.fn_decl.ident.span)
                    .1;
                let parens_length = "()".to_string().len();

                (
                    ident_span_end_pos + parens_length,
                    ident_span_end_pos + parens_length + 1,
                )
            }
        };
        let source = annotated_fn_decl.source_map.get_source(span);

        Self {
            function_name,
            location: Location {
                origin,
                line_number,
                source,
                range,
            },
        }
    }

    pub fn to_string(&self) -> String {
        let example_return_type = ": void".to_string();
        let suggested_source = insert_return_type_into_source(
            &self.location.source,
            self.location.range.0,
            &example_return_type,
        );

        CompilerOutput {
            title: format!(
                "missing return type annotation for canister method \"{}\"",
                self.function_name
            ),
            location: self.location.clone(),
            annotation: "expected here".to_string(),
            suggestion: Some(Suggestion {
                title: "Add a valid candid type as a return type. E.g.:".to_string(),
                source: suggested_source,
                range: (
                    self.location.range.0,
                    self.location.range.0 + example_return_type.len(),
                ),
                annotation: None,
                import_suggestion: None,
            }),
        }
        .to_string()
    }
}

impl std::error::Error for MissingReturnTypeAnnotation {}

impl std::fmt::Display for MissingReturnTypeAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<MissingReturnTypeAnnotation> for crate::Error {
    fn from(error: MissingReturnTypeAnnotation) -> Self {
        Self::MissingReturnTypeAnnotation(error)
    }
}

fn insert_return_type_into_source(
    source: &String,
    index: usize,
    return_type_annotation: &String,
) -> String {
    format!(
        "{}{}{}",
        &source[..index],
        return_type_annotation,
        &source[index..]
    )
}
