use std::collections::{HashMap, HashSet};

use proc_macro2::TokenStream;
use quote::format_ident;
use swc_ecma_ast::TsTypeAliasDecl;

use super::{generate_hash_map, ts_type_to_rust_type, RustType, StructInfo};

/**
 * Here is what I am thinking
 *
 * 1. Get a list of all of the type aliases our program uses
 * 1. Get a list of the corresponding decls
 * 1. For each of those decls
 *      1. Create Struct, or Enum, or Rust Type Alias, or Fun whatever
 *      1. Get a list of all the type aliases that that decl uses
 *      1. Get a list of the corresponding decls
 *      1. Recur
 */

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_record_token_streams(
    type_alias_dependant_types: &HashSet<String>,
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, (TokenStream, Vec<StructInfo>)> {
    let type_alias_lookup = generate_hash_map(ast_type_alias_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    // TODO I'm guessing that we aren't going to want acc to be mutable
    type_alias_dependant_types.iter().fold(
        HashMap::new(),
        |mut all_type_alias_dependencies, dependant_type| {
            let type_alias_decl = type_alias_lookup.get(dependant_type);
            let dependency_map = match type_alias_decl {
                Some(type_alias_decl) => {
                    let dependency_map =
                        generate_dependencies_map_for_struct(type_alias_decl, &type_alias_lookup);
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
fn generate_dependencies_map_for_struct(
    type_alias_decl: &TsTypeAliasDecl,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
) -> HashMap<String, (TokenStream, Vec<StructInfo>)> {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let ts_type_alias_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();

    let mut result_dependency_map = HashMap::new();

    let aliased_rust_type = ts_type_to_rust_type(&ts_type, Some(&ts_type_alias_ident));

    // Add the Token Streams for the dependencies of the type alias specified in the arguments
    let member_dependencies = aliased_rust_type.get_type_alias_dependency();
    let member_dependency_map =
        member_dependencies
            .iter()
            .fold(
                HashMap::new(),
                |mut acc, member_dependency| match type_alias_lookup.get(member_dependency) {
                    Some(decl) => {
                        // TODO the thing I am afraid is happening is that we are going to not recurse properly if we have everything seperated out.
                        // Right now we do just the records and just the variants and just the funcs but the truth is that
                        // those things are composed of each other and it's not really practical to separte them I think
                        // But what we can do is have everything separted into their own function any ways and then call to them when we are recuring
                        acc.extend(generate_dependencies_map_for_struct(
                            decl,
                            type_alias_lookup,
                        ));
                        acc
                    }
                    None => HashMap::new(),
                    // todo!(
                    //     "Handle if we can't find the type [{}] in the dictionary",
                    //     member_dependency
                    // ),
                },
            );
    result_dependency_map.extend(member_dependency_map);

    match aliased_rust_type.clone() {
        RustType::Struct(struct_info) => {
            result_dependency_map.insert(
                struct_info.identifier.to_string(),
                (struct_info.structure, *struct_info.inline_dependencies),
            );
        }
        _ => todo!("Only Structs allowed"),
    };

    result_dependency_map
}
