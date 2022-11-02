use super::AzleTypeRef;
use crate::ts_ast::{
    azle_type::AzleType, AzleFnOrConstructorType, FunctionAndMethodTypeHelperMethods,
    GenerateInlineName, GetName,
};
use cdk_framework::{
    nodes::data_type_nodes::{
        act_funcs::{Func, FuncLiteral, FuncTypeAlias},
        ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias, ActPrimitiveLit,
        LiteralOrTypeAlias,
    },
    ActDataType, ToActDataType,
};

impl ToActDataType for AzleTypeRef<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> cdk_framework::ActDataType {
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
        let azle_fn_type = match self.get_enclosed_azle_type() {
            AzleType::AzleFnOrConstructorType(fn_or_const) => match fn_or_const {
                AzleFnOrConstructorType::AzleFnType(ts_fn_type) => ts_fn_type,
            },
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };
        let return_type = match azle_fn_type.get_return_type() {
            Some(ts_type) => {
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                Some(azle_type.to_act_data_type(&None))
            }
            None => None,
        };
        let param_types: Vec<ActDataType> = azle_fn_type
            .get_param_types()
            .iter()
            .map(|param| {
                let azle_param = AzleType::from_ts_type(param.clone(), self.source_map);
                azle_param.to_act_data_type(&None)
            })
            .collect();
        let func_mode = azle_fn_type.get_func_mode();

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
                        name: azle_fn_type.ts_fn_type.generate_inline_name(),
                        params: param_types,
                        return_type: Box::from(return_type),
                        mode: func_mode,
                    },
                }),
            },
        })
    }

    fn to_option(&self, alias_name: &Option<&String>) -> ActDataType {
        let enclosed_act_data_type = self.get_enclosed_azle_type().to_act_data_type(&None);
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
        match self.get_enclosed_azle_type().as_azle_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_variant(variant_name)
    }
}
