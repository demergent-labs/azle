use quote::format_ident;
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{FnDecl, TsType};
use syn::Ident;

use super::{AzleTypeAliasDecl, GetDependencies};
use crate::cdk_act::CanisterMethodType;

mod canister_method_builder;

pub trait FnDeclHelperMethods {
    fn get_canister_method_return_type(&self) -> Option<&TsType>;
    fn get_fn_decl_function_name(&self) -> String;
    fn get_param_name_idents(&self) -> Vec<Ident>;
    fn get_param_ts_types(&self) -> Vec<TsType>;
    fn get_return_ts_type(&self) -> TsType;
    fn is_canister_method_type_fn_decl(&self, canister_method_type: &CanisterMethodType) -> bool;
    fn is_manual(&self) -> bool;
}

impl FnDeclHelperMethods for FnDecl {
    // TODO: Should be combined with `get_return_ts_type` below
    fn get_canister_method_return_type(&self) -> Option<&TsType> {
        let ts_type = &*self.function.return_type.as_ref().unwrap().type_ann;
        let type_ref = ts_type.as_ts_type_ref().unwrap();
        let type_param_instantiation_option = &type_ref.type_params.as_ref();
        match type_param_instantiation_option {
            Some(type_param_inst) => Some(&*type_param_inst.params[0]),
            None => None,
        }
    }

    // TODO: Should be combined with `get_canister_method_return_type` above
    fn get_return_ts_type(&self) -> TsType {
        let ts_type_ann = self.function.return_type.as_ref();
        let return_type_ann = ts_type_ann.clone().unwrap();
        let return_type_ref = return_type_ann.type_ann.as_ts_type_ref().unwrap();
        let return_type_params = return_type_ref.type_params.clone().unwrap();

        let return_ts_type = *return_type_params.params[0].clone();
        return_ts_type
    }

    fn get_fn_decl_function_name(&self) -> String {
        self.ident.sym.chars().as_str().to_string()
    }

    fn get_param_name_idents(&self) -> Vec<Ident> {
        self.function
            .params
            .iter()
            .map(|param| {
                format_ident!(
                    "{}",
                    param
                        .pat
                        .as_ident()
                        .unwrap()
                        .sym
                        .chars()
                        .as_str()
                        .to_string()
                )
            })
            .collect()
    }

    fn get_param_ts_types(&self) -> Vec<TsType> {
        let params = &self.function.params;
        params.iter().fold(vec![], |acc, param| {
            let param_type_ann = &param.pat.as_ident().unwrap().type_ann.as_ref();
            let param_type_ann = param_type_ann.clone().unwrap();
            let param_ts_type = *param_type_ann.type_ann.clone();

            vec![acc, vec![param_ts_type]].concat()
        })
    }

    fn is_canister_method_type_fn_decl(&self, canister_method_type: &CanisterMethodType) -> bool {
        if let Some(ts_type_ann) = &self.function.return_type {
            if ts_type_ann.type_ann.is_ts_type_ref() {
                let type_ref = ts_type_ann.type_ann.as_ts_type_ref().unwrap();

                if type_ref.type_name.is_ident() {
                    let ident = type_ref.type_name.as_ident().unwrap();
                    let method_type = ident.sym.chars().as_str();

                    match canister_method_type {
                        CanisterMethodType::Heartbeat => method_type == "Heartbeat",
                        CanisterMethodType::Init => method_type == "Init",
                        CanisterMethodType::InspectMessage => method_type == "InspectMessage",
                        CanisterMethodType::PostUpgrade => method_type == "PostUpgrade",
                        CanisterMethodType::PreUpgrade => method_type == "PreUpgrade",
                        CanisterMethodType::Query => {
                            method_type == "Query" || method_type == "QueryManual"
                        }
                        CanisterMethodType::Update => {
                            method_type == "Update" || method_type == "UpdateManual"
                        }
                    }
                } else {
                    false
                }
            } else {
                false
            }
        } else {
            false
        }
    }

    fn is_manual(&self) -> bool {
        let type_ann = self.function.return_type.as_ref().unwrap();
        match &*type_ann.type_ann {
            TsType::TsTypeRef(type_ref) => match &type_ref.type_name {
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    let mode = ident.sym.chars().as_str();

                    mode == "QueryManual" || mode == "UpdateManual"
                }
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => {
                    panic!("Qualified Names are not currently supported")
                }
            },
            _ => {
                panic!("Canister methods must have a return type of Query<T>, Update<T>, or Oneway")
            }
        }
    }
}

impl GetDependencies for Vec<FnDecl> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> HashSet<String> {
        // TODO the found types are resetting every once and a while. I am guessing it's as we start another function or maybe a different type in that function. Either way it might be slightly more efficient to continually build up the list to avoid redundancy
        self.iter().fold(found_types.clone(), |acc, fn_decl| {
            acc.union(&fn_decl.get_dependent_types(type_alias_lookup, &acc))
                .cloned()
                .collect()
        })
    }
}

impl GetDependencies for FnDecl {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> HashSet<String> {
        let return_types = self.get_return_ts_type();
        let param_types = self.get_param_ts_types();
        let ts_types = vec![vec![return_types], param_types].concat();

        ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
            acc.union(&ts_type.get_dependent_types(type_alias_lookup, &acc))
                .cloned()
                .collect()
        })
    }
}
