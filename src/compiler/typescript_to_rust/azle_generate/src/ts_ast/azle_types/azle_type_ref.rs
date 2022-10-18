use swc_common::SourceMap;
use swc_ecma_ast::{TsType, TsTypeRef};

use crate::{
    cdk_act::{
        nodes::data_type_nodes::{
            act_funcs::{Func, FuncLiteral, FuncTypeAlias},
            ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias, ActPrimitiveLit,
            LiteralOrTypeAlias,
        },
        ActDataType, ToActDataType,
    },
    ts_ast::{
        source_map::GetSourceFileInfo, ts_type_lit::TsTypeLitHelperMethods,
        ts_type_ref::TsTypeRefPrivateMethods, FunctionAndMethodTypeHelperMethods,
        GenerateInlineName, GetDependencies, GetName, GetSourceText,
    },
};

#[derive(Clone)]
pub struct AzleTypeRef<'a> {
    pub ts_type_ref: TsTypeRef,
    pub source_map: &'a SourceMap,
}

impl GetDependencies for AzleTypeRef<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_type_ref
            .get_dependent_types(type_alias_lookup, found_type_names)
    }
}

impl GetName for AzleTypeRef<'_> {
    fn get_name(&self) -> &str {
        self.ts_type_ref.get_name()
    }
}

impl GetSourceText for AzleTypeRef<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_text(self.ts_type_ref.span)
    }
}

impl ToActDataType for AzleTypeRef<'_> {
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

impl AzleTypeRef<'_> {
    fn to_func(&self, func_name: &Option<&String>) -> ActDataType {
        let ts_fn_type = match self.get_enclosed_ts_type() {
            TsType::TsFnOrConstructorType(fn_or_const) => match fn_or_const {
                swc_ecma_ast::TsFnOrConstructorType::TsFnType(ts_fn_type) => ts_fn_type,
                swc_ecma_ast::TsFnOrConstructorType::TsConstructorType(_) => {
                    panic!("{}", self.func_wrong_enclosed_type_error())
                }
            },
            _ => panic!("{}", self.func_wrong_enclosed_type_error()),
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
            None => panic!("{}", self.variant_wrong_enclosed_type_error()),
        }
        .to_variant(variant_name)
    }

    fn get_enclosed_ts_type(&self) -> TsType {
        match &self.ts_type_ref.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.type_ref_wrong_number_of_params_error())
                }
                *params.params[0].clone()
            }
            None => panic!("{}", self.type_ref_wrong_number_of_params_error()),
        }
    }

    fn type_ref_wrong_number_of_params_error(&self) -> String {
        match self.get_name() {
            "Variant" => self.variant_wrong_number_of_params_error(),
            "Func" => self.func_wrong_number_of_params_error(),
            "Option" => self.option_wrong_number_of_params_error(),
            _ => format!("Unreachable: {} is not a valid type.\nFuncs, Variants, and Options must have exactly one enclosed type", self.get_source_text()),
        }
    }

    fn func_wrong_number_of_params_error(&self) -> String {
        let enclosed_types: String = if self.ts_type_ref.get_enclosed_ts_types().len() == 0 {
            "param_name: param_type".to_string()
        } else {
            self.ts_type_ref
                .get_enclosed_ts_types()
                .iter()
                .enumerate()
                .fold(String::new(), |acc, (index, enclosed_type)| {
                    format!(
                        "{}param_name{}: {}, ",
                        acc,
                        index,
                        enclosed_type.get_source_text()
                    )
                })
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
        let enclosed_types: String = self
            .ts_type_ref
            .get_enclosed_ts_types()
            .iter()
            .enumerate()
            .fold(String::new(), |acc, (index, enclosed_type)| {
                format!(
                    "{}    variant_name{}: {},\n",
                    acc,
                    index,
                    enclosed_type.get_source_text()
                )
            });
        format!("{}<\n{{\n{}}}>;", self.get_name(), enclosed_types)
    }

    fn variant_wrong_enclosed_type_error(&self) -> String {
        let well_formed = self.source_map.get_well_formed_line(self.ts_type_ref.span);
        let example = self.generate_example_variant();
        let example_variant = format!("\n{}{}\n", well_formed, example);
        let location = self.source_map.get_origin(self.ts_type_ref.span);
        let highlighted_line = self
            .source_map
            .generate_highlighted_line(self.ts_type_ref.span);
        format!("Invalid variant at {}\n{}\nVariants must have a type literal as the enclosed type. Try this:\n{}", location, highlighted_line, example_variant)
    }

    fn func_wrong_enclosed_type_error(&self) -> String {
        format!("Funcs must have a function as the enclosed type")
    }

    fn option_wrong_number_of_params_error(&self) -> String {
        String::new()
    }
}
