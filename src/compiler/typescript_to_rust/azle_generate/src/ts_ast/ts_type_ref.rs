use super::{
    ts_type_lit::TsTypeLitHelperMethods, FunctionAndMethodTypeHelperMethods, GenerateInlineName,
    GetDependencies, GetName,
};
use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_funcs::Func, ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias, ActPrimitiveLit,
    },
    ActDataType, ToActDataType,
};
use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::{TsFnType, TsType, TsTypeAliasDecl, TsTypeRef};

pub trait TsTypeRefHelperMethods {
    fn to_func(&self, variant_name: &Option<&String>) -> ActDataType;
    fn to_option(&self, record_name: &Option<&String>) -> ActDataType;
    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType;
    fn get_enclosed_ts_type(&self) -> TsType;
}

impl GenerateInlineName for TsFnType {
    fn generate_inline_name(&self) -> String {
        format!("AzleInlineFunc{}", self.calculate_hash())
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
            "Opt" => self
                .get_enclosed_ts_type()
                .get_dependent_types(type_alias_lookup, found_types),
            "Func" => self
                .get_enclosed_ts_type()
                .get_dependent_types(type_alias_lookup, found_types),
            "Variant" => self
                .get_enclosed_ts_type()
                .get_dependent_types(type_alias_lookup, found_types),
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

impl GetName for TsTypeRef {
    fn get_name(&self) -> &str {
        &self.type_name.as_ident().unwrap().get_name()
    }
}

impl ToActDataType for TsTypeRef {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        match self.get_name() {
            "blob" => ActPrimitiveLit::Blob.to_act_data_type(alias_name),
            "float32" => ActPrimitiveLit::Float32.to_act_data_type(alias_name),
            "float64" => ActPrimitiveLit::Float64.to_act_data_type(alias_name),
            "int" => ActPrimitiveLit::Int.to_act_data_type(alias_name),
            "int8" => ActPrimitiveLit::Int8.to_act_data_type(alias_name),
            "int16" => ActPrimitiveLit::Int16.to_act_data_type(alias_name),
            "int32" => ActPrimitiveLit::Int32.to_act_data_type(alias_name),
            "int64" => ActPrimitiveLit::Int64.to_act_data_type(alias_name),
            "nat" => ActPrimitiveLit::Nat.to_act_data_type(alias_name),
            "nat8" => ActPrimitiveLit::Nat8.to_act_data_type(alias_name),
            "nat16" => ActPrimitiveLit::Nat16.to_act_data_type(alias_name),
            "nat32" => ActPrimitiveLit::Nat32.to_act_data_type(alias_name),
            "nat64" => ActPrimitiveLit::Nat64.to_act_data_type(alias_name),
            "Principal" => ActPrimitiveLit::Principal.to_act_data_type(alias_name),
            "empty" => ActPrimitiveLit::Empty.to_act_data_type(alias_name),
            "reserved" => ActPrimitiveLit::Reserved.to_act_data_type(alias_name),
            "Opt" => self.to_option(alias_name),
            "Func" => self.to_func(alias_name),
            "Variant" => self.to_variant(alias_name),
            _ => self.get_name().to_string().to_act_data_type(alias_name),
        }
    }
}

impl TsTypeRefHelperMethods for TsTypeRef {
    fn to_func(&self, func_name: &Option<&String>) -> ActDataType {
        let ts_fn_type = match self.get_enclosed_ts_type() {
            TsType::TsFnOrConstructorType(fn_or_const) => match fn_or_const {
                swc_ecma_ast::TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type,
                swc_ecma_ast::TsFnOrConstructorType::TsConstructorType(_) => {
                    todo!("Funcs must have a function as the enclosed type")
                }
            },
            _ => todo!("Funcs must have a function as the enclosed type"),
        };
        let return_type = match ts_fn_type.get_return_type() {
            Some(ts_type) => Some(ts_type.to_act_data_type(&None)),
            None => None,
        };
        let param_types: Vec<ActDataType> = ts_fn_type
            .get_param_types()
            .iter()
            .map(|param| param.to_act_data_type(&None))
            .collect();
        let func_mode = ts_fn_type.get_func_mode();

        ActDataType::Func(match func_name {
            Some(func_name) => ActFunc::TypeAlias(Func {
                name: func_name.clone().clone(),
                params: param_types,
                return_type: Box::from(return_type),
                mode: func_mode,
            }),
            None => ActFunc::Literal(Func {
                name: ts_fn_type.generate_inline_name(),
                params: param_types,
                return_type: Box::from(return_type),
                mode: func_mode,
            }),
        })
    }

    fn to_option(&self, alias_name: &Option<&String>) -> ActDataType {
        let enclosed_act_data_type = self.get_enclosed_ts_type().to_act_data_type(&None);
        match alias_name {
            Some(name) => ActDataType::Option(ActOption::TypeAlias(ActOptionTypeAlias {
                name: name.clone().clone(),
                enclosed_type: Box::from(enclosed_act_data_type),
            })),
            None => ActDataType::Option(ActOption::Literal(ActOptionLiteral {
                enclosed_type: Box::from(enclosed_act_data_type),
            })),
        }
    }

    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType {
        match self.get_enclosed_ts_type().as_ts_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => todo!("Variants must have a type literal as the enclosed type"),
        }
        .to_variant(variant_name)
    }

    fn get_enclosed_ts_type(&self) -> TsType {
        let type_params = self.type_params.clone();
        match type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    todo!("Funcs, Variants, and Options must have only one enclosed type")
                }
                *params.params[0].clone()
            }
            None => todo!("Funcs, Variants, and Options must have an enclosed type"),
        }
    }
}
