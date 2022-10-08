use super::{
    ts_type_lit::TsTypeLitHelperMethods, FunctionAndMethodTypeHelperMethods, GenerateInlineName,
    GetDependencies, GetName, GetString,
};
use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_funcs::{Func, FuncLiteral, FuncTypeAlias},
        ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias, ActPrimitiveLit,
        LiteralOrTypeAlias,
    },
    ActDataType, ToActDataType,
};
use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl, TsTypeRef};

pub trait TsTypeRefHelperMethods {
    fn to_func(&self, variant_name: &Option<&String>) -> ActDataType;
    fn to_option(&self, record_name: &Option<&String>) -> ActDataType;
    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType;
    fn get_enclosed_ts_type(&self) -> TsType;
}

trait TsTypeRefErrors {
    fn generate_func_wrong_number_of_params_error(&self) -> String;
    fn generate_variant_wrong_number_of_params_error(&self) -> String;
    fn generate_option_wrong_number_of_params_error(&self) -> String;
    fn generate_variant_wrong_enclosed_type_error(&self) -> String;
    fn generate_wrong_number_of_params_error(&self) -> String;
    fn generate_func_wrong_enclosed_type_error(&self) -> String;
}

trait TsTypeRefPrivateMethods {
    fn get_enclosed_ts_types(&self) -> Vec<TsType>;
}

impl GetDependencies for TsTypeRef {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
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
                    return HashSet::new();
                }
                match type_alias_lookup.clone().get(&name) {
                    Some(decl) => {
                        let new_type: HashSet<String> =
                            HashSet::from_iter(vec![name].iter().cloned());
                        let found_types: HashSet<String> =
                            found_types.clone().union(&new_type).cloned().collect();
                        // When finding a new type return it and all of it's dependents
                        found_types
                            .union(&decl.get_dependent_types(type_alias_lookup, &found_types))
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

impl GetString for TsTypeRef {
    fn get_string(&self) -> String {
        let enclosed_types = if self.get_enclosed_ts_types().len() == 0 {
            String::new()
        } else {
            format!(
                "<{}>",
                self.get_enclosed_ts_types()
                    .iter()
                    .fold(String::new(), |acc, enclosed_type| {
                        format!("{} {},", acc, enclosed_type.get_string())
                    })
            )
        };
        format!("{}{}", self.type_name.get_name(), enclosed_types)
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
                    panic!("{}", self.generate_func_wrong_enclosed_type_error())
                }
            },
            _ => panic!("{}", self.generate_func_wrong_enclosed_type_error()),
        };
        eprintln!("Start");
        let return_type = match ts_fn_type.get_return_type() {
            Some(ts_type) => Some(ts_type.to_act_data_type(&None)),
            None => None,
        };
        eprintln!("End");
        let param_types: Vec<ActDataType> = ts_fn_type
            .get_param_types()
            .iter()
            .map(|param| param.to_act_data_type(&None))
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

    fn to_option(&self, alias_name: &Option<&String>) -> ActDataType {
        let enclosed_act_data_type = self.get_enclosed_ts_type().to_act_data_type(&None);
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

    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType {
        match self.get_enclosed_ts_type().as_ts_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.generate_variant_wrong_enclosed_type_error()),
        }
        .to_variant(variant_name)
    }

    fn get_enclosed_ts_type(&self) -> TsType {
        match &self.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.generate_wrong_number_of_params_error())
                }
                *params.params[0].clone()
            }
            None => panic!("{}", self.generate_wrong_number_of_params_error()),
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
    fn generate_wrong_number_of_params_error(&self) -> String {
        let specific_help = match self.get_name() {
            "Variant" => self.generate_variant_wrong_number_of_params_error(),
            "Func" => self.generate_func_wrong_number_of_params_error(),
            "Option" => self.generate_option_wrong_number_of_params_error(),
            _ => String::new(),
        };
        format!(
            "\n{} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type\n{}",
            self.get_string(),
            specific_help
        )
    }

    fn generate_func_wrong_number_of_params_error(&self) -> String {
        String::new()
    }

    fn generate_variant_wrong_number_of_params_error(&self) -> String {
        let enclosed_types: String = if self.get_enclosed_ts_types().len() == 0 {
            "    variant_name: variant_type\n".to_string()
        } else {
            self.get_enclosed_ts_types().iter().enumerate().fold(
                String::new(),
                |acc, (index, enclosed_type)| {
                    format!(
                        "{}    variant_name{}: {},\n",
                        acc,
                        index,
                        enclosed_type.get_string()
                    )
                },
            )
        };

        let example_variant = format!("\n{}<\n{{\n{}}}>\n", self.get_string(), enclosed_types);
        format!("A Variant must only have one enclosed type. If you need multiple variants, put them all in type literal like this:\n{}", example_variant)
    }

    fn generate_variant_wrong_enclosed_type_error(&self) -> String {
        let enclosed_types: String = self.get_enclosed_ts_types().iter().enumerate().fold(
            String::new(),
            |acc, (index, enclosed_type)| {
                format!(
                    "{}    variant_name{}: {},\n",
                    acc,
                    index,
                    enclosed_type.get_string()
                )
            },
        );
        let example_variant = format!("\n{}<\n{{\n{}}}>\n", self.get_string(), enclosed_types);
        format!("Variants must have a type literal as the enclosed type. Variants should be formed like this:\n{}", example_variant)
    }

    fn generate_func_wrong_enclosed_type_error(&self) -> String {
        format!("Funcs must have a function as the enclosed type")
    }

    fn generate_option_wrong_number_of_params_error(&self) -> String {
        String::new()
    }
}
