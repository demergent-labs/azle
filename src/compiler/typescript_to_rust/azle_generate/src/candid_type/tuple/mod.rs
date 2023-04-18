use cdk_framework::act::node::candid::{tuple::Elem, Tuple};
use swc_common::Span;
use swc_ecma_ast::{TsTupleType, TsTypeAliasDecl, TsTypeRef};

use crate::{
    traits::{GetName, GetSpan},
    ts_ast::{azle_type::AzleType, SourceMapped},
};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_tuple(&self) -> Option<Tuple> {
        self.process_ts_type_ref("Tuple", |azle_type_ref| Tuple {
            name: Some(self.id.get_name().to_string()),
            type_params: self.get_type_params().into(),
            ..azle_type_ref.to_tuple()
        })
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_tuple(&self) -> Tuple {
        match self.get_enclosed_azle_type().as_azle_tuple_type() {
            Some(ts_tuple_type) => ts_tuple_type,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_tuple()
    }
}

impl SourceMapped<'_, TsTupleType> {
    pub fn to_tuple(&self) -> Tuple {
        Tuple {
            name: None,
            elems: self.get_elem_types(),
            type_params: vec![].into(),
        }
    }

    fn get_elem_types(&self) -> Vec<Elem> {
        self.elem_types
            .iter()
            .map(|elem| {
                let ts_type = elem.ty.clone();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                Elem {
                    candid_type: azle_type.to_candid_type(),
                }
            })
            .collect()
    }
}

impl GetSpan for TsTupleType {
    fn get_span(&self) -> Span {
        self.span
    }
}
