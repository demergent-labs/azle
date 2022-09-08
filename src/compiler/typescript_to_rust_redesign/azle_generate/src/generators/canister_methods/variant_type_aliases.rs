use std::collections::{HashMap, HashSet};

use proc_macro2::TokenStream;
use quote::format_ident;
use swc_ecma_ast::TsTypeAliasDecl;

use crate::generators::canister_methods::types::ts_type_literal_to_rust_enum;

use super::{generate_hash_map, StructInfo};
/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_variant_token_streams(
    type_alias_variants: &HashSet<&String>,
    ast_type_alias_variant_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, (TokenStream, Vec<StructInfo>)> {
    let type_alias_lookup = generate_hash_map(ast_type_alias_variant_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    // TODO I'm guessing that we aren't going to want acc to be mutable
    type_alias_variants.iter().fold(
        HashMap::new(),
        |mut all_type_alias_dependencies, dependant_type| {
            let type_alias_decl = type_alias_lookup.get(dependant_type.clone());
            let dependency_map = match type_alias_decl {
                Some(type_alias_decl) => {
                    let dependency_map =
                        generate_dependencies_map_for(type_alias_decl, &type_alias_lookup);
                    dependency_map
                }
                None => {
                    // For right now we are going to assume that if it's not in the map then we caught it somewhere else
                    // TODO for the future we should fix that assumption by limiting type_alias_variants to be only the variants
                    // Right now I think we are passing in whatever
                    // todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!")
                    HashMap::new()
                }
            };
            all_type_alias_dependencies.extend(dependency_map.into_iter());
            all_type_alias_dependencies
        },
    )
}

fn generate_dependencies_map_for(
    type_alias_decl: &TsTypeAliasDecl,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
) -> HashMap<String, (TokenStream, Vec<StructInfo>)> {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let ts_type_alias_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();
    let inner_type_lit = ts_type.as_ts_type_ref().unwrap();
    let inner_type_lit = inner_type_lit.type_params.as_ref().unwrap();
    let inner_type_lit = inner_type_lit.params[0].clone();
    let inner_type_lit = *inner_type_lit;
    let inner_type_lit = inner_type_lit.as_ts_type_lit().unwrap();

    let mut result_dependency_map = HashMap::new();

    let aliased_rust_type = ts_type_literal_to_rust_enum(&ts_type_alias_ident, inner_type_lit);

    // Add the Token Streams for the dependencies of the type alias specified in the arguments
    let member_dependencies = aliased_rust_type.type_alias_dependencies;
    let member_dependency_map =
        member_dependencies
            .iter()
            .fold(
                HashMap::new(),
                |mut acc, member_dependency| match type_alias_lookup.get(member_dependency) {
                    Some(decl) => {
                        acc.extend(generate_dependencies_map_for(decl, type_alias_lookup));
                        acc
                    }
                    None => todo!(
                        "Handle if we can't find the type [{}] in the dictionary",
                        member_dependency
                    ),
                },
            );
    result_dependency_map.extend(member_dependency_map);

    // Add the Token stream for the TsTypeAliasDecl specified in the arguments
    let enum_name = aliased_rust_type.identifier.to_string();

    result_dependency_map.insert(
        enum_name,
        (
            aliased_rust_type.structure,
            *aliased_rust_type.inline_dependencies,
        ),
    );

    result_dependency_map
}
