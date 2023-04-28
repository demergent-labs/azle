use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_common::SourceMap;
use swc_ecma_ast::FnDecl;

use crate::{
    errors::{ErrorMessage, Suggestion},
    traits::GetSourceFileInfo,
};

pub fn build_async_not_allowed_error_message(
    fn_decl: &FnDecl,
    source_map: &SourceMap,
    method_type: &CanisterMethodType,
) -> ErrorMessage {
    let custom_annotation = match method_type {
        CanisterMethodType::Heartbeat => "$heartbeat",
        CanisterMethodType::Init => "$init",
        CanisterMethodType::InspectMessage => "$inspectMessage",
        CanisterMethodType::PostUpgrade => "$postUpgrade",
        CanisterMethodType::PreUpgrade => "$preUpgrade",
        CanisterMethodType::Query => "$query",
        CanisterMethodType::Update => "$update",
    };

    let span = fn_decl.function.span;
    let title = format!("{custom_annotation} canister method cannot be async");
    let origin = source_map.get_origin(span);
    let line_number = source_map.get_line_number(span);
    let source = source_map.get_source(span);
    let fn_range = source_map.get_range(span);
    let range = (fn_range.0, fn_range.0 + "async".len());
    let annotation = "here".to_string();

    let removed_async_keyword = "".to_string();
    let suggestion = Some(Suggestion {
        title: "Remove the async keyword. E.g.:".to_string(),
        source: source_map.generate_source_with_range_replaced(
            span,
            (range.0, range.1 + 1),
            &removed_async_keyword,
        ),
        range: (0, 0),
        annotation: None,
        import_suggestion: None,
    });

    ErrorMessage {
        title,
        origin,
        line_number,
        source,
        range,
        annotation,
        suggestion,
    }
}
