use super::{
    ts_type_lit::TsTypeLitHelperMethods, AzleTypeAliasDecl, FunctionAndMethodTypeHelperMethods,
    GenerateInlineName, GetDependencies, GetName,
};
use crate::{
    cdk_act::{
        nodes::data_type_nodes::{
            act_funcs::{Func, FuncLiteral, FuncTypeAlias},
            ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias, ActPrimitiveLit,
            LiteralOrTypeAlias,
        },
        ActDataType, ToActDataType,
    },
    errors::ErrorWithExampleDiff,
};
use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_common::SourceMap;
use swc_ecma_ast::{TsFnType, TsType, TsTypeRef};

pub trait TsTypeRefHelperMethods {
    fn get_enclosed_ts_type(&self) -> TsType;
    fn to_func(&self, variant_name: &Option<&String>, source_map: &SourceMap) -> ActDataType;
    fn to_option(&self, record_name: &Option<&String>, source_map: &SourceMap) -> ActDataType;
    fn to_variant(&self, variant_name: &Option<&String>, source_map: &SourceMap) -> ActDataType;
}

impl GenerateInlineName for TsFnType {
    fn generate_inline_name(&self) -> String {
        format!("AzleInlineFunc{}", self.calculate_hash())
    }
}

impl GetDependencies for TsTypeRef {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        match self.get_name() {
            "blob" => HashSet::new(),
            "float32" => HashSet::new(),
            "float64" => HashSet::new(),
            "int" => HashSet::new(),
            "int8" => HashSet::new(),
            "int16" => HashSet::new(),
            "int32" => HashSet::new(),
            "int64" => HashSet::new(),
            "nat" => HashSet::new(),
            "nat8" => HashSet::new(),
            "nat16" => HashSet::new(),
            "nat32" => HashSet::new(),
            "nat64" => HashSet::new(),
            "Principal" => HashSet::new(),
            "empty" => HashSet::new(),
            "reserved" => HashSet::new(),
            "Opt" => self
                .get_enclosed_ts_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            "Func" => self
                .get_enclosed_ts_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            "Variant" => self
                .get_enclosed_ts_type()
                .get_dependent_types(type_alias_lookup, found_type_names),
            _ => {
                let name = self.get_name().to_string();
                if found_type_names.contains(&name) {
                    return HashSet::new();
                }
                match type_alias_lookup.clone().get(&name) {
                    Some(decl) => {
                        let new_type: HashSet<String> =
                            HashSet::from_iter(vec![name].iter().cloned());
                        let found_type_names: HashSet<String> =
                            found_type_names.clone().union(&new_type).cloned().collect();
                        // When finding a new type return it and all of it's dependents
                        found_type_names
                            .union(&decl.get_dependent_types(type_alias_lookup, &found_type_names))
                            .cloned()
                            .collect()
                    }
                    None => HashSet::new(),
                }
            }
        }
    }
}

impl GetName for TsTypeRef {
    fn get_name(&self) -> &str {
        match &self.type_name {
            swc_ecma_ast::TsEntityName::TsQualifiedName(_) => {
                let error_message = ErrorWithExampleDiff {
                    error: "Namespace-qualified types are not currently supported",
                    help: "Either declare the type locally or import it without a wildcard",
                    remove: "Namespace.MyType",
                    add: "MyType",
                };
                panic!("{}", error_message.to_string())
            }
            swc_ecma_ast::TsEntityName::Ident(ident) => ident.get_name(),
        }
    }
}

