use std::{collections::HashSet, iter::FromIterator};
use swc_ecma_ast::{FnDecl, TsTypeAliasDecl};

use super::{ts_type::get_dependent_types_for_ts_type, ts_type_alias_decl::generate_hash_map};
use crate::generators::canister_methods::{get_param_ts_types, get_return_ts_type};

pub fn get_dependent_types_from_fn_decls(
    fn_decls: &Vec<FnDecl>,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    // TODO the found types are resetting every once and a while. I am guessing it's as we start another function or maybe a different type in that function. Either way it might be slightly more efficient to continually build up the list to avoid redundancy
    fn_decls.iter().fold(HashSet::new(), |acc, fn_decl| {
        acc.union(&get_dependent_types_from_fn_decl(
            fn_decl,
            possible_dependencies,
            &acc,
        ))
        .cloned()
        .collect()
    })
}

fn get_dependent_types_from_fn_decl(
    fn_decl: &FnDecl,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> HashSet<String> {
    let type_alias_lookup = generate_hash_map(possible_dependencies);
    let return_types = get_return_ts_type(fn_decl);
    let param_types = get_param_ts_types(fn_decl);
    let ts_types = vec![vec![return_types], param_types].concat();

    ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
        let result = HashSet::from_iter(
            get_dependent_types_for_ts_type(ts_type, &type_alias_lookup, &acc)
                .iter()
                .cloned(),
        );
        acc.union(&result).cloned().collect()
    })
}
