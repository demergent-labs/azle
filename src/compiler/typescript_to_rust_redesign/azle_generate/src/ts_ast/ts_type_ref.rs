use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::{TsTypeAliasDecl, TsTypeRef};

use super::{ts_type, ts_type_alias_decl};

pub fn get_dependent_types_from_type_ref(
    ts_type_ref: &TsTypeRef,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    let type_name = ts_type_ref
        .type_name
        .as_ident()
        .unwrap()
        .sym
        .chars()
        .as_str();
    match type_name {
        "blob" => vec![],
        "float32" => vec![],
        "float64" => vec![],
        "int" => vec![],
        "int8" => vec![],
        "int16" => vec![],
        "int32" => vec![],
        "int64" => vec![],
        "nat" => vec![],
        "nat8" => vec![],
        "nat16" => vec![],
        "nat32" => vec![],
        "nat64" => vec![],
        "Principal" => vec![],
        "empty" => vec![],
        "reserved" => vec![],
        "Opt" => {
            get_dependent_types_from_enclosing_type(ts_type_ref, type_alias_lookup, found_types)
        }
        "Func" => {
            get_dependent_types_from_enclosing_type(ts_type_ref, type_alias_lookup, found_types)
        }
        "Variant" => {
            get_dependent_types_from_enclosing_type(ts_type_ref, type_alias_lookup, found_types)
        }
        _ => {
            if found_types.contains(&type_name.to_string()) {
                return vec![];
            }
            match type_alias_lookup.clone().get(type_name) {
                Some(decl) => {
                    let new_type = vec![type_name.to_string()];
                    let new_hash: HashSet<String> = HashSet::from_iter(new_type.iter().cloned());
                    let found_types: HashSet<String> =
                        found_types.clone().union(&new_hash).cloned().collect();
                    vec![
                        new_type,
                        ts_type_alias_decl::get_dependent_types_from_type_alias_decl(
                            decl,
                            type_alias_lookup,
                            &found_types,
                        ),
                    ]
                    .concat()
                }
                None => vec![],
            }
        }
    }
}

fn get_dependent_types_from_enclosing_type(
    ts_type_ref: &TsTypeRef,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    let type_params = &ts_type_ref.type_params;
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = &*params.params[0];
            ts_type::get_dependent_types_for_ts_type(
                &enclosed_ts_type,
                type_alias_lookup,
                found_types,
            )
        }
        None => vec![],
    }
}
