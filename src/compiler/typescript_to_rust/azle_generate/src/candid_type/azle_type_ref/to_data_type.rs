use cdk_framework::act::node::{
    candid::{Opt, Primitive, TypeRef},
    CandidType,
};

use super::AzleTypeRef;
use crate::ts_ast::traits::GetName;

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
    fn to_option(&self) -> Opt {
        let enclosed_act_data_type = self.get_enclosed_azle_type().to_data_type();
        Opt {
            enclosed_type: Box::from(enclosed_act_data_type),
        }
    }

    fn to_type_ref(&self) -> TypeRef {
        TypeRef {
            name: self.get_name().to_string(),
        }
    }
}
