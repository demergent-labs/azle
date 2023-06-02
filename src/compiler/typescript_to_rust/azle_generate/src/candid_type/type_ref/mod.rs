use cdk_framework::{
    act::node::{
        candid::{TypeArg, TypeRef},
        CandidType,
    },
    traits::CollectResults,
};
use std::ops::Deref;
use swc_common::Span;
use swc_ecma_ast::{TsEntityName, TsType, TsTypeRef};

use crate::{
    errors::CollectResults as OtherCollectResults,
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
                Ok(SourceMapped::new_from_parent(inner_type, self))
            }
            None => return Err(WrongNumberOfParams::error_from_ts_type_ref(self).into()),
        }
    }

    pub fn to_type_ref(&self) -> Result<TypeRef, Vec<Error>> {
        let (type_arguments, name_string) = (
            self.type_params
                .iter()
                .map(|type_params| {
                    type_params.params.iter().map(|param| {
                        SourceMapped::new_from_parent(param.deref(), self).to_candid_type()
                    })
                })
                .flatten()
                .collect_results()
                .map(|param| {
                    param
                        .into_iter()
                        .map(|param| TypeArg(param))
                        .collect::<Vec<_>>()
                }),
            self.get_name().map_err(Error::into),
        )
            .collect_results()?;

        Ok(TypeRef {
            name: if self.symbol_table.result.contains(&name_string.to_string()) {
                "_AzleResult".to_string()
            } else {
                name_string.to_string()
            },
            type_arguments,
        })
    }

    pub fn to_candid_type(&self) -> Result<CandidType, Vec<Error>> {
        if let Some(primitive) = self.to_primitive()? {
            return Ok(CandidType::Primitive(primitive));
        }
        if let Some(opt) = self.to_option()? {
            return Ok(CandidType::Opt(opt));
        }
        if let Some(func) = self.to_func(None)? {
            return Ok(CandidType::Func(func));
        }
        if let Some(record) = self.to_record()? {
            return Ok(CandidType::Record(record));
        }
        if let Some(tuple) = self.to_tuple()? {
            return Ok(CandidType::Tuple(tuple));
        }
        if let Some(variant) = self.to_variant()? {
            return Ok(CandidType::Variant(variant));
        }
        if let Some(vec) = self.to_vec()? {
            return Ok(CandidType::Array(vec));
        }
        Ok(CandidType::TypeRef(self.to_type_ref()?))
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
