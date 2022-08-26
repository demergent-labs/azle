use std::collections::{HashSet, HashMap};

use proc_macro2::{Ident, TokenStream};
use quote::{
    format_ident,
    quote,
};
use swc_ecma_ast::{TsType, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsPropertySignature};

use super::{types::{parse_ts_keyword_type, parse_ts_type_ref, parse_ts_array_type}, RustType, ts_type_to_rust_type, StructInfo};

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_type_alias_token_streams(dependant_types: &HashSet<&String>, ast_type_alias_decls: &Vec<TsTypeAliasDecl>, count: u32) -> (HashMap<String, TokenStream>, u32) {
    let type_alias_lookup = generate_hash_map(ast_type_alias_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    dependant_types.iter().fold((HashMap::new(), count), |mut acc, dependant_type| {
        let type_alias_decl = type_alias_lookup.get(dependant_type.clone());
        let dependencies_map: HashMap<String, TokenStream> = match type_alias_decl {
            Some(decl) => {
                let result = generate_dependencies_map_for(decl, &type_alias_lookup, acc.1);
                acc.1 = result.1;
                result.0
            },
            None => todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!"),
        };
        acc.0.extend(dependencies_map.into_iter());
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
fn generate_dependencies_map_for(type_alias_decl: &TsTypeAliasDecl, type_alias_lookup: &HashMap<String, TsTypeAliasDecl>, count: u32) -> (HashMap<String, TokenStream>, u32) {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let ts_type_ident = format_ident!("{}", ts_type_name);

    let ts_type = *type_alias_decl.type_ann.clone();

    let mut result: HashMap<String, TokenStream> = HashMap::new();
    let mut count = count;

    match ts_type {
        TsType::TsKeywordType(ts_keyword_type) => {
            let keyword_stream = parse_ts_keyword_type(&ts_keyword_type).identifier;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #keyword_stream;));
        },
        TsType::TsTypeRef(ts_type_ref) => {
            let type_ref = parse_ts_type_ref(&ts_type_ref, count);
            count = type_ref.1;
            let type_ref = type_ref.0;
            if let Some(type_dependency) = type_ref.type_alias_dependency {
                let dep_type = type_alias_lookup.get(&type_dependency);
                match dep_type {
                    Some(dep_decl) => {
                        let ts_type_ref_result = generate_dependencies_map_for(dep_decl, type_alias_lookup, count);
                        count = ts_type_ref_result.1;
                        let ts_type_ref_result = ts_type_ref_result.0;
                        result.extend(ts_type_ref_result.into_iter());
                    },
                    None => todo!("Could not find {type_dependency} in the hash map"),
                }
            }
            let type_ref_stream = type_ref.identifier;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #type_ref_stream;));
        },
        TsType::TsArrayType(ts_array_type) => {
            let array_type = parse_ts_array_type(&ts_array_type, count);
            count = array_type.1;
            let array_type = array_type.0;
            if let Some(type_dependency) = array_type.type_alias_dependency {
                let dep_type = type_alias_lookup.get(&type_dependency);
                match dep_type {
                    Some(dep_decl) => {
                        let ts_type_ref_result = generate_dependencies_map_for(dep_decl, type_alias_lookup, count);
                        count = ts_type_ref_result.1;
                        let ts_type_ref_result = ts_type_ref_result.0;
                        result.extend(ts_type_ref_result.into_iter());
                    },
                    None => todo!("Could not find {type_dependency} in the hash map"),
                }
            }
            let type_ref_stream = array_type.identifier;
            result.insert(ts_type_name, quote!(type #ts_type_ident = #type_ref_stream;));
        },
        TsType::TsTypeLit(ts_type_lit) => {
            let rust_struct = ts_type_literal_to_rust_struct(&ts_type_ident, &ts_type_lit, count);
            count = rust_struct.1;
            let rust_struct = rust_struct.0;
            let dep_type_map = rust_struct.type_alias_dependencies
                .iter()
                .fold(HashMap::new(), |mut acc, dep_name| {
                    let dep_decl = type_alias_lookup.get(dep_name);

                    let dep_result = generate_dependencies_map_for(dep_decl.unwrap(), type_alias_lookup, count);
                    count = dep_result.1;
                    let dep_result = dep_result.0;
                    acc.extend(dep_result.into_iter());
                    acc
            });
            result.extend(dep_type_map.into_iter());
            result.insert(rust_struct.name, rust_struct.structure);
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
    (result, count)
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
    rust_type.get_type_alias_dependency()
}

fn parse_type_literal_fields(field: &TsTypeElement, count: u32) -> (TokenStream, Vec<String>, Option<StructInfo>, u32) {
    match field.as_ts_property_signature() {
        Some(prop_sig) => {
            let field_name = parse_type_literal_field_name(prop_sig);
            let field_type = parse_type_literal_field_type(prop_sig, count);
            let count = field_type.1;
            let field_type = field_type.0;
            let field_type_token_stream = field_type.get_type_ident();
            let type_dependencies = field_type.get_type_alias_dependency();
            let inline_enclosed_type = match &field_type {
                RustType::Struct(struct_info) => Some(struct_info.clone()),
                _ => None
            };
            (quote!(#field_name: #field_type_token_stream), type_dependencies, inline_enclosed_type, count)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

fn azle_variant_to_rust_enum(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit, count: u32) -> (EnumInfo, u32) {
    let members: (Vec<(TokenStream, Vec<String>)>, u32) = ts_type_lit.members.iter().fold((vec![], count), |acc, member| {
        let result = parse_type_literal_members_for_enum(member, acc.1);
        let count = result.2;
        let result = vec![acc.0, vec![(result.0, result.1)]].concat();
        (result, count)
    });
    // let members: Vec<(TokenStream, Vec<String>)> = ts_type_lit.members.iter().map(|member| {
    //     parse_type_literal_members_for_enum(member, count)
    // }).collect();
    let member_token_streams = members.0.iter().map(|member| member.0.clone());
    let type_dependencies = members.0.iter().fold(vec![], |acc, member| vec![acc, member.1.clone()].concat());
    let count = members.1;
    let token_stream = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        enum #ts_type_ident {
            #(#member_token_streams),*
        }
    );
    (EnumInfo { token_stream, name: "CoolEnumBro".to_string(), type_alias_dependencies: type_dependencies }, count)
}

fn parse_type_literal_members_for_enum(member: &TsTypeElement, count: u32) -> (TokenStream, Vec<String>, u32) {
    match member.as_ts_property_signature() {
        Some(prop_sig) => {
            let variant_name = parse_type_literal_field_name(prop_sig);
            let variant_type = parse_type_literal_field_type(prop_sig, count);
            let count = variant_type.1;
            let variant_type = variant_type.0;
            if ! prop_sig.optional {
                todo!("Handle if the user didn't make the type optional");
            }
            let member_type_token_stream = variant_type.get_type_ident();
            let type_dependencies = variant_type.get_type_alias_dependency();
            (quote!{#variant_name(#member_type_token_stream)}, type_dependencies, count)
        }
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}

pub fn ts_type_literal_to_rust_struct(ts_type_ident: &Ident, ts_type_lit: &TsTypeLit, count: u32) -> (StructInfo, u32) {
    let fields: (Vec<(TokenStream, Vec<String>, Option<StructInfo>)>, u32) = ts_type_lit.members.iter().fold((vec![], count), |acc, member| {
        let result = parse_type_literal_fields(member, acc.1);
        let count = result.3;
        let result = vec![acc.0, vec![(result.0, result.1, result.2)]].concat();
        (result, count)
    });
    // let members: Vec<(TokenStream, Vec<String>)> = ts_type_lit.members.iter().map(|member| {
    //     parse_type_literal_members(member)
    // }).collect();
    let count = fields.1;
    let fields = fields.0;
    let member_token_streams = fields.iter().map(|field| field.0.clone());
    let type_dependencies = fields.iter().fold(vec![], |acc, field| vec![acc, field.1.clone()].concat());
    let inline_dependencies: Vec<StructInfo> = fields
        .iter()
        .fold(vec![], |acc, field|{
            match &field.2 {
                Some(struct_info) => vec![acc, vec![struct_info.clone()]].concat(),
                None => acc,
            }
        });
    let structure = quote!(
        #[derive(serde::Serialize, serde::Deserialize, Debug, candid::CandidType, Clone)]
        struct #ts_type_ident {
            #(#member_token_streams),*
        }
    );
    (StructInfo {
        structure,
        identifier: quote!(#ts_type_ident),
        name: ts_type_ident.to_string(),
        type_alias_dependencies: type_dependencies,
        inline_dependencies: Box::from(inline_dependencies)
    }, count)
}

fn parse_type_literal_field_name(prop_sig: &TsPropertySignature) -> Ident {
    format_ident!("{}", prop_sig.key.as_ident().unwrap().sym.chars().as_str())
}

fn parse_type_literal_field_type(prop_sig: &TsPropertySignature, count: u32) -> (RustType, u32) {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type_to_rust_type(&ts_type, count)
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
