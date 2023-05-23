use cdk_framework::act::node::{
    candid::{Primitive, TypeArg, TypeRef},
    CandidType,
};
use std::ops::Deref;
use swc_common::Span;
use swc_ecma_ast::{TsEntityName, TsType, TsTypeRef};

use crate::{
    errors::CollectResults,
    traits::{GetName, GetNameWithError, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

use self::errors::{QualifiedName, WrongNumberOfParams};

pub mod errors;

impl SourceMapped<'_, TsTypeRef> {
    pub fn get_ts_type(&self) -> Result<SourceMapped<TsType>, Error> {
        match &self.type_params {
            Some(params) => {
                if params.params.len() != 1 {
                    return Err(WrongNumberOfParams::error_from_ts_type_ref(self).into());
                }
                let inner_type = params.params[0].deref();
                Ok(SourceMapped::new(inner_type, self.source_map))
            }
            None => return Err(WrongNumberOfParams::error_from_ts_type_ref(self).into()),
        }
    }

    pub fn to_type_ref(&self) -> Result<TypeRef, Vec<Error>> {
        let type_arguments =
            self.type_params
                .iter()
                .map(|type_params| {
                    type_params.params.iter().map(|param| {
                        SourceMapped::new(param.deref(), self.source_map).to_candid_type()
                    })
                })
                .flatten()
                .collect_results()?
                .into_iter()
                .map(|param| TypeArg(param))
                .collect::<Vec<_>>();

        let name_string = self.get_name()?.to_string();

        Ok(TypeRef {
            name: if name_string == "Result" {
                "_AzleResult".to_string()
            } else {
                name_string
            },
            type_arguments,
        })
    }

    pub fn as_primitive(&self) -> Result<Option<Primitive>, Error> {
        Ok(Some(match self.get_name()? {
            "blob" => Primitive::Blob,
            "float32" => Primitive::Float32,
            "float64" => Primitive::Float64,
            "int" => Primitive::Int,
            "int8" => Primitive::Int8,
            "int16" => Primitive::Int16,
            "int32" => Primitive::Int32,
            "int64" => Primitive::Int64,
            "nat" => Primitive::Nat,
            "nat8" => Primitive::Nat8,
            "nat16" => Primitive::Nat16,
            "nat32" => Primitive::Nat32,
            "nat64" => Primitive::Nat64,
            "Principal" => Primitive::Principal,
            "empty" => Primitive::Empty,
            "reserved" => Primitive::Reserved,
            "text" => Primitive::String,
            _ => return Ok(None),
        }))
    }

    pub fn to_candid_type(&self) -> Result<CandidType, Vec<Error>> {
        if let Some(primitive) = self.as_primitive()? {
            return Ok(CandidType::Primitive(primitive));
        }
        Ok(match self.get_name()? {
            "Opt" => CandidType::Opt(self.to_option()?),
            "Func" => CandidType::Func(self.to_func(None)?),
            "Record" => CandidType::Record(self.to_record()?),
            "Tuple" => CandidType::Tuple(self.to_tuple()?),
            "Vec" => CandidType::Array(self.to_vec()?),
            "Variant" => CandidType::Variant(self.to_variant()?),
            _ => CandidType::TypeRef(self.to_type_ref()?),
        })
    }
}

impl GetNameWithError for SourceMapped<'_, TsTypeRef> {
    fn get_name(&self) -> Result<&str, Error> {
        Ok(match &self.type_name {
            TsEntityName::TsQualifiedName(ts_qualified_name) => {
                // TODO: This could be improved for Qualified TypeRefs with type params.
                // Currently we just drop the type params. It would be better if we
                // included them.
                return Err(QualifiedName::from_ts_type_ref(self, &**ts_qualified_name).into());
            }
            TsEntityName::Ident(identifier) => identifier.get_name(),
        })
    }
}

impl GetSpan for TsTypeRef {
    fn get_span(&self) -> Span {
        self.span
    }
}
