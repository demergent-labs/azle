use std::collections::{HashSet, HashMap};

use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsPropertySignature};

use super::{types::{parse_ts_keyword_type, parse_ts_type_ref, parse_ts_array_type}, RustType, ts_type_to_rust_type};

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
        let dependencies_map: HashMap<String, TokenStream> = match type_alias_decl {
            Some(decl) => generate_dependencies_map_for(decl, &type_alias_lookup),
            None => todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!"),
        };
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
        TsType::TsTypeRef(ts_type_ref) => {
            let type_ref = parse_ts_type_ref(&ts_type_ref);
            if let Some(type_dependency) = type_ref.type_alias_dependency {
                let dep_type = type_alias_lookup.get(&type_dependency);
                match dep_type {
                    Some(dep_decl) => {
                        let ts_type_ref_result = generate_dependencies_map_for(dep_decl, type_alias_lookup);
                        result.extend(ts_type_ref_result.into_iter());
                    },
                    None => todo!("Could not find {type_dependency} in the hash map"),
                }
            }
            let type_ref_stream = type_ref.token_stream;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #type_ref_stream;));
        },
        TsType::TsArrayType(ts_array_type) => {
            let array_type = parse_ts_array_type(&ts_array_type);
            if let Some(type_dependency) = array_type.type_alias_dependency {
                let dep_type = type_alias_lookup.get(&type_dependency);
                match dep_type {
                    Some(dep_decl) => {
                        let ts_type_ref_result = generate_dependencies_map_for(dep_decl, type_alias_lookup);
                        result.extend(ts_type_ref_result.into_iter());
                    },
                    None => todo!("Could not find {type_dependency} in the hash map"),
                }
            }
            let type_ref_stream = array_type.token_stream;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #type_ref_stream;));
        },
        TsType::TsTypeLit(ts_type_lit) => {
            let rust_struct = ts_type_literal_to_rust_struct(&ts_type_ident, &ts_type_lit);
            let dep_type_map = rust_struct.type_alias_dependencies
                .iter()
                .fold(HashMap::new(), |mut acc, dep_name| {
                    let dep_decl = type_alias_lookup.get(dep_name);

                    let dep_result = generate_dependencies_map_for(dep_decl.unwrap(), type_alias_lookup);
                    acc.extend(dep_result.into_iter());
                    acc
            });
            result.extend(dep_type_map.into_iter());
            result.insert(rust_struct.name, rust_struct.token_stream);
        },
        TsType::TsThisType(_) => todo!("generate_dep_map for this type"),
        TsType::TsFnOrConstructorType(_) => todo!("generate_dep_map for fn or constructor"),
        TsType::TsTypeQuery(_) => todo!("generate_dep_map for TypeQuery"),
        TsType::TsTupleType(_) => todo!("generate for tuple"),
        TsType::TsOptionalType(_) => todo!("generate for optional"),
        TsType::TsRestType(_) => todo!("generate for rest"),
        TsType::TsUnionOrIntersectionType(_) => todo!("generate for union"),
        TsType::TsConditionalType(_) => todo!("generate for conditional"),
        TsType::TsInferType(_) => todo!("generate for infer"),
        TsType::TsParenthesizedType(_) => todo!("generate for parenthesized"),
        TsType::TsTypeOperator(_) => todo!("generate for type operator"),
        TsType::TsIndexedAccessType(_) => todo!("generate for indexed"),
        TsType::TsMappedType(_) => todo!("generate for mapped"),
        TsType::TsLitType(_) => todo!("generate for lit type"),
        TsType::TsTypePredicate(_) => todo!("generate for predicate"),
        TsType::TsImportType(_) => todo!("generate for import"),
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

fn collect_dependencies(rust_type: &RustType) -> Vec<String> {
    let dependencies = rust_type.get_type_alias_dependency();
    match dependencies {
        Some(dependency) => vec![dependency.clone()],
        None => vec![],
    }
}

fn parse_type_literal_members(member: &TsTypeElement) -> (TokenStream, Vec<String>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig);
            let member_type_token_stream = member_type.get_type_ident();
            let type_dependencies = collect_dependencies(&member_type);
            (quote!(#member_name: #member_type_token_stream), type_dependencies)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

fn azle_variant_to_rust_enum(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> EnumInfo {
    let members: Vec<(TokenStream, Vec<String>)> = ts_type_lit.members.iter().map(|member| {
        parse_type_literal_members_for_enum(member)
    }).collect();
    let member_token_streams = members.iter().map(|member| member.0.clone());
    let type_dependencies = members.iter().fold(vec![], |acc, member| vec![acc, member.1.clone()].concat());
    let token_stream = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        enum #ts_type_ident {
            #(#member_token_streams),*
        }
    );
    EnumInfo { token_stream, name: "CoolEnumBro".to_string(), type_alias_dependencies: type_dependencies }
}

fn parse_type_literal_members_for_enum(member: &TsTypeElement) -> (TokenStream, Vec<String>) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let member_name = parse_type_literal_member_name(prop_sig);
            let member_type = parse_type_literal_member_type(prop_sig);
            if ! prop_sig.optional {
                todo!("Handle if the user didn't make the type optional");
            }
            let member_type_token_stream = member_type.get_type_ident();
            let type_dependencies = collect_dependencies(&member_type);
            (quote!{#member_name(#member_type_token_stream)}, type_dependencies)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

pub fn ts_type_literal_to_rust_struct(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit) -> StructInfo {
    let members: Vec<(TokenStream, Vec<String>)> = ts_type_lit.members.iter().map(|member| {
        parse_type_literal_members(member)
    }).collect();
    let member_token_streams = members.iter().map(|member| member.0.clone());
    let type_dependencies = members.iter().fold(vec![], |acc, member| vec![acc, member.1.clone()].concat());
    let token_stream = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        struct #ts_type_ident {
            #(#member_token_streams),*
        }
    );
    StructInfo {
        token_stream,
        name: ts_type_ident.to_string(),
        type_alias_dependencies: type_dependencies,
    }
}

fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> RustType {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(&ts_type)
}

#[derive(Clone)]
pub struct StructInfo {
    pub token_stream: TokenStream,
    pub name: String,
    pub type_alias_dependencies: Vec<String>,
}

// The idea is that you can put the name into a token stream and (which should be pretty much the same, and that will work after you install all of the dependencies)

// TODO I think the next thing I need to do is understand what I am doing with the
// Collect dependencies. My current theory is that I would have a struct not be a
// Struct type but have it be a type ref with a struct as a dependency
// It might be helpful to think about the keywords
// Maybe have simpler examples, work out the architecture,
// Determine where I determine the dependancies and make sure it's clear in the code
#[derive(Clone)]
pub struct EnumInfo {
    pub token_stream: TokenStream,
    pub name: String,
    pub type_alias_dependencies: Vec<String>,
}