impl ToActDataType for TsTypeRef {
    fn to_act_data_type(
        &self,
        alias_name: &Option<&String>,
        source_map: &SourceMap,
    ) -> crate::cdk_act::ActDataType {
        match self.get_name() {
            "blob" => ActPrimitiveLit::Blob.to_act_data_type(alias_name, source_map),
            "float32" => ActPrimitiveLit::Float32.to_act_data_type(alias_name, source_map),
            "float64" => ActPrimitiveLit::Float64.to_act_data_type(alias_name, source_map),
            "int" => ActPrimitiveLit::Int.to_act_data_type(alias_name, source_map),
            "int8" => ActPrimitiveLit::Int8.to_act_data_type(alias_name, source_map),
            "int16" => ActPrimitiveLit::Int16.to_act_data_type(alias_name, source_map),
            "int32" => ActPrimitiveLit::Int32.to_act_data_type(alias_name, source_map),
            "int64" => ActPrimitiveLit::Int64.to_act_data_type(alias_name, source_map),
            "nat" => ActPrimitiveLit::Nat.to_act_data_type(alias_name, source_map),
            "nat8" => ActPrimitiveLit::Nat8.to_act_data_type(alias_name, source_map),
            "nat16" => ActPrimitiveLit::Nat16.to_act_data_type(alias_name, source_map),
            "nat32" => ActPrimitiveLit::Nat32.to_act_data_type(alias_name, source_map),
            "nat64" => ActPrimitiveLit::Nat64.to_act_data_type(alias_name, source_map),
            "Principal" => ActPrimitiveLit::Principal.to_act_data_type(alias_name, source_map),
            "empty" => ActPrimitiveLit::Empty.to_act_data_type(alias_name, source_map),
            "reserved" => ActPrimitiveLit::Reserved.to_act_data_type(alias_name, source_map),
            "Opt" => self.to_option(alias_name, source_map),
            "Func" => self.to_func(alias_name, source_map),
            "Variant" => self.to_variant(alias_name, source_map),
            _ => self
                .get_name()
                .to_string()
                .to_act_data_type(alias_name, source_map),
        }
    }
}

impl TsTypeRefHelperMethods for TsTypeRef {
    fn to_func(&self, func_name: &Option<&String>, source_map: &SourceMap) -> ActDataType {
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
            Some(ts_type) => Some(ts_type.to_act_data_type(&None, &source_map)),
            None => None,
        };
        let param_types: Vec<ActDataType> = ts_fn_type
            .get_param_types()
            .iter()
            .map(|param| param.to_act_data_type(&None, &source_map))
            .collect();
        let func_mode = ts_fn_type.get_func_mode();

        ActDataType::Func(match func_name {
            Some(func_name) => ActFunc {
                act_type: LiteralOrTypeAlias::TypeAlias(FuncTypeAlias {
                    func: Func {
                        name: func_name.clone().clone(),
                        params: param_types,
                        return_type: Box::from(return_type),
                        mode: func_mode,
                    },
                }),
            },
            None => ActFunc {
                act_type: LiteralOrTypeAlias::Literal(FuncLiteral {
                    func: Func {
                        name: ts_fn_type.generate_inline_name(),
                        params: param_types,
                        return_type: Box::from(return_type),
                        mode: func_mode,
                    },
                }),
            },
        })
    }

    fn to_option(&self, alias_name: &Option<&String>, source_map: &SourceMap) -> ActDataType {
        let enclosed_act_data_type = self
            .get_enclosed_ts_type()
            .to_act_data_type(&None, source_map);
        match alias_name {
            Some(name) => ActDataType::Option(ActOption {
                act_type: LiteralOrTypeAlias::TypeAlias(ActOptionTypeAlias {
                    name: name.clone().clone(),
                    enclosed_type: Box::from(enclosed_act_data_type),
                }),
            }),
            None => ActDataType::Option(ActOption {
                act_type: LiteralOrTypeAlias::Literal(ActOptionLiteral {
                    enclosed_type: Box::from(enclosed_act_data_type),
                }),
            }),
        }
    }

    fn to_variant(&self, variant_name: &Option<&String>, source_map: &SourceMap) -> ActDataType {
        match self.get_enclosed_ts_type().as_ts_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => todo!("Variants must have a type literal as the enclosed type"),
        }
        .to_variant(variant_name, source_map)
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
