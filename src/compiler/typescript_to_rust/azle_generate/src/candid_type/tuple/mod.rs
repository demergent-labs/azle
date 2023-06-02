use cdk_framework::{
    act::node::candid::{tuple::Elem, Tuple},
    traits::CollectResults,
};
use swc_common::Span;
use swc_ecma_ast::{TsTupleType, TsTypeAliasDecl, TsTypeRef};

use crate::{
    errors::CollectResults as OtherCollectResults,
    traits::{GetName, GetNameWithError, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

use super::errors::WrongEnclosedType;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_tuple(&self) -> Result<Option<Tuple>, Vec<Error>> {
        self.process_ts_type_ref(&self.symbol_table.tuple, |type_ref| {
            let (type_params, members) =
                (self.get_type_params(), type_ref.to_tuple()).collect_results()?;
            match members {
                Some(members) => Ok(Some(Tuple {
                    name: Some(self.id.get_name().to_string()),
                    type_params: type_params.into(),
                    ..members
                })),
                None => Ok(None),
            }
        })
        .map(|result| result.flatten())
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_tuple(&self) -> Result<Option<Tuple>, Vec<Error>> {
        if self
            .symbol_table
            .tuple
            .contains(&self.get_name()?.to_string())
        {
            match self.get_ts_type()?.as_ts_tuple_type() {
                Some(ts_tuple_type) => Ok(Some(ts_tuple_type.to_tuple()?)),
                None => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
            }
        } else {
            Ok(None)
        }
    }
}

impl SourceMapped<'_, TsTupleType> {
    pub fn to_tuple(&self) -> Result<Tuple, Vec<Error>> {
        Ok(Tuple {
            name: None,
            elems: self.get_elem_types()?,
            type_params: vec![].into(),
        })
    }

    fn get_elem_types(&self) -> Result<Vec<Elem>, Vec<Error>> {
        self.elem_types
            .iter()
            .map(|elem| {
                let candid_type = SourceMapped::new_from_parent(&elem.ty, self).to_candid_type()?;
                Ok(Elem { candid_type })
            })
            .collect_results()
    }
}

impl GetSpan for TsTupleType {
    fn get_span(&self) -> Span {
        self.span
    }
}
