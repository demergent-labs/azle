use std::collections::{HashMap, HashSet};

use proc_macro2::TokenStream;
use quote::{format_ident, quote};
use swc_ecma_ast::TsTypeAliasDecl;

use super::{ts_type_to_rust_type, RustType};

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_type_alias_token_streams(
    type_alias_dependant_types: &HashSet<String>,
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, (TokenStream, Vec<RustType>)> {
    let type_alias_lookup = generate_hash_map(ast_type_alias_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    // TODO I'm guessing that we aren't going to want acc to be mutable
    type_alias_dependant_types.iter().fold(
        HashMap::new(),
        |mut all_type_alias_dependencies, dependant_type| {
            let type_alias_decl = type_alias_lookup.get(dependant_type);
            let dependency_map = match type_alias_decl {
                Some(type_alias_decl) => {
                    let dependency_map = generate_dependencies_map_for(type_alias_decl);
                    dependency_map
                }
                None => {
                    // For right now we are going to assume that if it's not in the map then we caught it somewhere else
                    // TODO for the future we should fix that assumption by limiting type_alias_dependant_types to be only the records
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

/**
 * Generate a dependency map for the given type alias decl using the given type
 * alias lookup map.
 *
 * As a reminder the type alias decl looks like this
 * TsTypeAliasDeclaration {
 *     id: Identifier; (Will have the name of the type alias)
 *     typeAnnotation: TsType; (Will have the type that the alias is aliasing)
 * }
 *
 * This will get the name from the id, parse the type from the typeAnnotation.
 * Then return a map with the idea as the key and an alias token stream as the value.
 *
 * {
 *     id: `type id = TsTypeAsTokenStream`;
 * }
 *
 * It is possible that the TsType from the typeAnnotation will also have
 * dependencies. In this case we will collect the dependency map for that type
 * as well and extend the result to include that information.
 *
 * {
 *     id: `type id = {member1: sub_id1, member2: sub_id2}`;
 *     sub_id1: `type sub_id1 = SubTsType1AsTokenStream`;
 *     sub_id2: `type sub_id2 = SubTsType2AsTokenStream`;
 * }
 *
 * When you get an item from the hash map it will be the type alias token stream, and the list of structs that it alone
 * requires
 */
fn generate_dependencies_map_for(
    type_alias_decl: &TsTypeAliasDecl,
) -> HashMap<String, (TokenStream, Vec<RustType>)> {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let ts_type_alias_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();

    let mut result_dependency_map = HashMap::new();

    let aliased_rust_type = ts_type_to_rust_type(&ts_type, &Some(&ts_type_alias_ident));

    // Add the Token stream for the TsTypeAliasDecl specified in the arguments
    let aliased_type_ident = aliased_rust_type.get_type_ident();
    result_dependency_map.insert(
        ts_type_name,
        (
            quote! {
                type #ts_type_alias_ident = #aliased_type_ident;
            },
            match aliased_rust_type.is_inline_rust_type() {
                true => vec![aliased_rust_type],
                false => vec![],
            },
        ),
    );

    result_dependency_map
}

pub fn generate_hash_map(
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, TsTypeAliasDecl> {
    ast_type_alias_decls
        .iter()
        .fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
            let type_alias_names = ast_type_alias_decl.id.sym.chars().as_str().to_string();
            acc.insert(type_alias_names, ast_type_alias_decl.clone());
            acc
        })
}
