use super::{
    ts_type_ref::TsTypeRefHelperMethods, AzleTypeAliasDecl, FunctionAndMethodTypeHelperMethods,
    GetDependencies, GetName, GetTsType,
};
use std::collections::{HashMap, HashSet};

pub struct TsCanisterDecl<'a> {
    pub azle_type_alias: AzleTypeAliasDecl<'a>,
}

impl GetDependencies for TsCanisterDecl<'_> {
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
        let ts_type = self
            .azle_type_alias
            .ts_type_alias_decl
            .type_ann
            .as_ts_type_ref()
            .unwrap()
            .get_enclosed_ts_type();
        let ts_type_lit = ts_type.as_ts_type_lit().unwrap();

        // Look at the members
        // Make sure that all of the members are tsMethodSignatures and not tsPropertySignatures
        let ts_types = ts_type_lit
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

        // Get the goods out of a method signature
        ts_types
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                acc.union(&ts_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}

impl GetDependencies for Vec<TsCanisterDecl<'_>> {
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
