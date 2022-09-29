use std::collections::{HashSet, HashMap};

use proc_macro2::TokenStream;
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::TsTypeAliasDecl;

use super::{RustType, ts_type_to_rust_type};

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_type_alias_token_streams(dependant_types: &HashSet<&String>, ast_type_alias_decls: &Vec<TsTypeAliasDecl>, count: u32) -> (HashMap<String, TokenStream>, u32) {
    let type_alias_lookup = generate_hash_map(ast_type_alias_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    // TODO I'm guessing that we aren't going to want acc to be mutable
    dependant_types.iter().fold((HashMap::new(), count), |mut acc, dependant_type| {
        let type_alias_decl = type_alias_lookup.get(dependant_type.clone());
        let dependency_map: HashMap<String, TokenStream> = match type_alias_decl {
            Some(decl) => {
                let dependency_map = generate_dependencies_map_for(decl, &type_alias_lookup, acc.1);
                acc.1 = dependency_map.1;
                dependency_map.0
            },
            None => todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!"),
        };
        acc.0.extend(dependency_map.into_iter());
        acc
    })
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
 */
fn generate_dependencies_map_for(type_alias_decl: &TsTypeAliasDecl, type_alias_lookup: &HashMap<String, TsTypeAliasDecl>, inline_struct_count: u32) -> (HashMap<String, TokenStream>, u32) {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let ts_type_alias_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();

    let mut dependency_map: HashMap<String, TokenStream> = HashMap::new();
    let mut inline_struct_count = inline_struct_count;

    let aliased_rust_type = ts_type_to_rust_type(&ts_type, inline_struct_count, Some(&ts_type_alias_ident));
    inline_struct_count = aliased_rust_type.1;
    let aliased_rust_type = aliased_rust_type.0;

    let aliased_type_sub_dependencies = aliased_rust_type.get_type_alias_dependency();
    let aliased_type_sub_dependency_map = aliased_type_sub_dependencies
        .iter()
        .fold((HashMap::new(), inline_struct_count), |mut acc, type_alias_name_thing_rename| {
            let decl = type_alias_lookup.get(type_alias_name_thing_rename);
            match decl {
                Some(decl) => {
                    let aliased_type_sub_dependency_map = generate_dependencies_map_for(decl, type_alias_lookup, acc.1);
                    acc.0.extend(aliased_type_sub_dependency_map.0);
                    (acc.0, aliased_type_sub_dependency_map.1)
                },
                None => todo!("Handle if we can't find the type in the dictionary"),
            }
        });
    dependency_map.extend(aliased_type_sub_dependency_map.0);
    inline_struct_count = aliased_type_sub_dependency_map.1;

    let aliased_type_ident = aliased_rust_type.get_type_ident();
    match aliased_rust_type {
        RustType::Struct(struct_info) => {
            dependency_map.insert(struct_info.name, struct_info.structure);
        },
        _ => {
            dependency_map.insert(
                ts_type_name,
                quote!{
                    type #ts_type_alias_ident = #aliased_type_ident;
                });
        }
    };
    (dependency_map, inline_struct_count)
}

fn generate_hash_map(ast_type_alias_decls: &Vec<TsTypeAliasDecl>) -> HashMap<String, TsTypeAliasDecl> {
    ast_type_alias_decls
        .iter()
        .fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
            let type_alias_names = ast_type_alias_decl.id.sym.chars().as_str().to_string();
            acc.insert(type_alias_names, ast_type_alias_decl.clone());
            acc
        })
}
