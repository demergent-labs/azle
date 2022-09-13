use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use super::ts_type::get_dependent_types_for_ts_type;

pub fn get_param_types(
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

pub fn get_return_type(
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
