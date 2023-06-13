use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, InternalError, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
    Error,
};

/// Returned when a system canister method has a return type other than void
/// (or Promise<void> for heartbeat methods).
///
/// # Example
///
/// ```ts
/// import { $init } from 'azle';
///
/// $init;
/// export function init(): boolean {
///     return false
/// }
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct VoidReturnTypeRequired {
    pub location: Location,
}

impl VoidReturnTypeRequired {
    pub fn error_from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
    ) -> Error {
        let span = match &annotated_fn_decl.fn_decl.function.return_type {
            Some(return_type) => return_type.span,
            // Return Types are guaranteed by a check in get_annotated_fn_decls:
            // src/compiler/typescript_to_rust/azle_generate/src/canister_method/module.rs
            None => return Error::InternalError(InternalError::new()),
        };
        let line_number = annotated_fn_decl.source_map.get_line_number(span);
        let origin = annotated_fn_decl.source_map.get_origin(span);
        let range = annotated_fn_decl.source_map.get_range(span);
        let source = annotated_fn_decl.source_map.get_source(span);

        Self {
            location: Location {
                line_number,
                origin,
                range,
                source,
            },
        }
        .into()
    }

    pub fn to_string(&self) -> String {
        let title = "return type required to be void on system canister methods".to_string();
        let annotation = "required here".to_string();

        let void_return_type = ": void".to_string();
        let suggestion = Some(Suggestion {
            title: "Change the return type to void. E.g.:".to_string(),
            source: generate_source_with_range_replaced(&self.location, &void_return_type),
            range: (
                self.location.range.0,
                self.location.range.0 + void_return_type.len(),
            ),
            annotation: None,
            import_suggestion: None,
        });

        CompilerOutput {
            title,
            location: self.location.clone(),
            annotation,
            suggestion,
        }
        .to_string()
    }
}

impl std::error::Error for VoidReturnTypeRequired {}

impl std::fmt::Display for VoidReturnTypeRequired {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<VoidReturnTypeRequired> for crate::Error {
    fn from(error: VoidReturnTypeRequired) -> Self {
        Self::VoidReturnTypeRequired(error)
    }
}

fn generate_source_with_range_replaced(location: &Location, replacement: &String) -> String {
    location
        .source
        .chars()
        .take(location.range.0)
        .chain(replacement.chars())
        .chain(location.source.chars().skip(location.range.1))
        .collect()
}
