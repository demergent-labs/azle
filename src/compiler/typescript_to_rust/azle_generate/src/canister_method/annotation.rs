use cdk_framework::act::node::canister_method::CanisterMethodType;
use std::ops::Deref;
use swc_common::Span;
use swc_ecma_ast::{Callee, Expr, ModuleItem, Prop, PropName, PropOrSpread, Stmt};

use crate::{
    errors::{ArgumentError, SyntaxError, TypeError},
    internal_error,
    traits::{GetName, GetOptionalName, GetSourceFileInfo, GetSpan},
    ts_ast::SourceMapped,
    AliasTable, Error,
};

#[derive(Clone)]
pub struct Annotation {
    pub method_type: CanisterMethodType,
    pub guard: Option<String>,
    pub span: Span,
}

impl Annotation {
    pub fn new(
        name: &str,
        guard: Option<String>,
        span: Span,
        alias_table: &AliasTable,
    ) -> Result<Self, Error> {
        let name = name.to_string();
        let method_type = match name.as_str() {
            _ if alias_table.heartbeat_decorator.contains(&name) => CanisterMethodType::Heartbeat,
            _ if alias_table.init_decorator.contains(&name) => CanisterMethodType::Init,
            _ if alias_table.inspect_message_decorator.contains(&name) => {
                CanisterMethodType::InspectMessage
            }
            _ if alias_table.post_upgrade_decorator.contains(&name) => {
                CanisterMethodType::PostUpgrade
            }
            _ if alias_table.pre_upgrade_decorator.contains(&name) => {
                CanisterMethodType::PreUpgrade
            }
            _ if alias_table.query_decorator.contains(&name) => CanisterMethodType::Query,
            _ if alias_table.update_decorator.contains(&name) => CanisterMethodType::Update,
            _ => internal_error!(),
        };

        let guard = match guard {
            Some(str_ref) => Some(str_ref.to_string()),
            None => None,
        };

        Ok(Self {
            method_type,
            guard,
            span,
        })
    }

    pub fn from_module_item(module_item: &SourceMapped<ModuleItem>) -> Result<Self, Error> {
        let expr = match module_item.deref() {
            ModuleItem::Stmt(Stmt::Expr(expr)) => &*expr.expr,
            _ => internal_error!(),
        };

        match expr {
            Expr::Ident(ident) => {
                Self::new(&ident.get_name(), None, ident.span, module_item.alias_table)
            }
            Expr::Member(member) => {
                let name = match member.get_name() {
                    Some(name) => name,
                    None => internal_error!(), // If the member name can't be made into a name then it won't be recognized as annotation so it won't possibly get here
                };
                Self::new(&name, None, member.span, module_item.alias_table)
            }
            Expr::Call(call_expr) => {
                let method_type = match &call_expr.callee {
                    Callee::Expr(expr) => match &**expr {
                        Expr::Ident(ident) => ident.get_name(),
                        Expr::Member(member) => match member.get_name() {
                            Some(name) => name,
                            None => internal_error!(), // If the member name can't be made into a name then it won't be recognized as annotation so it won't possibly get here
                        },
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
                    return Self::new(&method_type, None, call_expr.span, module_item.alias_table);
                }

                let options_object = {
                    let expr_or_spread = &call_expr.args[0];
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

                    return Self::new(&method_type, None, call_expr.span, module_item.alias_table);
                }

                let option_property = match &options_object.props[0] {
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
                        PropName::Ident(ident) => (ident.get_name(), ident.span),
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

                Self::new(
                    &method_type,
                    guard_fn_name,
                    call_expr.span,
                    module_item.alias_table,
                )
            }
            _ => internal_error!(),
        }
    }
}

pub fn is_canister_method_annotation(name: &str, alias_table: &AliasTable) -> bool {
    let name = name.to_string();
    alias_table.heartbeat_decorator.contains(&name)
        || alias_table.init_decorator.contains(&name)
        || alias_table.inspect_message_decorator.contains(&name)
        || alias_table.post_upgrade_decorator.contains(&name)
        || alias_table.pre_upgrade_decorator.contains(&name)
        || alias_table.query_decorator.contains(&name)
        || alias_table.update_decorator.contains(&name)
}
