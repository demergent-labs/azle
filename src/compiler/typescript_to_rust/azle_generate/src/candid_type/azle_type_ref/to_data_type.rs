use cdk_framework::act::node::{
    candid::{Func, Opt, Primitive, Record, TypeRef, Variant},
    node_parts::mode::Mode,
    CandidType,
};

use super::AzleTypeRef;
use crate::{
    candid_type::func,
    ts_ast::{
        azle_type::AzleType, traits::GetTsType, AzleFnOrConstructorType,
        FunctionAndMethodTypeHelperMethods, GetName,
    },
};

impl AzleTypeRef<'_> {
    pub fn to_data_type(&self) -> CandidType {
        match self.get_name() {
            "blob" => CandidType::Primitive(Primitive::Blob),
            "float32" => CandidType::Primitive(Primitive::Float32),
            "float64" => CandidType::Primitive(Primitive::Float64),
            "int" => CandidType::Primitive(Primitive::Int),
            "int8" => CandidType::Primitive(Primitive::Int8),
            "int16" => CandidType::Primitive(Primitive::Int16),
            "int32" => CandidType::Primitive(Primitive::Int32),
            "int64" => CandidType::Primitive(Primitive::Int64),
            "nat" => CandidType::Primitive(Primitive::Nat),
            "nat8" => CandidType::Primitive(Primitive::Nat8),
            "nat16" => CandidType::Primitive(Primitive::Nat16),
            "nat32" => CandidType::Primitive(Primitive::Nat32),
            "nat64" => CandidType::Primitive(Primitive::Nat64),
            "Principal" => CandidType::Primitive(Primitive::Principal),
            "empty" => CandidType::Primitive(Primitive::Empty),
            "reserved" => CandidType::Primitive(Primitive::Reserved),
            "text" => CandidType::Primitive(Primitive::String),
            "Opt" => CandidType::Opt(self.to_option()),
            "Func" => CandidType::Func(self.to_func(None)),
            "Variant" => CandidType::Variant(self.to_variant()),
            "Record" => CandidType::Record(self.to_record()),
            _ => CandidType::TypeRef(self.to_type_ref()),
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

        let params: Vec<CandidType> = azle_fn_type
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

        let to_vm_value = |name: String| func::generate_into_vm_value_impl(name);
        let list_to_vm_value = |name: String| func::generate_list_into_vm_value_impl(name);
        let from_vm_value = |name: String| func::generate_from_vm_value_impl(name);
        let list_from_vm_value = |name: String| func::generate_list_from_vm_value_impl(name);

        Func::new(
            name,
            params,
            return_type,
            mode,
            to_vm_value,
            list_to_vm_value,
            from_vm_value,
            list_from_vm_value,
        )
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
