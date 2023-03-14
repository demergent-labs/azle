use std::ops::Deref;

use cdk_framework::act::node::canister_method::CanisterMethodType;

use crate::ts_ast::{GetName, Item};

pub const CANISTER_METHOD_ANNOTATIONS: [&str; 7] = [
    "$heartbeat",
    "$init",
    "$inspect_message",
    "$post_upgrade",
    "$pre_upgrade",
    "$query",
    "$update",
];

#[derive(Clone)]
pub struct CanisterMethodAnnotation {
    pub method_type: CanisterMethodType,
    pub guard: Option<String>,
}

impl CanisterMethodAnnotation {
    pub fn new(name: &str, guard: Option<&str>) -> Option<Self> {
        let method_type = match name {
            "$heartbeat" => CanisterMethodType::Heartbeat,
            "$init" => CanisterMethodType::Init,
            "$inspect_message" => CanisterMethodType::InspectMessage,
            "$post_upgrade" => CanisterMethodType::PostUpgrade,
            "$pre_upgrade" => CanisterMethodType::PreUpgrade,
            "$query" => CanisterMethodType::Query,
            "$update" => CanisterMethodType::Update,
            _ => return None,
        };

        let guard = match guard {
            Some(str_ref) => Some(str_ref.to_string()),
            None => None,
        };

        Some(Self {
            method_type: CanisterMethodType::Init,
            guard,
        })
    }

    // TODO: This needs to return a Result not an Option
    // Which means we either need to get the source map in here, or we need to
    // return an error that can be interpreted where there is a source map and
    // then that place will handle the nice error message for the user.
    pub fn from_item(item: &Item) -> Option<Self> {
        match item.deref() {
            swc_ecma_ast::ModuleItem::Stmt(stmt) => match stmt {
                swc_ecma_ast::Stmt::Expr(expr) => match &*expr.expr {
                    swc_ecma_ast::Expr::Ident(ident) => Self::new(ident.get_name(), None),
                    swc_ecma_ast::Expr::Call(call_expr) => {
                        let method_type = match call_expr.callee {
                            swc_ecma_ast::Callee::Expr(expr) => match &*expr {
                                swc_ecma_ast::Expr::Ident(ident) => ident.get_name(),
                                _ => return None,
                            },
                            _ => return None,
                        };

                        if call_expr.args.len() > 1 {
                            return None; // Error: Too many arguments to azle decorator annotation
                        }

                        if call_expr.args.len() == 0 {
                            // return Self::new(method_type, None);
                            return None; // Error: If method has no args it should not be invoked
                        }

                        let options_object = {
                            let expr_or_spread = call_expr.args.get(0).unwrap();
                            if expr_or_spread.spread.is_some() {
                                return None; // Error: Cannot spread arguments here
                            }
                            match *expr_or_spread.expr {
                                swc_ecma_ast::Expr::Object(object_literal) => object_literal,
                                _ => return None,
                            }
                        };

                        if options_object.props.len() > 1 {
                            return None; // Error: Incorrect properties in guard object
                        }

                        if options_object.props.len() == 0 {
                            // TODO: Consider making this an error. If options object has no
                            // properties it should be removed and the annotation not invoked

                            return Self::new(method_type, None);
                        }

                        let option_property = match options_object.props.get(1).unwrap() {
                            swc_ecma_ast::PropOrSpread::Spread(_) => return None, // Error: Spread not allowed in options object
                            swc_ecma_ast::PropOrSpread::Prop(prop) => match **prop {
                                swc_ecma_ast::Prop::KeyValue(key_value_prop) => key_value_prop,
                                _ => return None,
                            },
                        };

                        let key = match option_property.key {
                            swc_ecma_ast::PropName::Ident(ident) => ident.get_name().to_string(),
                            swc_ecma_ast::PropName::Str(str) => str.value.to_string(),
                            _ => return None // Error: Computed properties aren't allowed at this time. Num and BigInt aren't options
                            // swc_ecma_ast::PropName::Computed(_) => todo!(),
                            // swc_ecma_ast::PropName::Num(_) => todo!(),
                            // swc_ecma_ast::PropName::BigInt(_) => todo!(),
                        };

                        if key != "Guard".to_string() {
                            return None; // Error: format!("Invalid option \"{key}\"")
                        }

                        let guard_fn_name = match *option_property.value {
                            swc_ecma_ast::Expr::Ident(ident) => Some(ident.get_name()),
                            _ => return None, // Error: Guard option must be an identifier.
                        };

                        Self::new(method_type, guard_fn_name)
                    }
                    _ => None,
                },
                _ => None,
            },
            swc_ecma_ast::ModuleItem::ModuleDecl(_) => None,
        }
    }
}
