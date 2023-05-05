use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::ModuleItem;

use crate::{
    canister_method::{module_item::ModuleItemHelperMethods, Annotation},
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

/// Returned when Azle detects a system method annotation without an
/// accompanying exported function signature immediately after.
///
/// # Examples
///
/// 1. Decorator separated from function by other statements
///
/// ```ts
/// import { $init } from 'azle';
///
/// $init; // Not immediately followed by exported function
/// let thisShouldNotBeHere;
/// export function init(): void {}
/// ```
///
/// 2. Trailing decorator at end of file
///
/// ```ts
/// import { $init } from 'azle';
///
/// export function init(): void {}
///
/// $init; // Not followed by exported function
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExtraneousCanisterMethodAnnotation {
    pub annotation: String,
    pub location: Location,
    pub suggested_source: String,
}

impl ExtraneousCanisterMethodAnnotation {
    pub fn from_module_item(annotation: SourceMapped<ModuleItem>) -> Self {
        let annotation_type = match Annotation::from_module_item(&annotation) {
            Ok(annotation) => match annotation.method_type {
                CanisterMethodType::Heartbeat => "$heartbeat",
                CanisterMethodType::Init => "$init",
                CanisterMethodType::InspectMessage => "$inspectMessage",
                CanisterMethodType::PostUpgrade => "$postUpgrade",
                CanisterMethodType::PreUpgrade => "$preUpgrade",
                CanisterMethodType::Query => "$query",
                CanisterMethodType::Update => "$update",
            },
            Err(err) => panic!("{}", err.error_message()),
        };

        let span = annotation.as_expr_stmt().unwrap().span;
        let line_number = annotation.source_map.get_line_number(span);
        let origin = annotation.source_map.get_origin(span);
        let range = annotation.source_map.get_range(span);
        let source = annotation.source_map.get_source(span);

        let example_function_declaration =
            "export function some_canister_method() {\n  // method body\n}";

        let suggested_source = format!(
            "{}\n{}",
            annotation.source_map.get_source(span),
            example_function_declaration
        );

        Self {
            annotation: annotation_type.to_string(),
            location: Location {
                line_number,
                origin,
                range,
                source,
            },
            suggested_source,
        }
    }

    pub fn to_string(&self) -> String {
        let example_function_declaration =
            "export function some_canister_method() {\n  // method body\n}";

        CompilerOutput {
            title: format!("extraneous {} annotation", self.annotation),
            location: self.location.clone(),
            annotation: "expected this to be followed by an exported function declaration"
                .to_string(),
            suggestion: Some(Suggestion {
                title: "Follow it with an exported function declaration or remove it. E.g.:"
                    .to_string(),
                source: self.suggested_source.clone(),
                range: (
                    self.location.range.1 + 1,
                    self.location.range.1 + example_function_declaration.len(),
                ),
                annotation: None,
                import_suggestion: None,
            }),
        }
        .to_string()
    }
}

impl std::error::Error for ExtraneousCanisterMethodAnnotation {}

impl std::fmt::Display for ExtraneousCanisterMethodAnnotation {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<ExtraneousCanisterMethodAnnotation> for crate::Error {
    fn from(error: ExtraneousCanisterMethodAnnotation) -> Self {
        Self::ExtraneousCanisterMethodAnnotation(error)
    }
}
