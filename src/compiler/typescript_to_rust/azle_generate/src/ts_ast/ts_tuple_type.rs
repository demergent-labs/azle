use std::collections::{HashMap, HashSet};
use swc_common::SourceMap;
use swc_ecma_ast::TsTupleType;

use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_tuple::{Tuple, TupleLiteral, TupleTypeAlias},
        ActTuple, ActTupleElem, LiteralOrTypeAlias,
    },
    ActDataType, ToActDataType,
};

use super::{AzleTypeAliasDecl, GenerateInlineName, GetDependencies};

trait TsTupleHelperMethods {
    fn get_elem_types(&self, source_map: &SourceMap) -> Vec<ActTupleElem>;
}

impl GenerateInlineName for TsTupleType {
    fn generate_inline_name(&self) -> String {
        format!("AzleInlineTuple{}", self.calculate_hash())
    }
}

impl GetDependencies for TsTupleType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> HashSet<String> {
        self.elem_types
            .iter()
            .fold(found_types.clone(), |acc, elem_type| {
                acc.union(&elem_type.ty.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl ToActDataType for TsTupleType {
    fn to_act_data_type(&self, name: &Option<&String>, source_map: &SourceMap) -> ActDataType {
        ActDataType::Tuple(ActTuple {
            act_type: match name {
                Some(name) => LiteralOrTypeAlias::TypeAlias(TupleTypeAlias {
                    tuple: Tuple {
                        name: name.clone().clone(),
                        elems: self.get_elem_types(source_map),
                    },
                }),
                None => LiteralOrTypeAlias::Literal(TupleLiteral {
                    tuple: Tuple {
                        name: self.generate_inline_name(),
                        elems: self.get_elem_types(source_map),
                    },
                }),
            },
        })
    }
}

impl TsTupleHelperMethods for TsTupleType {
    fn get_elem_types(&self, source_map: &SourceMap) -> Vec<ActTupleElem> {
        self.elem_types
            .iter()
            .map(|elem| ActTupleElem {
                elem_type: elem.ty.to_act_data_type(&None, source_map),
            })
            .collect()
    }
}
