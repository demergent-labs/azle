use cdk_framework::{
    act::node::{
        data_type::{func::Mode, Func, Opt, Primitive, Record, TypeRef, Variant},
        DataType,
    },
    traits::ToIdent,
};
use quote::ToTokens;
use std::hash::Hasher;
use std::{collections::hash_map::DefaultHasher, hash::Hash};

use super::AzleTypeRef;
use crate::{
    generators::func,
    ts_ast::{
        ast_traits::GetTsType, azle_type::AzleType, AzleFnOrConstructorType,
        FunctionAndMethodTypeHelperMethods, GetName,
    },
};

impl AzleTypeRef<'_> {
    pub fn to_data_type(&self) -> DataType {
        match self.get_name() {
            "blob" => DataType::Primitive(Primitive::Blob),
            "float32" => DataType::Primitive(Primitive::Float32),
            "float64" => DataType::Primitive(Primitive::Float64),
            "int" => DataType::Primitive(Primitive::Int),
            "int8" => DataType::Primitive(Primitive::Int8),
            "int16" => DataType::Primitive(Primitive::Int16),
            "int32" => DataType::Primitive(Primitive::Int32),
            "int64" => DataType::Primitive(Primitive::Int64),
            "nat" => DataType::Primitive(Primitive::Nat),
            "nat8" => DataType::Primitive(Primitive::Nat8),
            "nat16" => DataType::Primitive(Primitive::Nat16),
            "nat32" => DataType::Primitive(Primitive::Nat32),
            "nat64" => DataType::Primitive(Primitive::Nat64),
            "Principal" => DataType::Primitive(Primitive::Principal),
            "empty" => DataType::Primitive(Primitive::Empty),
            "reserved" => DataType::Primitive(Primitive::Reserved),
            "Opt" => DataType::Opt(self.to_option()),
            "Func" => DataType::Func(self.to_func(None)),
            "Variant" => DataType::Variant(self.to_variant()),
            "Record" => DataType::Record(self.to_record()),
            _ => DataType::TypeRef(self.to_type_ref()),
        }
    }
}

impl AzleTypeRef<'_> {
    pub fn to_func(&self, name: Option<String>) -> Func {
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

        let name = match name {
            Some(name) => name,
            None => {
                let mut s = DefaultHasher::new();
                azle_fn_type.ts_fn_type.hash(&mut s);
                format!("AzleInlineFunc{}", format!("{}", s.finish()).to_string())
            }
        };

        let name_token_stream = name.to_identifier().to_token_stream();

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

        let to_vm_value = func::generate_into_vm_value_impl(&name_token_stream);
        let list_to_vm_value = func::generate_list_into_vm_value_impl(&name_token_stream);
        let from_vm_value = func::generate_from_vm_value_impl(&name_token_stream);
        let list_from_vm_value = func::generate_list_from_vm_value_impl(&name_token_stream);

        Func {
            name: Some(name),
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
