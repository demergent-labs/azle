use cdk_framework::act::node::canister_method::CanisterMethodType;
use swc_ecma_ast::ModuleItem;

use crate::{canister_method::ParseError, traits::GetName};

pub const CANISTER_METHOD_ANNOTATIONS: [&str; 7] = [
    "$heartbeat",
    "$init",
    "$inspectMessage",
    "$postUpgrade",
    "$preUpgrade",
    "$query",
    "$update",
];

#[derive(Clone)]
pub struct Annotation {
    pub method_type: CanisterMethodType,
    pub guard: Option<String>,
}

impl Annotation {
    pub fn new(name: &str, guard: Option<&str>) -> Result<Self, ParseError> {
        let method_type = match name {
            "$heartbeat" => CanisterMethodType::Heartbeat,
            "$init" => CanisterMethodType::Init,
            "$inspectMessage" => CanisterMethodType::InspectMessage,
            "$postUpgrade" => CanisterMethodType::PostUpgrade,
            "$preUpgrade" => CanisterMethodType::PreUpgrade,
            "$query" => CanisterMethodType::Query,
            "$update" => CanisterMethodType::Update,
            _ => return Err(ParseError::InvalidMethodType),
        };

        let guard = match guard {
            Some(str_ref) => Some(str_ref.to_string()),
            None => None,
        };

        Ok(Self { method_type, guard })
    }

    pub fn from_module_item(module_item: &ModuleItem) -> Result<Self, ParseError> {
        let call_expr = match module_item {
            swc_ecma_ast::ModuleItem::Stmt(stmt) => match stmt {
                swc_ecma_ast::Stmt::Expr(expr) => &*expr.expr,
                _ => return Err(ParseError::InvalidModuleItem),
            },
            swc_ecma_ast::ModuleItem::ModuleDecl(_) => return Err(ParseError::InvalidModuleItem),
        };

        match call_expr {
            swc_ecma_ast::Expr::Ident(ident) => Self::new(ident.get_name(), None),
            swc_ecma_ast::Expr::Call(call_expr) => {
                let method_type = match &call_expr.callee {
                    swc_ecma_ast::Callee::Expr(expr) => match &**expr {
                        swc_ecma_ast::Expr::Ident(ident) => ident.get_name(),
                        _ => return Err(ParseError::InvalidExpression),
                    },
                    _ => return Err(ParseError::InvalidCallee),
                };

                if call_expr.args.len() > 1 {
                    return Err(ParseError::TooManyArguments);
                }

                if call_expr.args.len() == 0 {
                    return Self::new(method_type, None);
                }

                let options_object = {
                    let expr_or_spread = call_expr.args.get(0).unwrap();
                    if expr_or_spread.spread.is_some() {
                        return Err(ParseError::InvalidSpreadUsage);
                    }
                    match &*expr_or_spread.expr {
                        swc_ecma_ast::Expr::Object(object_literal) => object_literal,
                        _ => return Err(ParseError::TypeError),
                    }
                };

                if options_object.props.len() > 1 {
                    return Err(ParseError::TooManyProperties);
                }

                if options_object.props.len() == 0 {
                    // TODO: Consider making this an error. If options object has no
                    // properties it should be removed and the annotation not invoked

                    return Self::new(method_type, None);
                }

                let option_property = match options_object.props.get(0).unwrap() {
                    swc_ecma_ast::PropOrSpread::Spread(_) => {
                        return Err(ParseError::InvalidSpreadUsage)
                    }
                    swc_ecma_ast::PropOrSpread::Prop(prop) => match &**prop {
                        swc_ecma_ast::Prop::KeyValue(key_value_prop) => key_value_prop,
                        _ => return Err(ParseError::InvalidPropertyDeclaration),
                    },
                };

                let key = match &option_property.key {
                    swc_ecma_ast::PropName::Ident(ident) => ident.get_name().to_string(),
                    swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
                    _ => return Err(ParseError::InvalidOption),
                };

                if key != "guard".to_string() {
                    return Err(ParseError::InvalidOption);
                }

                let guard_fn_name = match &*option_property.value {
                    swc_ecma_ast::Expr::Ident(ident) => Some(ident.get_name()),
                    _ => return Err(ParseError::InvalidOptionValue),
                };

                Self::new(method_type, guard_fn_name)
            }
            _ => return Err(ParseError::InvalidModuleItem),
        }
    }
}
