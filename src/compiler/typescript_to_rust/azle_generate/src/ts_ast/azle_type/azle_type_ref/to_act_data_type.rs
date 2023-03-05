use cdk_framework::{
    act::node::{
        data_type::{func::Mode, Func, Opt, Primitive, Record, TypeRef, Variant},
        DataType,
    },
    traits::{ToDataType, ToIdent},
};
use quote::ToTokens;

use super::AzleTypeRef;
use crate::{
    generators::func,
    ts_ast::{
        ast_traits::GetTsType, azle_type::AzleType, AzleFnOrConstructorType,
        FunctionAndMethodTypeHelperMethods, GetName,
    },
};

impl ToDataType for AzleTypeRef<'_> {
    fn to_data_type(&self) -> DataType {
        match self.get_name() {
            "blob" => Primitive::Blob.to_data_type(),
            "float32" => Primitive::Float32.to_data_type(),
            "float64" => Primitive::Float64.to_data_type(),
            "int" => Primitive::Int.to_data_type(),
            "int8" => Primitive::Int8.to_data_type(),
            "int16" => Primitive::Int16.to_data_type(),
            "int32" => Primitive::Int32.to_data_type(),
            "int64" => Primitive::Int64.to_data_type(),
            "nat" => Primitive::Nat.to_data_type(),
            "nat8" => Primitive::Nat8.to_data_type(),
            "nat16" => Primitive::Nat16.to_data_type(),
            "nat32" => Primitive::Nat32.to_data_type(),
            "nat64" => Primitive::Nat64.to_data_type(),
            "Principal" => Primitive::Principal.to_data_type(),
            "empty" => Primitive::Empty.to_data_type(),
            "reserved" => Primitive::Reserved.to_data_type(),
            "Opt" => DataType::Opt(self.to_option()),
            "Func" => DataType::Func(self.to_func()),
            "Variant" => DataType::Variant(self.to_variant()),
            "Record" => DataType::Record(self.to_record()),
            _ => DataType::TypeRef(self.to_type_ref()),
        }
    }
}

impl AzleTypeRef<'_> {
    pub fn to_func(&self) -> Func {
        let request_type_type_ref = match self.get_enclosed_azle_type() {
            AzleType::AzleTypeRef(azle_type_ref) => azle_type_ref,
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let mode = match request_type_type_ref.get_name() {
            "Query" => Mode::Query,
            "Update" => Mode::Update,
            "Oneway" => Mode::Oneway,
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let azle_fn_type = match request_type_type_ref.get_enclosed_azle_type() {
            AzleType::AzleFnOrConstructorType(fn_or_const) => match fn_or_const {
                AzleFnOrConstructorType::AzleFnType(ts_fn_type) => ts_fn_type,
            },
            _ => panic!("{}", self.wrong_enclosed_type_error()),
        };

        let params: Vec<DataType> = azle_fn_type
            .get_param_types()
            .iter()
            .map(|param| {
                let azle_param = AzleType::from_ts_type(param.clone(), self.source_map);
                azle_param.to_data_type()
            })
            .collect();

        let return_type = AzleType::from_ts_type(
            azle_fn_type.get_ts_type_ann().get_ts_type(),
            self.source_map,
        )
        .to_data_type();

        let type_alias_name = "TODOChangeToNewFuncs"
            .to_string()
            .to_identifier()
            .to_token_stream();
        let to_vm_value = func::generate_into_vm_value_impl(&type_alias_name);
        let list_to_vm_value = func::generate_list_into_vm_value_impl(&type_alias_name);
        let from_vm_value = func::generate_from_vm_value_impl(&type_alias_name);
        let list_from_vm_value = func::generate_list_from_vm_value_impl(&type_alias_name);

        Func {
            name: None,
            params,
            return_type: Box::from(return_type),
            mode,
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        }
    }

    fn to_option(&self) -> Opt {
        let enclosed_act_data_type = self.get_enclosed_azle_type().to_data_type();
        Opt {
            enclosed_type: Box::from(enclosed_act_data_type),
        }
    }

    pub fn to_variant(&self) -> Variant {
        match self.get_enclosed_azle_type().as_azle_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_variant()
    }

    pub fn to_record(&self) -> Record {
        match self.get_enclosed_azle_type().as_azle_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_record()
    }

    fn to_type_ref(&self) -> TypeRef {
        TypeRef {
            name: self.get_name().to_string(),
        }
    }
}
