use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
    vec,
};

use swc_ecma_ast::{FnDecl, TsArrayType, TsType, TsTypeAliasDecl, TsTypeLit, TsTypeRef};

use crate::generators::canister_methods::{get_param_ts_types, get_return_ts_type};

pub fn get_dependent_types_from_fn_decls(
    fn_decls: &Vec<FnDecl>,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    fn_decls.iter().fold(HashSet::new(), |acc, fn_decl| {
        acc.union(&get_dependent_types_from_fn_decl(
            fn_decl,
            possible_dependencies,
        ))
        .cloned()
        .collect()
    })
}

fn get_dependent_types_from_fn_decl(
    fn_decl: &FnDecl,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    let type_alias_lookup = generate_hash_map(possible_dependencies);
    let return_types = get_return_ts_type(fn_decl);
    let param_types = get_param_ts_types(fn_decl);
    let ts_types = vec![vec![return_types], param_types].concat();

    let result = ts_types.iter().fold(vec![], |acc, ts_type| {
        vec![
            acc,
            get_dependent_types_for_ts_type(ts_type, type_alias_lookup.clone()),
        ]
        .concat()
    });
    HashSet::from_iter(result.iter().cloned())
}

fn get_dependent_types_for_ts_type(
    ts_type: &TsType,
    type_alias_lookup: HashMap<String, TsTypeAliasDecl>,
) -> Vec<String> {
    match ts_type {
        swc_ecma_ast::TsType::TsKeywordType(_) => vec![],
        swc_ecma_ast::TsType::TsTypeRef(ts_type_ref) => {
            get_dependent_types_from_type_ref(ts_type_ref, type_alias_lookup)
        }
        swc_ecma_ast::TsType::TsTypeLit(ts_type_lit) => {
            get_dependent_types_from_ts_type_lit(ts_type_lit, type_alias_lookup)
        }
        swc_ecma_ast::TsType::TsArrayType(ts_array_type) => {
            get_dependent_types_from_array_type(ts_array_type, type_alias_lookup)
        }
        swc_ecma_ast::TsType::TsFnOrConstructorType(_) => todo!(),
        swc_ecma_ast::TsType::TsThisType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeQuery(_) => todo!(),
        swc_ecma_ast::TsType::TsTupleType(_) => todo!(),
        swc_ecma_ast::TsType::TsOptionalType(_) => todo!(),
        swc_ecma_ast::TsType::TsRestType(_) => todo!(),
        swc_ecma_ast::TsType::TsUnionOrIntersectionType(_) => todo!(),
        swc_ecma_ast::TsType::TsConditionalType(_) => todo!(),
        swc_ecma_ast::TsType::TsInferType(_) => todo!(),
        swc_ecma_ast::TsType::TsParenthesizedType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypeOperator(_) => todo!(),
        swc_ecma_ast::TsType::TsIndexedAccessType(_) => todo!(),
        swc_ecma_ast::TsType::TsMappedType(_) => todo!(),
        swc_ecma_ast::TsType::TsLitType(_) => todo!(),
        swc_ecma_ast::TsType::TsTypePredicate(_) => todo!(),
        swc_ecma_ast::TsType::TsImportType(_) => todo!(),
    }
}

fn generate_hash_map(
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

fn get_dependent_types_from_type_alias_decl(
    type_alias_decl: &TsTypeAliasDecl,
    type_alias_lookup: HashMap<String, TsTypeAliasDecl>,
) -> Vec<String> {
    get_dependent_types_for_ts_type(&*type_alias_decl.type_ann, type_alias_lookup)
}

fn get_dependent_types_from_type_ref(
    ts_type_ref: &TsTypeRef,
    type_alias_lookup: HashMap<String, TsTypeAliasDecl>,
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
        "Opt" => get_dependent_types_from_enclosing_type(ts_type_ref, type_alias_lookup),
        "Func" => get_dependent_types_from_enclosing_type(ts_type_ref, type_alias_lookup),
        "Variant" => get_dependent_types_from_enclosing_type(ts_type_ref, type_alias_lookup),
        _ => match type_alias_lookup.clone().get(type_name) {
            Some(decl) => vec![
                vec![type_name.to_string()],
                get_dependent_types_from_type_alias_decl(decl, type_alias_lookup),
            ]
            .concat(),
            None => vec![],
        },
    }
}

fn get_dependent_types_from_enclosing_type(
    ts_type_ref: &TsTypeRef,
    type_alias_lookup: HashMap<String, TsTypeAliasDecl>,
) -> Vec<String> {
    let type_params = &ts_type_ref.type_params;
    match type_params {
        Some(params) => {
            // TODO do we want to check that 0 is the only valid index?
            let enclosed_ts_type = &*params.params[0];
            get_dependent_types_for_ts_type(&enclosed_ts_type, type_alias_lookup)
        }
        None => vec![],
    }
}

fn get_dependent_types_from_array_type(
    ts_array_type: &TsArrayType,
    type_alias_lookup: HashMap<String, TsTypeAliasDecl>,
) -> Vec<String> {
    let elem_type = *ts_array_type.elem_type.clone();
    get_dependent_types_for_ts_type(&elem_type, type_alias_lookup)
}

fn get_dependent_types_from_ts_type_lit(
    ts_type_lit: &TsTypeLit,
    type_alias_lookup: HashMap<String, TsTypeAliasDecl>,
) -> Vec<String> {
    ts_type_lit.members.iter().fold(vec![], |acc, member| {
        match member.as_ts_property_signature() {
            Some(prop_sig) => {
                let type_ann = prop_sig.type_ann.clone().unwrap();
                let ts_type = *type_ann.type_ann.clone();
                vec![
                    acc,
                    get_dependent_types_for_ts_type(&ts_type, type_alias_lookup.clone()),
                ]
                .concat()
            }
            None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
        }
    })
}
