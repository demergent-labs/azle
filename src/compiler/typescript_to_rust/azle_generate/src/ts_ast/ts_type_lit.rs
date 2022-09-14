use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsTypeAliasDecl, TsTypeLit};

use super::ts_type;

pub fn get_dependent_types_from_ts_type_lit(
    ts_type_lit: &TsTypeLit,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    ts_type_lit.members.iter().fold(vec![], |acc, member| {
        match member.as_ts_property_signature() {
            Some(prop_sig) => {
                let type_ann = prop_sig.type_ann.clone().unwrap();
                let ts_type = *type_ann.type_ann.clone();
                vec![
                    acc,
                    ts_type::get_dependent_types_for_ts_type(
                        &ts_type,
                        type_alias_lookup,
                        found_types,
                    ),
                ]
                .concat()
            }
            None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
        }
    })
}
