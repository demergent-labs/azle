use std::collections::{HashSet, HashMap};

use proc_macro2::TokenStream;
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use super::types::{parse_ts_keyword_type, ts_type_literal_to_rust_struct, parse_ts_type_ref, parse_ts_array_type};

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_type_alias_token_streams(dependant_types: &HashSet<&String>, ast_type_alias_decls: &Vec<TsTypeAliasDecl>) -> HashMap<String, TokenStream> {
    let type_alias_lookup = generate_hash_map(ast_type_alias_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    dependant_types.iter().fold(HashMap::new(), |mut all_dependencies, dependant_type| {
        let type_alias_decl = type_alias_lookup.get(dependant_type.clone());
        println!("=== Mapping for {} ===========================================================", dependant_type.clone());
        let dependencies_map: HashMap<String, TokenStream> = match type_alias_decl {
            Some(decl) => generate_dependencies_map_for(decl, &type_alias_lookup),
            None => todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!"),
        };
        println!("=== End Mapping for {} =======================================================", dependant_type.clone());
        all_dependencies.extend(dependencies_map.into_iter());
        all_dependencies
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
fn generate_dependencies_map_for(type_alias_decl: &TsTypeAliasDecl, type_alias_lookup: &HashMap<String, TsTypeAliasDecl>) -> HashMap<String, TokenStream> {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let ts_type_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();

    let mut result: HashMap<String, TokenStream> = HashMap::new();

    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => {
            let keyword_stream = parse_ts_keyword_type(&ts_keyword_type).token_stream;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #keyword_stream;));
        },
        TsType::TsThisType(_) => todo!(),
        TsType::TsFnOrConstructorType(_) => todo!(),
        TsType::TsTypeRef(ts_type_ref) => {
            // If we have a type ref then that type ref is going to have a name
            // and that name will have to be resolved. Find that name in the
            let type_ref = parse_ts_type_ref(&ts_type_ref);
            if let Some(type_dependency) = type_ref.type_alias_dependency {
                let dep_type = type_alias_lookup.get(&type_dependency);
                match dep_type {
                    Some(dep_decl) => {
                        let ts_type_ref_result = generate_dependencies_map_for(dep_decl, type_alias_lookup);
                        println!("--- These are all of the dependencies that we found for {} ---", ts_type_name);
                        for thing in ts_type_ref_result.clone() {
                            println!("{}", thing.0);
                        }
                        println!("------------------------------------------------------- {} ---", ts_type_name);
                        result.extend(ts_type_ref_result.into_iter());
                    },
                    None => todo!("What if that decl isn't in the hash map"),
                }
            }
            let type_ref_stream = type_ref.token_stream;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #type_ref_stream;));
        },
        TsType::TsTypeQuery(_) => todo!("generate_dep_map for TypeQuery"),
        TsType::TsTypeLit(ts_type_lit) => {
            println!("### These are all of the dependencies that we found for {} ###", ts_type_name);
            let rust_struct = ts_type_literal_to_rust_struct(&ts_type_ident, &ts_type_lit);
            let dep_type_map = rust_struct.type_alias_dependencies
                .iter()
                .fold(HashMap::new(), |mut acc, dep_name| {
                    println!(">>> Working on {}", dep_name);
                    let dep_decl = type_alias_lookup.get(dep_name);

                    let dep_result = generate_dependencies_map_for(dep_decl.unwrap(), type_alias_lookup);
                    acc.extend(dep_result.into_iter());
                    acc
            });
            for thing in dep_type_map.clone() {
                println!("{}", thing.0);
            }
            println!("####################################################### {} ###", ts_type_name);
            result.extend(dep_type_map.into_iter());
            result.insert(rust_struct.name, rust_struct.token_stream);
        },
        TsType::TsArrayType(ts_array_type) => {
            println!("[[[ These are all of the dependencies that we found for {} ]]]", ts_type_name);
            let array_type = parse_ts_array_type(&ts_array_type);
            let dep_type_map = array_type.type_alias_dependencies
                .iter()
                .fold(HashMap::new(), |mut acc, dep_name| {
                    println!("))) Working on {}", dep_name);
                    let dep_decl = type_alias_lookup.get(dep_name);

                    let dep_result = generate_dependencies_map_for(dep_decl.unwrap(), type_alias_lookup);
                    acc.extend(dep_result.into_iter());
                    acc
                });
            for thing in dep_type_map.clone() {
                println!("{}", thing.0);
            }
            println!("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ {} ]]]", ts_type_name);
            result.extend(dep_type_map.into_iter());
        },
        TsType::TsTupleType(_) => todo!(),
        TsType::TsOptionalType(_) => todo!(),
        TsType::TsRestType(_) => todo!(),
        TsType::TsUnionOrIntersectionType(_) => todo!(),
        TsType::TsConditionalType(_) => todo!(),
        TsType::TsInferType(_) => todo!(),
        TsType::TsParenthesizedType(_) => todo!(),
        TsType::TsTypeOperator(_) => todo!(),
        TsType::TsIndexedAccessType(_) => todo!(),
        TsType::TsMappedType(_) => todo!(),
        TsType::TsLitType(_) => todo!(),
        TsType::TsTypePredicate(_) => todo!(),
        TsType::TsImportType(_) => todo!(),
    };
    result
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
