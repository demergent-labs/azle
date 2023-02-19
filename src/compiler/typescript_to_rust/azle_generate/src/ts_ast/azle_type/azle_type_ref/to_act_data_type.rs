use cdk_framework::{
    nodes::data_type_nodes::{
        act_funcs::{Func, FuncLiteral, FuncTypeAlias},
        ActFunc, ActOption, ActOptionLiteral, ActOptionTypeAlias, ActPrimitiveLit,
        LiteralOrTypeAlias, ToIdent,
    },
    ActDataType, ToActDataType,
};
use quote::ToTokens;

use super::AzleTypeRef;
use crate::{
    generators::func,
    ts_ast::{
        ast_traits::GetTsType, azle_type::AzleType, AzleFnOrConstructorType,
        FunctionAndMethodTypeHelperMethods, GenerateInlineName, GetName,
    },
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
            "Record" => self.to_record(alias_name),
            _ => self.get_name().to_string().to_act_data_type(alias_name),
        }
    }
}

impl AzleTypeRef<'_> {
    fn to_func(&self, func_name_option: &Option<&String>) -> ActDataType {
        let request_type_type_ref = match self.get_enclosed_azle_type() {
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref,
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let mode = request_type_type_ref.get_name();
        if !(mode == "Query" || mode == "Update" || mode == "Oneway") {
            panic!("{}", self.wrong_enclosed_type_error())
        };
        let azle_fn_type = match request_type_type_ref.get_enclosed_azle_type() {
            AzleType::AzleFnOrConstructorType(fn_or_const) => match fn_or_const {
                AzleFnOrConstructorType::AzleFnType(ts_fn_type) => ts_fn_type,
            },
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let return_type = AzleType::from_ts_type(
            azle_fn_type.get_ts_type_ann().get_ts_type(),
            self.source_map,
        )
        .to_act_data_type(&None);
        let param_types: Vec<ActDataType> = azle_fn_type
            .get_param_types()
            .iter()
            .map(|param| {
                let azle_param = AzleType::from_ts_type(param.clone(), self.source_map);
                azle_param.to_act_data_type(&None)
            })
            .collect();

        let func_name = if let Some(func_name) = func_name_option {
            (**func_name).clone()
        } else {
            azle_fn_type.ts_fn_type.generate_inline_name()
        };

        let type_alias_name = func_name.to_identifier().to_token_stream();
        let to_vm_value = func::generate_into_vm_value_impl(&type_alias_name);
        let list_to_vm_value = func::generate_list_into_vm_value_impl(&type_alias_name);
        let from_vm_value = func::generate_from_vm_value_impl(&type_alias_name);
        let list_from_vm_value = func::generate_list_from_vm_value_impl(&type_alias_name);

        let func = Func {
            name: func_name,
            params: param_types,
            return_type: Box::from(Some(return_type)),
            mode: mode.to_string(),
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        };

        ActDataType::Func(match func_name_option {
            Some(_) => ActFunc {
                act_type: LiteralOrTypeAlias::TypeAlias(FuncTypeAlias { func }),
            },
            None => ActFunc {
                act_type: LiteralOrTypeAlias::Literal(FuncLiteral { func }),
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

    fn to_record(&self, variant_name: &Option<&String>) -> ActDataType {
        match self.get_enclosed_azle_type().as_azle_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_record(variant_name)
    }
}
