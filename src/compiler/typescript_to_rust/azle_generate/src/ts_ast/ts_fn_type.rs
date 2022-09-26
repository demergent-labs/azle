use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsEntityName, TsFnParam, TsFnType, TsType, TsTypeAliasDecl};

use super::GetDependencies;

impl GetDependencies for TsFnType {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        let param_types = get_param_types(self);
        let return_type = match get_return_type(self) {
            Some(return_type) => vec![return_type],
            None => vec![],
        };
        vec![param_types, return_type]
            .concat()
            .iter()
            .fold(vec![], |acc, ts_type| {
                vec![
                    acc,
                    ts_type.get_dependent_types(type_alias_lookup, found_types),
                ]
                .concat()
            })
    }
}

pub fn get_param_types(function_type: &TsFnType) -> Vec<TsType> {
    function_type
        .params
        .iter()
        .fold(vec![], |acc, param| match param {
            TsFnParam::Ident(identifier) => match &identifier.type_ann {
                Some(param_type) => {
                    let ts_type = &*param_type.type_ann;
                    vec![acc, vec![ts_type.clone()]].concat()
                }
                None => panic!("Function parameter must have a return type"),
            },
            TsFnParam::Array(_) => todo!(),
            TsFnParam::Rest(_) => todo!(),
            TsFnParam::Object(_) => todo!(),
        })
}

pub fn get_return_type(function_type: &TsFnType) -> Option<TsType> {
    let thing = &*function_type.type_ann.type_ann;
    match thing {
        TsType::TsTypeRef(ts_type_ref) => {
            let thing = &ts_type_ref.type_name;
            match thing {
                TsEntityName::TsQualifiedName(_) => todo!(),
                TsEntityName::Ident(identifier) => {
                    let mode = identifier.sym.chars().as_str();
                    if mode != "Query" && mode != "Update" && mode != "Oneway" {
                        panic!("Func return type must be Query, Update, or Oneway")
                    }

                    if mode == "Oneway" {
                        None
                    } else {
                        match &ts_type_ref.type_params {
                            Some(type_param_inst) => {
                                if type_param_inst.params.len() != 1 {
                                    panic!("Func must specify exactly one return type")
                                }
                                match type_param_inst.params.get(0) {
                                    Some(param) => {
                                        let ts_type = &**param;
                                        Some(ts_type.clone())
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
