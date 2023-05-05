use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_common::SourceMap;
use swc_ecma_ast::ModuleItem;

use crate::{
    canister_method::{module_item::ModuleItemHelperMethods, AnnotatedFnDecl, Annotation},
    errors::{CompilerOutput, Location, Suggestion},
    traits::GetSourceFileInfo,
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
pub struct ExtraneousDecorator {
    pub canister_method_type: CanisterMethodType,
    pub origin: String,
    pub line_number: usize,
    pub source: String,
    pub ranges: Vec<(usize, usize)>,
}

impl ExtraneousDecorator {
    pub fn from_annotated_fn_decls(
        annotated_fn_decls: Vec<AnnotatedFnDecl>,
        canister_method_type: CanisterMethodType,
    ) -> Self {
        todo!()
    }

    pub fn to_string(&self) -> String {
        todo!()
    }
}

impl std::error::Error for ExtraneousDecorator {}

impl std::fmt::Display for ExtraneousDecorator {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl From<ExtraneousDecorator> for crate::Error {
    fn from(error: ExtraneousDecorator) -> Self {
        Self::ExtraneousDecorator(error)
    }
}

pub fn build_extraneous_decorator_error_message(
    custom_decorator_module_item: &ModuleItem,
    source_map: &SourceMap,
) -> CompilerOutput {
    let span = custom_decorator_module_item.as_expr_stmt().unwrap().span;

    let annotation_type = match Annotation::from_module_item(custom_decorator_module_item) {
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
    let range = source_map.get_range(span);
    let example_function_declaration =
        "export function some_canister_method() {\n  // method body\n}";

    CompilerOutput {
        title: format!("extraneous {} annotation", annotation_type),
        location: Location {
            origin: source_map.get_origin(span),
            line_number: source_map.get_line_number(span),
            source: source_map.get_source(span),
            range,
        },
        annotation: "expected this to be followed by an exported function declaration".to_string(),
        suggestion: Some(Suggestion {
            title: "Follow it with an exported function declaration or remove it. E.g.:"
                .to_string(),
            source: format!(
                "{}\n{}",
                source_map.get_source(span),
                example_function_declaration
            ),
            range: (range.1 + 1, range.1 + example_function_declaration.len()),
            annotation: None,
            import_suggestion: None,
        }),
    }
}
