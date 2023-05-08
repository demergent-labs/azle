use cdk_framework::act::node::canister_method::CanisterMethodType;
use std::ops::Deref;
use swc_ecma_ast::{Callee, Expr, ModuleItem, Prop, PropName, PropOrSpread, Stmt};

use crate::{
    errors::{ArgumentError, SyntaxError, TypeError},
    internal_error,
    traits::{GetName, GetSourceFileInfo, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

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
                    let location = module_item.source_map.get_location(call_expr.span);
                    return Err(ArgumentError::error(
                        format!("expected 0-1 arguments, but got {}", call_expr.args.len()),
                        location,
                    ));
                }

                if call_expr.args.len() == 0 {
                    return Self::new(method_type, None);
                }

                let options_object = {
                    let expr_or_spread = call_expr.args.get(0).unwrap();
                    if expr_or_spread.spread.is_some() {
                        return Err(
                            SyntaxError::error(
                                "spread operation is unsupported in canister method annotations at this time.".to_string(),
                                module_item.source_map.get_location(expr_or_spread.expr.get_span())
                            ),
                        );
                    }
                    match &*expr_or_spread.expr {
                        Expr::Object(object_literal) => object_literal,
                        _ => {
                            return Err(TypeError::error(
                                format!("expected options to be an object literal"),
                                module_item
                                    .source_map
                                    .get_location(expr_or_spread.expr.get_span()),
                            ))
                        }
                    }
                };

                // TODO: instead of counting the properties, consider going through all properties
                // and saying "Property x does not exist on type CanisterMethodOptions"
                if options_object.props.len() > 1 {
                    return Err(TypeError::error(
                        "too many properties: expected only one property, \"guard\"".to_string(),
                        module_item.source_map.get_location(options_object.span),
                    ));
                }

                if options_object.props.len() == 0 {
                    // TODO: Consider making this an error. If options object has no
                    // properties it should be removed and the annotation not invoked

                    return Self::new(method_type, None);
                }

                let option_property = match options_object.props.get(0).unwrap() {
                    PropOrSpread::Spread(spread_element) => return Err(
                        SyntaxError::error(
                            "spread operation is unsupported in canister method annotations at this time.".to_string(),
                            module_item.source_map.get_location(spread_element.expr.get_span())
                        )
                    ),
                    PropOrSpread::Prop(prop) => match &**prop {
                        Prop::KeyValue(key_value_prop) => key_value_prop,
                        Prop::Shorthand(ident) => return Err(
                            SyntaxError::error(
                                "shorthand notation unsupported here".to_string(),
                                module_item.source_map.get_location(ident.span)
                            )
                        ),
                        Prop::Assign(assign_prop) => return Err(
                            SyntaxError::error(
                                "default assignment unsupported here".to_string(),
                                module_item.source_map.get_location(assign_prop.key.span)
                            )
                        ),
                        Prop::Getter(getter_prop) => return Err(
                            SyntaxError::error(
                                "getter not allowed here".to_string(),
                                module_item.source_map.get_location(getter_prop.span)
                            )
                        ),
                        Prop::Setter(setter_prop) => return Err(
                            SyntaxError::error(
                                "setter not allowed here".to_string(),
                                module_item.source_map.get_location(setter_prop.span)
                            )
                        ),
                        Prop::Method(method_prop) => return Err(
                            SyntaxError::error(
                                "method not allowed here".to_string(),
                                module_item.source_map.get_location(method_prop.function.span)
                            )
                        ),
                    },
                };

                let (key, key_span) =
                    match &option_property.key {
                        PropName::Ident(ident) => (ident.get_name().to_string(), ident.span),
                        PropName::Str(str) => (str.value.to_string(), str.span),
                        PropName::Num(num) => {
                            return Err(TypeError::error(
                                format!(
                                    "invalid property: given \"{}\", but expected \"guard\"",
                                    num.value
                                ),
                                module_item.source_map.get_location(num.span),
                            ))
                        }
                        PropName::BigInt(big_int) => {
                            return Err(TypeError::error(
                                format!(
                                    "invalid property: given \"{}\", but expected \"guard\"",
                                    big_int.value
                                ),
                                module_item.source_map.get_location(big_int.span),
                            ))
                        }
                        PropName::Computed(computed_prop_name) => return Err(SyntaxError::error(
                            "computed properties are not supported in options object at this time."
                                .to_string(),
                            module_item.source_map.get_location(computed_prop_name.span),
                        )),
                    };

                if key != "guard".to_string() {
                    return Err(TypeError::error(
                        format!(
                            "invalid property: given \"{}\", but expected \"guard\"",
                            key
                        ),
                        module_item.source_map.get_location(key_span),
                    ));
                }

                let guard_fn_name = match &*option_property.value {
                    Expr::Ident(ident) => Some(ident.get_name()),
                    _ => return Err(TypeError::error(
                        "invalid value: guard must be an identifier referring to a guard function"
                            .to_string(),
                        module_item
                            .source_map
                            .get_location(option_property.value.get_span()),
                    )),
                };

                Self::new(method_type, guard_fn_name)
            }
            _ => internal_error!(),
        }
    }
}
