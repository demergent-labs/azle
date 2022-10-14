use super::{
    ast_traits::ToDisplayString, source_map::GetSourceFileInfo,
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
use swc_ecma_ast::{TsType, TsTypeRef};

pub trait TsTypeRefHelperMethods {
    fn get_enclosed_ts_type(&self) -> TsType;
    fn to_func(&self, variant_name: &Option<&String>, source_map: &SourceMap) -> ActDataType;
    fn to_option(&self, record_name: &Option<&String>, source_map: &SourceMap) -> ActDataType;
    fn to_variant(&self, variant_name: &Option<&String>, source_map: &SourceMap) -> ActDataType;
}

trait TsTypeRefErrors {
    fn func_wrong_number_of_params_error(&self) -> String;
    fn func_wrong_enclosed_type_error(&self) -> String;
    fn option_wrong_number_of_params_error(&self) -> String;
    fn type_ref_wrong_number_of_params_error(&self) -> String;
    fn variant_wrong_number_of_params_error(&self) -> String;
    fn variant_wrong_enclosed_type_error(&self, source_map: &SourceMap) -> String;
    fn generate_example_variant(&self) -> String;
}

// TODO I think this will eventually be the only one on here and it will be public
pub trait TsTypeRefPrivateMethods {
    fn get_enclosed_ts_types(&self) -> Vec<TsType>;
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
        self.type_name.get_name()
    }
}

impl ToDisplayString for TsTypeRef {
    fn to_display_string(&self) -> String {
        let enclosed_types = if self.get_enclosed_ts_types().len() == 0 {
            String::new()
        } else {
            format!(
                "<{}>",
                self.get_enclosed_ts_types()
                    .iter()
                    .fold(String::new(), |acc, enclosed_type| {
                        format!("{} {},", acc, enclosed_type.to_display_string())
                    })
            )
        };
        format!("{}{}", self.type_name.get_name(), enclosed_types)
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
                    panic!("{}", self.func_wrong_enclosed_type_error())
                }
            },
            _ => panic!("{}", self.func_wrong_enclosed_type_error()),
        };
        eprintln!("Start");
        let return_type = match ts_fn_type.get_return_type() {
            Some(ts_type) => Some(ts_type.to_act_data_type(&None, &source_map)),
            None => None,
        };
        eprintln!("End");
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
            None => panic!("{}", self.variant_wrong_enclosed_type_error(source_map)),
        }
        .to_variant(variant_name, source_map)
    }

    fn get_enclosed_ts_type(&self) -> TsType {
        match &self.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.type_ref_wrong_number_of_params_error())
                }
                *params.params[0].clone()
            }
            None => panic!("{}", self.type_ref_wrong_number_of_params_error()),
        }
    }
}

impl TsTypeRefPrivateMethods for TsTypeRef {
    fn get_enclosed_ts_types(&self) -> Vec<TsType> {
        match &self.type_params {
            Some(params) => params.params.iter().map(|param| *param.clone()).collect(),
            None => vec![],
        }
    }
}

impl TsTypeRefErrors for TsTypeRef {
    fn type_ref_wrong_number_of_params_error(&self) -> String {
        match self.get_name() {
            "Variant" => self.variant_wrong_number_of_params_error(),
            "Func" => self.func_wrong_number_of_params_error(),
            "Option" => self.option_wrong_number_of_params_error(),
            _ => format!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type", self.to_display_string()),
        }
    }

    fn func_wrong_number_of_params_error(&self) -> String {
        let enclosed_types: String = if self.get_enclosed_ts_types().len() == 0 {
            "param_name: param_type".to_string()
        } else {
            self.get_enclosed_ts_types().iter().enumerate().fold(
                String::new(),
                |acc, (index, enclosed_type)| {
                    format!(
                        "{}param_name{}: {}, ",
                        acc,
                        index,
                        enclosed_type.to_display_string()
                    )
                },
            )
        };

        let func_example = format!("For example: Func<({enclosed_types}) => Update<Type>>");
        format!("A Func must have exactly one enclosed type. And that type must be a function type:\n{func_example}")
    }

    fn variant_wrong_number_of_params_error(&self) -> String {
        // let well_formed = source_map.get_well_formed_line(self.span);
        let example = self.generate_example_variant();
        // let example_variant = format!("\n{}{}\n", well_formed, example);
        // let location = source_map.get_line_info(self.span);
        // let highlighted_line = source_map.generate_highlighted_line(self.span);
        // format!("A Variant must have exactly one enclosed type. If you need multiple variants, put them all in type literal like this:\n{}", example_variant)
        example
    }

    fn generate_example_variant(&self) -> String {
        let enclosed_types: String = self.get_enclosed_ts_types().iter().enumerate().fold(
            String::new(),
            |acc, (index, enclosed_type)| {
                format!(
                    "{}    variant_name{}: {},\n",
                    acc,
                    index,
                    enclosed_type.to_display_string()
                )
            },
        );
        format!("{}<\n{{\n{}}}>;", self.get_name(), enclosed_types)
    }

    fn variant_wrong_enclosed_type_error(&self, source_map: &SourceMap) -> String {
        let well_formed = source_map.get_well_formed_line(self.span);
        let example = self.generate_example_variant();
        let example_variant = format!("\n{}{}\n", well_formed, example);
        let location = source_map.get_line_info(self.span);
        let highlighted_line = source_map.generate_highlighted_line(self.span);
        format!("\n\nInvalid variant at {}\n{}\nVariants must have a type literal as the enclosed type. Try this:\n{}\n", location, highlighted_line, example_variant)
    }

    fn func_wrong_enclosed_type_error(&self) -> String {
        format!("Funcs must have a function as the enclosed type")
    }

    fn option_wrong_number_of_params_error(&self) -> String {
        String::new()
    }
}
