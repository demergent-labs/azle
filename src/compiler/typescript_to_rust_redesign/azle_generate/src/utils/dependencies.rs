use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
    vec,
};

use swc_ecma_ast::{
    FnDecl, TsArrayType, TsFnOrConstructorType, TsMethodSignature, TsType, TsTypeAliasDecl,
    TsTypeLit, TsTypeRef,
};

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

pub fn get_dependent_types_from_canister_decls(
    canister_decls: &Vec<TsTypeAliasDecl>,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    canister_decls
        .iter()
        .fold(HashSet::new(), |acc, canister_decl| {
            acc.union(&get_dependent_types_from_canister_decl(
                canister_decl,
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

fn get_dependent_types_from_canister_decl(
    canister_decl: &TsTypeAliasDecl,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> HashSet<String> {
    let type_alias_lookup = generate_hash_map(possible_dependencies);

    // Verify that it is a canister
    let is_canister = canister_decl.type_ann.is_ts_type_ref()
        && canister_decl
            .type_ann
            .as_ts_type_ref()
            .unwrap()
            .type_name
            .as_ident()
            .unwrap()
            .sym
            .chars()
            .as_str()
            == "Canister";
    if !is_canister {
        panic!("Expecting Canister")
    }
    // Get the tstypeliteral out of it
    let ts_type_lit = &*canister_decl
        .type_ann
        .as_ts_type_ref()
        .unwrap()
        .type_params
        .as_ref()
        .unwrap()
        .params[0];
    let ts_type_lit = ts_type_lit.as_ts_type_lit().unwrap();

    // Look at the members
    // Make sure that all of the members are tsMethodSignators and not tsPropertySignatures
    let ts_types = ts_type_lit
        .members
        .iter()
        .fold(vec![], |acc, member| match member {
            swc_ecma_ast::TsTypeElement::TsMethodSignature(method_sig) => {
                let return_types = get_return_ts_type_from_method(method_sig);
                let param_types = get_param_ts_types_from_method(method_sig);
                vec![acc, vec![return_types], param_types].concat()
            }
            _ => todo!("There should only be Method Signatures on a Canister type?"),
        });

    // Get the goods out of a method signature
    ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
        let result = HashSet::from_iter(
            get_dependent_types_for_ts_type(ts_type, &type_alias_lookup, &acc)
                .iter()
                .cloned(),
        );
        acc.union(&result).cloned().collect()
    })
}

fn get_return_ts_type_from_method(method_sig: &TsMethodSignature) -> TsType {
    let ts_type_ann = method_sig.type_ann.as_ref();
    let return_type_ann = ts_type_ann.clone().unwrap();
    let return_type_ref = return_type_ann.type_ann.as_ts_type_ref().unwrap();
    let return_type_params = return_type_ref.type_params.clone().unwrap();

    let return_ts_type = *return_type_params.params[0].clone();
    return_ts_type
}

fn get_param_ts_types_from_method(method_sig: &TsMethodSignature) -> Vec<TsType> {
    let params = &method_sig.params;
    params.iter().fold(vec![], |acc, param| {
        let param_type_ann = &param.as_ident().unwrap().type_ann.as_ref();
        let param_type_ann = param_type_ann.clone().unwrap();
        let param_ts_type = *param_type_ann.type_ann.clone();

        vec![acc, vec![param_ts_type]].concat()
    })
}

fn get_dependent_types_for_ts_type(
    ts_type: &TsType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    match ts_type {
        swc_ecma_ast::TsType::TsKeywordType(_) => vec![],
        swc_ecma_ast::TsType::TsTypeRef(ts_type_ref) => {
            get_dependent_types_from_type_ref(ts_type_ref, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsTypeLit(ts_type_lit) => {
            get_dependent_types_from_ts_type_lit(ts_type_lit, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsArrayType(ts_array_type) => {
            get_dependent_types_from_array_type(ts_array_type, type_alias_lookup, found_types)
        }
        swc_ecma_ast::TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
            get_dependent_types_from_ts_fn_or_constructor_type(
                ts_fn_or_constructor_type,
                type_alias_lookup,
                found_types,
            )
        }
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

fn get_dependent_types_from_ts_fn_or_constructor_type(
    ts_fn_or_constructor_type: &TsFnOrConstructorType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    match ts_fn_or_constructor_type {
        TsFnOrConstructorType::TsFnType(ts_fn_type) => {
            let param_types = get_param_types(ts_fn_type, type_alias_lookup, found_types);
            let return_type = get_return_type(ts_fn_type, type_alias_lookup, found_types);
            vec![return_type, param_types].concat()
        }
        TsFnOrConstructorType::TsConstructorType(_) => todo!(),
    }
}

fn get_param_types(
    function_type: &swc_ecma_ast::TsFnType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    function_type
        .params
        .iter()
        .fold(vec![], |acc, param| match param {
            swc_ecma_ast::TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => {
                    let ts_type = &*param_type.type_ann;
                    vec![
                        acc,
                        get_dependent_types_for_ts_type(ts_type, type_alias_lookup, found_types),
                    ]
                    .concat()
                }
                None => panic!("Function parameter must have a return type"),
            },
            swc_ecma_ast::TsFnParam::Array(_) => todo!(),
            swc_ecma_ast::TsFnParam::Rest(_) => todo!(),
            swc_ecma_ast::TsFnParam::Object(_) => todo!(),
        })
}

fn get_return_type(
    function_type: &swc_ecma_ast::TsFnType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    let thing = &*function_type.type_ann.type_ann;
    match thing {
        TsType::TsTypeRef(ts_type_ref) => {
            let thing = &ts_type_ref.type_name;
            match thing {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => todo!(),
                swc_ecma_ast::TsEntityName::Ident(identifier) => {
                    let mode = identifier.sym.chars().as_str();
                    if mode != "Query" && mode != "Update" && mode != "Oneway" {
                        panic!("Func return type must be Query, Update, or Oneway")
                    }

                    if mode == "Oneway" {
                        vec![]
                    } else {
                        match &ts_type_ref.type_params {
                            Some(type_param_inst) => {
                                if type_param_inst.params.len() != 1 {
                                    panic!("Func must specify exactly one return type")
                                }
                                match type_param_inst.params.get(0) {
                                    Some(param) => {
                                        let ts_type = &**param;
                                        get_dependent_types_for_ts_type(
                                            &ts_type,
                                            type_alias_lookup,
                                            found_types,
                                        )
                                    }
                                    None => panic!("Func must specify exactly one return type"),
                                }
                            }
                            None => panic!("Func must specify a return type"),
                        }
                    }
                }
            }
        }
        _ => todo!("Handle if it's not a query or update or oneway"),
    }
}

fn get_dependent_types_from_type_alias_decl(
    type_alias_decl: &TsTypeAliasDecl,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    get_dependent_types_for_ts_type(&*type_alias_decl.type_ann, type_alias_lookup, found_types)
}

fn get_dependent_types_from_type_ref(
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
                        get_dependent_types_from_type_alias_decl(
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
            get_dependent_types_for_ts_type(&enclosed_ts_type, type_alias_lookup, found_types)
        }
        None => vec![],
    }
}

fn get_dependent_types_from_array_type(
    ts_array_type: &TsArrayType,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    let elem_type = *ts_array_type.elem_type.clone();
    get_dependent_types_for_ts_type(&elem_type, type_alias_lookup, found_types)
}

fn get_dependent_types_from_ts_type_lit(
    ts_type_lit: &TsTypeLit,
    type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> Vec<String> {
    ts_type_lit.members.iter().fold(vec![], |acc, member| {
        match member.as_ts_property_signature() {
            Some(prop_sig) => {
                let type_ann = prop_sig.type_ann.clone().unwrap();
                let ts_type = *type_ann.type_ann.clone();
                vec![
                    acc,
                    get_dependent_types_for_ts_type(&ts_type, type_alias_lookup, found_types),
                ]
                .concat()
            }
            None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
        }
    })
}
