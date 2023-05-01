use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_common::SourceMap;
use swc_ecma_ast::ModuleItem;

use crate::{
    canister_method::{module_item::ModuleItemHelperMethods, Annotation},
    errors::{ErrorMessage, Suggestion},
    traits::GetSourceFileInfo,
};

pub fn build_extraneous_decorator_error_message(
    custom_decorator_module_item: &ModuleItem,
    source_map: &SourceMap,
) -> ErrorMessage {
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

    ErrorMessage {
        title: format!("extraneous {} annotation", annotation_type),
        origin: source_map.get_origin(span),
        line_number: source_map.get_line_number(span),
        source: source_map.get_source(span),
        range,
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
