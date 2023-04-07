use cdk_framework::act::node::{
    candid::{tuple::Elem, Tuple},
    CandidType,
};
use swc_common::SourceMap;
use swc_ecma_ast::{TsTupleType, TsTypeAliasDecl};

use crate::ts_ast::{
    azle_type::{AzleType, AzleTypeRef},
    source_map::{GetSourceFileInfo, SourceMapped},
    traits::{GetName, GetSourceInfo, GetSourceText},
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

impl AzleTypeRef<'_> {
    pub fn to_tuple(&self) -> Tuple {
        match self.get_enclosed_azle_type().as_azle_tuple_type() {
            Some(ts_tuple_type) => ts_tuple_type,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_tuple()
    }
}

#[derive(Clone)]
pub struct AzleTupleType<'a> {
    pub ts_tuple_type: TsTupleType,
    pub source_map: &'a SourceMap,
}

impl AzleTupleType<'_> {
    pub fn to_tuple(&self) -> Tuple {
        Tuple {
            name: None,
            elems: self.get_elem_types(),
            type_params: vec![].into(),
        }
    }

    fn get_elem_types(&self) -> Vec<Elem> {
        self.ts_tuple_type
            .elem_types
            .iter()
            .map(|elem| {
                let ts_type = elem.ty.clone();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                Elem {
                    candid_type: azle_type.to_data_type(),
                }
            })
            .collect()
    }
}

impl GetSourceText for AzleTupleType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_tuple_type.span)
    }
}

impl GetSourceInfo for AzleTupleType<'_> {
    fn get_source(&self) -> String {
        self.source_map.get_source(self.ts_tuple_type.span)
    }

    fn get_line_number(&self) -> usize {
        self.source_map.get_line_number(self.ts_tuple_type.span)
    }

    fn get_origin(&self) -> String {
        self.source_map.get_origin(self.ts_tuple_type.span)
    }

    fn get_range(&self) -> (usize, usize) {
        self.source_map.get_range(self.ts_tuple_type.span)
    }
}
