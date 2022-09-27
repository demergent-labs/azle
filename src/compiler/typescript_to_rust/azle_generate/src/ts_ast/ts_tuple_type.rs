use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsTupleType, TsTypeAliasDecl};

use crate::cdk_act::{
    nodes::data_type_nodes::{act_tuple::Tuple, ActTuple, ActTupleElem},
    ActDataType, ToActDataType,
};

use super::{ts_types_to_act::calculate_hash, GetDependencies};

impl GetDependencies for TsTupleType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.elem_types.iter().fold(vec![], |acc, elem_type| {
            vec![
                acc,
                elem_type
                    .ty
                    .get_dependent_types(type_alias_lookup, found_types),
            ]
            .concat()
        })
    }
}

trait TsTupleHelperMethods {
    fn generate_inline_ident(&self) -> String;
    fn get_elem_types(&self) -> Vec<ActTupleElem>;
}

impl TsTupleHelperMethods for TsTupleType {
    fn generate_inline_ident(&self) -> String {
        let id = calculate_hash(self);
        format!("AzleInlineTuple{}", id)
    }

    fn get_elem_types(&self) -> Vec<ActTupleElem> {
        self.elem_types
            .iter()
            .map(|elem| ActTupleElem {
                elem_type: elem.ty.to_act_data_type(&None),
            })
            .collect()
    }
}

impl ToActDataType for TsTupleType {
    fn to_act_data_type(&self, name: &Option<&String>) -> ActDataType {
        let elem_types = self.get_elem_types();

        ActDataType::Tuple(match name {
            Some(name) => ActTuple::TypeAlias(Tuple {
                name: name.clone().clone(),
                elems: elem_types,
            }),
            None => ActTuple::Literal(Tuple {
                name: self.generate_inline_ident(),
                elems: elem_types,
            }),
        })
    }
}
