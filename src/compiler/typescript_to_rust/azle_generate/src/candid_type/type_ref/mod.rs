use cdk_framework::act::node::{
    candid::{Primitive, TypeArg, TypeRef},
    CandidType,
};
use std::ops::Deref;
use swc_common::Span;
use swc_ecma_ast::{TsEntityName, TsType, TsTypeRef};

use crate::{
    traits::{GetName, GetSpan},
    ts_ast::SourceMapped,
};

mod errors;

impl SourceMapped<'_, TsTypeRef> {
    pub fn get_ts_type(&self) -> SourceMapped<TsType> {
        match &self.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    panic!("{}", self.wrong_number_of_params_error())
                }
                let inner_type = params.params[0].deref();
                SourceMapped::new(inner_type, self.source_map)
            }
            None => panic!("{}", self.wrong_number_of_params_error()),
        }
    }

    pub fn to_type_ref(&self) -> TypeRef {
        let type_arguments = if let Some(type_params) = &self.type_params {
            type_params
                .params
                .iter()
                .map(|param| {
                    TypeArg(SourceMapped::new(param.deref(), self.source_map).to_candid_type())
                })
                .collect()
        } else {
            vec![]
        };

        let name_string = self.get_name().to_string();

        TypeRef {
            name: if name_string == "Result" {
                "_AzleResult".to_string()
            } else {
                name_string
            },
            type_arguments,
        }
    }

    pub fn to_candid_type(&self) -> CandidType {
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
            "Record" => CandidType::Record(self.to_record()),
            "Tuple" => CandidType::Tuple(self.to_tuple()),
            "Vec" => CandidType::Array(self.to_vec()),
            "Variant" => CandidType::Variant(self.to_variant()),
            _ => CandidType::TypeRef(self.to_type_ref()),
        }
    }
}

impl GetName for SourceMapped<'_, TsTypeRef> {
    fn get_name(&self) -> &str {
        match &self.type_name {
            TsEntityName::TsQualifiedName(ts_qualified_name) => {
                // TODO: This could be improved for Qualified TypeRefs with type params.
                // Currently we just drop the type params. It would be better if we
                // included them.
                panic!(
                    "{}",
                    self.qualified_name_error(ts_qualified_name.right.get_name().to_string())
                )
            }
            TsEntityName::Ident(identifier) => identifier.get_name(),
        }
    }
}

impl GetSpan for TsTypeRef {
    fn get_span(&self) -> Span {
        self.span
    }
}
