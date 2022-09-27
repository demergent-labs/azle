use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl, TsTypeRef};

use crate::{
    cdk_act::{
        nodes::data_type_nodes::{
            act_funcs::Func, ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias,
            ActPrimitiveLit,
        },
        ActDataType, ToActDataType,
    },
    generators::funcs,
};

use super::{
    ts_fn_type, ts_type_lit,
    ts_types_to_act::{build_act_custom_type_node, build_act_primitive_type_node, calculate_hash},
    GetDependencies, GetName,
};

impl GetName for TsTypeRef {
    fn get_name(&self) -> &str {
        &self.type_name.as_ident().unwrap().sym.chars().as_str()
    }
}

impl ToActDataType for TsTypeRef {
    fn to_act_data_type(&self, name: &Option<&String>) -> crate::cdk_act::ActDataType {
        match self.get_name() {
            "blob" => build_act_primitive_type_node(ActPrimitiveLit::Blob, name),
            "float32" => build_act_primitive_type_node(ActPrimitiveLit::Float32, name),
            "float64" => build_act_primitive_type_node(ActPrimitiveLit::Float64, name),
            "int" => build_act_primitive_type_node(ActPrimitiveLit::Int, name),
            "int8" => build_act_primitive_type_node(ActPrimitiveLit::Int8, name),
            "int16" => build_act_primitive_type_node(ActPrimitiveLit::Int16, name),
            "int32" => build_act_primitive_type_node(ActPrimitiveLit::Int32, name),
            "int64" => build_act_primitive_type_node(ActPrimitiveLit::Int64, name),
            "nat" => build_act_primitive_type_node(ActPrimitiveLit::Nat, name),
            "nat8" => build_act_primitive_type_node(ActPrimitiveLit::Nat8, name),
            "nat16" => build_act_primitive_type_node(ActPrimitiveLit::Nat16, name),
            "nat32" => build_act_primitive_type_node(ActPrimitiveLit::Nat32, name),
            "nat64" => build_act_primitive_type_node(ActPrimitiveLit::Nat64, name),
            "Principal" => build_act_primitive_type_node(ActPrimitiveLit::Principal, name),
            "empty" => build_act_primitive_type_node(ActPrimitiveLit::Empty, name),
            "reserved" => build_act_primitive_type_node(ActPrimitiveLit::Reserved, name),
            "Opt" => parse_opt_type_ref(self, name),
            "Func" => parse_func_type_ref(self, name),
            "Variant" => parse_variant_type_ref(self, name),
            _ => build_act_custom_type_node(self.get_name().to_string(), name),
        }
    }
}

impl GetDependencies for TsTypeRef {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        match self.get_name() {
            "blob" => vec![],
            "float32" => vec![],
            "float64" => vec![],
            "int" => vec![],
            "int8" => vec![],
            "int16" => vec![],
            "int32" => vec![],
            "int64" => vec![],
            "nat" => vec![],
            "nat8" => vec![],
            "nat16" => vec![],
            "nat32" => vec![],
            "nat64" => vec![],
            "Principal" => vec![],
            "empty" => vec![],
            "reserved" => vec![],
            "Opt" => get_dependent_types_from_enclosing_type(self, type_alias_lookup, found_types),
            "Func" => get_dependent_types_from_enclosing_type(self, type_alias_lookup, found_types),
            "Variant" => {
                get_dependent_types_from_enclosing_type(self, type_alias_lookup, found_types)
            }
            _ => {
                let name = self.get_name().to_string();
                if found_types.contains(&name) {
                    return vec![];
                }
                match type_alias_lookup.clone().get(&name) {
                    Some(decl) => {
                        let new_type = vec![name];
                        let new_hash: HashSet<String> =
                            HashSet::from_iter(new_type.iter().cloned());
                        let found_types: HashSet<String> =
                            found_types.clone().union(&new_hash).cloned().collect();
                        vec![
                            new_type,
                            decl.get_dependent_types(type_alias_lookup, &found_types),
                        ]
                        .concat()
                    }
                    None => vec![],
                }
            }
        }
    }
}

fn get_dependent_types_from_enclosing_type(
    ts_type_ref: &TsTypeRef,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    let type_params = &ts_type_ref.type_params;
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = &*params.params[0];
            enclosed_ts_type.get_dependent_types(type_alias_lookup, found_types)
        }
        None => vec![],
    }
}

fn parse_opt_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&String>) -> ActDataType {
    let type_params = ts_type_ref.type_params.clone();
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = *params.params[0].clone();
            let enclosed_rust_type = enclosed_ts_type.to_act_data_type(&None);
            match name {
                Some(name) => ActDataType::Option(ActOption::TypeAlias(ActOptionTypeAlias {
                    name: name.clone().clone(),
                    enclosed_type: Box::from(enclosed_rust_type),
                })),
                None => ActDataType::Option(ActOption::Literal(ActOptionLiteral {
                    enclosed_type: Box::from(enclosed_rust_type),
                })),
            }
        }
        None => todo!("Opt must have an enclosed type"),
    }
}

fn parse_func_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&String>) -> ActDataType {
    let inline_ident = generate_inline_ident_for_func(ts_type_ref);
    let type_ident = match name {
        Some(type_ident) => type_ident,
        None => &inline_ident,
    };
    let ts_type = match &ts_type_ref.type_params {
        Some(type_params) => match &*type_params.params[0] {
            TsType::TsFnOrConstructorType(fn_or_const) => match fn_or_const {
                swc_ecma_ast::TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type,
                swc_ecma_ast::TsFnOrConstructorType::TsConstructorType(_) => todo!(),
            },
            _ => todo!(),
        },
        None => todo!(),
    };
    let return_type = ts_fn_type::parse_func_return_type(ts_type);
    let param_types = ts_fn_type::parse_func_param_types(ts_type);
    let func_mode = funcs::get_func_mode(ts_type);
    let params = funcs::get_param_types(ts_type);
    let return_type_string = funcs::get_return_type(ts_type);

    let func_info = Func {
        is_inline: name.is_none(),
        name: type_ident.clone(),
        params: param_types,
        return_type: Box::from(return_type),
        mode: func_mode,
        param_strings: params,
        return_string: return_type_string,
    };
    let act_func = match name {
        Some(_) => ActFunc::TypeAlias(func_info),
        None => ActFunc::Literal(func_info),
    };
    ActDataType::Func(act_func)
}

fn generate_inline_ident_for_func(ts_type_ref: &TsTypeRef) -> String {
    let id = calculate_hash(ts_type_ref);
    format!("AzleInlineFunc{}", id)
}

fn parse_variant_type_ref(ts_type_ref: &TsTypeRef, name: &Option<&String>) -> ActDataType {
    let enclosed_type = &*ts_type_ref.type_params.as_ref().unwrap().params[0];
    let enclosed_type_lit = enclosed_type.as_ts_type_lit().unwrap();
    ActDataType::Variant(ts_type_lit::parse_ts_type_lit_as_enum(
        name,
        &enclosed_type_lit,
    ))
}
