use std::collections::{HashMap, HashSet};

use crate::ts_ast::{
    azle_type::AzleType, FunctionAndMethodTypeHelperMethods, GetDependencies, GetName, GetTsType,
};

use super::AzleTypeAliasDecl;

pub struct AzleCanisterDecl<'a> {
    pub azle_type_alias: AzleTypeAliasDecl<'a>,
}

impl GetDependencies for AzleCanisterDecl<'_> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        // Verify that it is a canister
        let is_canister = self.azle_type_alias.get_ts_type().is_ts_type_ref()
            && self
                .azle_type_alias
                .get_ts_type()
                .as_ts_type_ref()
                .unwrap()
                .get_name()
                == "Canister";
        if !is_canister {
            panic!("Expecting Canister")
        }
        // Get the tstypeliteral out of it
        let ts_type = *self.azle_type_alias.ts_type_alias_decl.type_ann.clone();
        let azle_type = AzleType::from_ts_type(ts_type, self.azle_type_alias.source_map);
        let azle_type_ref = azle_type.as_azle_type_ref().unwrap();
        let azle_type_lit = azle_type_ref.get_enclosed_azle_type();
        let azle_type_lit = azle_type_lit.as_azle_type_lit().unwrap();

        // Look at the members
        // Make sure that all of the members are tsMethodSignatures and not tsPropertySignatures
        let ts_types = azle_type_lit
            .ts_type_lit
            .members
            .iter()
            .fold(vec![], |acc, member| match member {
                swc_ecma_ast::TsTypeElement::TsMethodSignature(method_sig) => {
                    let return_types = match method_sig.get_return_type() {
                        Some(return_type) => vec![return_type],
                        None => vec![],
                    };
                    let param_types = method_sig.get_param_types();
                    vec![acc, return_types, param_types].concat()
                }
                _ => todo!("There should only be Method Signatures on a Canister type"),
            });

        let azle_types = ts_types.iter().map(|ts_type| {
            AzleType::from_ts_type(ts_type.clone(), self.azle_type_alias.source_map)
        });

        // Get the goods out of a method signature
        azle_types.fold(found_type_names.clone(), |acc, ts_type| {
            acc.union(&ts_type.get_dependent_types(type_alias_lookup, &acc))
                .cloned()
                .collect()
        })
    }
}

impl GetDependencies for Vec<AzleCanisterDecl<'_>> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.iter()
            .fold(found_type_names.clone(), |acc, canister_decl| {
                acc.union(&canister_decl.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
