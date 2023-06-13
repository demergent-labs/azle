use cdk_framework::act::node::canister_method::CanisterMethodType;

use crate::{
    canister_method::AnnotatedFnDecl,
    errors::{CompilerOutput, InternalError, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
    Error,
};

/// Returned when a system canister method (other than heartbeat) is marked as async.
///
/// # Example
///
/// ```ts
/// import { $init } from 'azle';
///
/// $init;
/// export async function init(): Promise<void> {}
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct AsyncNotAllowed {
    pub annotation: String,
    pub location: Location,
}

impl AsyncNotAllowed {
    pub fn error_from_annotated_fn_decl(
        annotated_fn_decl: &SourceMapped<AnnotatedFnDecl>,
    ) -> Error {
        let annotation = match annotated_fn_decl.annotation.method_type {
            CanisterMethodType::Heartbeat => "$heartbeat",
            CanisterMethodType::Init => "$init",
            CanisterMethodType::InspectMessage => "$inspectMessage",
            CanisterMethodType::PostUpgrade => "$postUpgrade",
            CanisterMethodType::PreUpgrade => "$preUpgrade",
            CanisterMethodType::Query => "$query",
            CanisterMethodType::Update => "$update",
        }
        .to_string();

        let span = match &annotated_fn_decl.fn_decl.function.return_type {
            Some(return_type) => return_type.span,
            // Return Types are guaranteed by a check in get_annotated_fn_decls:
            // src/compiler/typescript_to_rust/azle_generate/src/canister_method/module.rs
            None => return Error::InternalError(InternalError::new()),
        };
        let origin = annotated_fn_decl.source_map.get_origin(span);
        let line_number = annotated_fn_decl.source_map.get_line_number(span);
        let source = annotated_fn_decl.source_map.get_source(span);
        let range = annotated_fn_decl.source_map.get_range(span);

        Self {
            annotation,
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
        let title = format!("{} canister method cannot be async", self.annotation);

        let annotation = "here".to_string();

        let removed_async_keyword = "".to_string();
        let suggestion = Some(Suggestion {
            title: "Remove the async keyword. E.g.:".to_string(),
            source: generate_source_with_range_replaced(&self.location, &removed_async_keyword),
            range: (0, 0),
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

impl std::error::Error for AsyncNotAllowed {}

impl std::fmt::Display for AsyncNotAllowed {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<AsyncNotAllowed> for crate::Error {
    fn from(error: AsyncNotAllowed) -> Self {
        Self::AsyncNotAllowed(error)
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
