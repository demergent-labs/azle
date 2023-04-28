use swc_common::SourceMap;
use swc_ecma_ast::ModuleItem;

use crate::{
    canister_method::module_item::ModuleItemHelperMethods, errors::ErrorMessage,
    traits::GetSourceFileInfo,
};

#[derive(Clone, Debug)]
pub enum ParseError {
    InvalidMethodType,
    InvalidModuleItem,
    InvalidCallee,
    InvalidExpression,
    TooManyArguments,
    InvalidSpreadUsage,
    TypeError,
    TooManyProperties,
    InvalidPropertyDeclaration,
    InvalidOption,
    InvalidOptionValue,
}

impl ParseError {
    pub fn error_message(&self) -> String {
        let str = match self {
            Self::InvalidMethodType => "Invalid method type. Expected one of [$heartbeat, $init, $inspectMessage, $postUpgrade, $query, $update].", // TODO should $preUpgrade not be here?
            Self::InvalidModuleItem => "Invalid module item. Expected an identifier or call expression.",
            Self::InvalidCallee => "Invalid callee. Callee cannot be from super or import.",
            Self::InvalidExpression => "Invalid expression. Expected an identifier.",
            Self::TooManyArguments => "Too many arguments. Expected only one argument, an options object.",
            Self::InvalidSpreadUsage => "Spread operation is unsupported in canister method annotations at this time.",
            Self::TypeError => "TypeError. Expected options to be an object literal.",
            Self::TooManyProperties => "Too many properties. Expected only one property, \"guard\".",
            Self::InvalidPropertyDeclaration => "Invalid property declaration. Expected a key value pair. Shorthand, Assign, Getter, Setter, and Method are unsupported.",
            Self::InvalidOption => "Invalid option. Expected option \"guard\" as an identifier or string literal.",
            Self::InvalidOptionValue => "Invalid option value. Guard must be an identifier literal referring to a guard function.",
        };
        str.to_string()
    }
}

pub fn build_parse_error_message(
    parse_error: ParseError,
    supposed_decorator: &ModuleItem,
    source_map: &SourceMap,
) -> ErrorMessage {
    let span = supposed_decorator.as_expr_stmt().unwrap().span;
    let range = source_map.get_range(span);

    ErrorMessage {
        title: parse_error.error_message(),
        origin: source_map.get_origin(span),
        line_number: source_map.get_line_number(span),
        source: source_map.get_source(span),
        range,
        annotation: "here".to_string(),
        suggestion: None,
    }
}
