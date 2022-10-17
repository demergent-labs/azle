use swc_common::SourceMap;
use swc_ecma_ast::TsTupleType;

use crate::{
    cdk_act::{
        nodes::data_type_nodes::{
            act_tuple::{Tuple, TupleLiteral, TupleTypeAlias},
            ActTuple, ActTupleElem, LiteralOrTypeAlias,
        },
        ActDataType, ToActDataType,
    },
    ts_ast::{source_map::GetSourceFileInfo, GenerateInlineName, GetDependencies, GetSourceText},
};

use super::AzleType;

#[derive(Clone)]
pub struct AzleTupleType<'a> {
    pub ts_tuple_type: TsTupleType,
    pub source_map: &'a SourceMap,
}

impl AzleTupleType<'_> {
    fn get_elem_types(&self) -> Vec<ActTupleElem> {
        self.ts_tuple_type
            .elem_types
            .iter()
            .map(|elem| {
                let ts_type = elem.ty.clone();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                ActTupleElem {
                    elem_type: azle_type.to_act_data_type(&None),
                }
            })
            .collect()
    }
}

impl GetDependencies for AzleTupleType<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &std::collections::HashMap<String, crate::ts_ast::AzleTypeAliasDecl>,
        found_type_names: &std::collections::HashSet<String>,
    ) -> std::collections::HashSet<String> {
        self.ts_tuple_type
            .elem_types
            .iter()
            .fold(found_type_names.clone(), |acc, elem_type| {
                let ts_type = elem_type.ty.clone();
                let azle_type = AzleType::from_ts_type(ts_type, self.source_map);
                acc.union(&azle_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl GetSourceText for AzleTupleType<'_> {
    fn get_source_text(&self) -> String {
        self.source_map.get_source(self.ts_tuple_type.span)
    }
}

impl ToActDataType for AzleTupleType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> crate::cdk_act::ActDataType {
        ActDataType::Tuple(ActTuple {
            act_type: match alias_name {
                Some(name) => LiteralOrTypeAlias::TypeAlias(TupleTypeAlias {
                    tuple: Tuple {
                        name: name.clone().clone(),
                        elems: self.get_elem_types(),
                    },
                }),
                None => LiteralOrTypeAlias::Literal(TupleLiteral {
                    tuple: Tuple {
                        name: self.ts_tuple_type.generate_inline_name(),
                        elems: self.get_elem_types(),
                    },
                }),
            },
        })
    }
}
