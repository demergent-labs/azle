use cdk_framework::act::node::canister_method::CanisterMethodType;

use crate::{
    canister_method::Annotation,
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
    ts_ast::SourceMapped,
};

/// Returned when Azle detects a canister method annotation without an
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
/// import { $query } from 'azle';
///
/// //...
///
/// $query; // Not followed by exported function
/// ```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ExtraneousCanisterMethodAnnotation {
    pub annotation: String,
    pub location: Location,
}

impl ExtraneousCanisterMethodAnnotation {
    pub fn from_annotation(sm_annotation: &SourceMapped<Annotation>) -> Self {
        let annotation = match sm_annotation.method_type {
            CanisterMethodType::Heartbeat => "$heartbeat",
            CanisterMethodType::Init => "$init",
            CanisterMethodType::InspectMessage => "$inspectMessage",
            CanisterMethodType::PostUpgrade => "$postUpgrade",
            CanisterMethodType::PreUpgrade => "$preUpgrade",
            CanisterMethodType::Query => "$query",
            CanisterMethodType::Update => "$update",
        }
        .to_string();

        let span = sm_annotation.span;
        let line_number = sm_annotation.source_map.get_line_number(span);
        let origin = sm_annotation.source_map.get_origin(span);
        let range = sm_annotation.source_map.get_range(span);
        let source = sm_annotation.source_map.get_source(span);

        Self {
            annotation,
            location: Location {
                line_number,
                origin,
                range,
                source,
            },
        }
    }

    pub fn to_string(&self) -> String {
        let example_function_declaration =
            "export function some_canister_method() {\n  // method body\n}";

        let suggested_source =
            format!("{}\n{}", self.location.source, example_function_declaration);

        CompilerOutput {
            title: format!("extraneous {} annotation", self.annotation),
            location: self.location.clone(),
            annotation: "expected this to be followed by an exported function declaration"
                .to_string(),
            suggestion: Some(Suggestion {
                title: "Follow it with an exported function declaration or remove it. E.g.:"
                    .to_string(),
                source: suggested_source,
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
