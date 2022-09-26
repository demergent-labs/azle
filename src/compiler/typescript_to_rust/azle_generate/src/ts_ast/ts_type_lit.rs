use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsTypeAliasDecl, TsTypeLit};

use super::GetDependencies;

impl GetDependencies for TsTypeLit {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.members.iter().fold(vec![], |acc, member| {
            match member.as_ts_property_signature() {
                Some(prop_sig) => {
                    let type_ann = prop_sig.type_ann.clone().unwrap();
                    let ts_type = *type_ann.type_ann.clone();
                    vec![
                        acc,
                        ts_type.get_dependent_types(type_alias_lookup, found_types),
                    ]
                    .concat()
                }
                None => {
                    todo!("Handle parsing type literals if the field isn't a TsPropertySignature")
                }
            }
        })
    }
}
