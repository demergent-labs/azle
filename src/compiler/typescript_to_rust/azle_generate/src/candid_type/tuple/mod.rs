use cdk_framework::{
    act::node::candid::{tuple::Elem, Tuple},
    traits::{CollectIterResults, CollectResults},
};
use swc_common::Span;
use swc_ecma_ast::{TsTupleElement, TsTupleType, TsTypeAliasDecl, TsTypeRef};

use crate::{
    traits::{GetName, GetSpan},
    ts_ast::SourceMapped,
    Error,
};

use super::errors::WrongEnclosedType;

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_tuple(&self) -> Result<Option<Tuple>, Vec<Error>> {
        self.process_ts_type_ref(&self.alias_table.tuple, |type_ref| {
            if self.is_something_that_could_be_in_the_alias_table() {
                return Ok(None);
            }
            let (type_params, tuple_type_ref) =
                (self.get_type_params(), type_ref.to_tuple()).collect_results()?;
            match tuple_type_ref {
                Some(members) => Ok(Some(Tuple {
                    name: Some(self.id.get_name()),
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
    pub fn is_tuple(&self) -> bool {
        self.alias_table.tuple.contains(&self.get_name())
    }

    pub fn to_tuple(&self) -> Result<Option<Tuple>, Vec<Error>> {
        if !self.is_tuple() {
            return Ok(None);
        }
        match self.get_ts_type()?.as_ts_tuple_type() {
            Some(ts_tuple_type) => Ok(Some(ts_tuple_type.to_tuple()?)),
            None => return Err(vec![WrongEnclosedType::error_from_ts_type_ref(self).into()]),
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
        let ts_tuple_element_to_elem = |elem: &TsTupleElement| {
            let candid_type = self.spawn(&elem.ty).to_candid_type()?;
            Ok(Elem { candid_type })
        };
        self.elem_types
            .iter()
            .map(ts_tuple_element_to_elem)
            .collect_results()
    }
}

impl GetSpan for TsTupleType {
    fn get_span(&self) -> Span {
        self.span
    }
}
