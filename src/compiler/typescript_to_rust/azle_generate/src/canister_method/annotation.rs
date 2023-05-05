use cdk_framework::act::node::canister_method::CanisterMethodType;
use std::ops::Deref;
use swc_ecma_ast::{Callee, Expr, ModuleItem, Prop, PropName, PropOrSpread, Stmt};

use crate::{internal_error, traits::GetName, ts_ast::SourceMapped, Error};

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
    pub fn new(name: &str, guard: Option<&str>) -> Result<Self, Error> {
        let method_type = match name {
            "$heartbeat" => CanisterMethodType::Heartbeat,
            "$init" => CanisterMethodType::Init,
            "$inspectMessage" => CanisterMethodType::InspectMessage,
            "$postUpgrade" => CanisterMethodType::PostUpgrade,
            "$preUpgrade" => CanisterMethodType::PreUpgrade,
            "$query" => CanisterMethodType::Query,
            "$update" => CanisterMethodType::Update,
            _ => internal_error!(),
        };

        let guard = match guard {
            Some(str_ref) => Some(str_ref.to_string()),
            None => None,
        };

        Ok(Self { method_type, guard })
    }

    pub fn from_module_item(module_item: &SourceMapped<ModuleItem>) -> Result<Self, Error> {
        let expr = match module_item.deref() {
            ModuleItem::Stmt(Stmt::Expr(expr)) => &*expr.expr,
            _ => internal_error!(),
        };

        match expr {
            Expr::Ident(ident) => Self::new(ident.get_name(), None),
            Expr::Call(call_expr) => {
                let method_type = match &call_expr.callee {
                    Callee::Expr(expr) => match &**expr {
                        Expr::Ident(ident) => ident.get_name(),
                        _ => internal_error!(),
                    },
                    _ => internal_error!(),
                };

                if call_expr.args.len() > 1 {
                    return Err(Error::TooManyArguments);
                }

                if call_expr.args.len() == 0 {
                    return Self::new(method_type, None);
                }

                let options_object = {
                    let expr_or_spread = call_expr.args.get(0).unwrap();
                    if expr_or_spread.spread.is_some() {
                        return Err(Error::InvalidSpreadUsage);
                    }
                    match &*expr_or_spread.expr {
                        Expr::Object(object_literal) => object_literal,
                        _ => return Err(Error::TypeError),
                    }
                };

                if options_object.props.len() > 1 {
                    return Err(Error::TooManyProperties);
                }

                if options_object.props.len() == 0 {
                    // TODO: Consider making this an error. If options object has no
                    // properties it should be removed and the annotation not invoked

                    return Self::new(method_type, None);
                }

                let option_property = match options_object.props.get(0).unwrap() {
                    PropOrSpread::Spread(_) => return Err(Error::InvalidSpreadUsage),
                    PropOrSpread::Prop(prop) => match &**prop {
                        Prop::KeyValue(key_value_prop) => key_value_prop,
                        _ => return Err(Error::InvalidPropertyDeclaration),
                    },
                };

                let key = match &option_property.key {
                    PropName::Ident(ident) => ident.get_name().to_string(),
                    PropName::Str(str) => str.value.to_string(),
                    _ => return Err(Error::InvalidOption),
                };

                if key != "guard".to_string() {
                    return Err(Error::InvalidOption);
                }

                let guard_fn_name = match &*option_property.value {
                    Expr::Ident(ident) => Some(ident.get_name()),
                    _ => return Err(Error::InvalidOptionValue),
                };

                Self::new(method_type, guard_fn_name)
            }
            _ => internal_error!(),
        }
    }
}
