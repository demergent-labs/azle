use quote::format_ident;
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{BindingIdent, FnDecl, Pat, TsEntityName, TsType, TsTypeRef};
use syn::Ident;

use super::{AzleTypeAliasDecl, GetDependencies};
use crate::cdk_act::CanisterMethodType;
use errors::FnDeclErrors;

mod canister_method_builder;
mod errors;

pub trait FnDeclHelperMethods {
    fn get_canister_method_type(&self) -> &str;
    fn get_function_name(&self) -> String;
    fn get_param_binding_idents(&self) -> Vec<&BindingIdent>;
    fn get_param_name_idents(&self) -> Vec<Ident>;
    fn get_param_ts_types(&self) -> Vec<&TsType>;
    fn get_return_type_ref(&self) -> &TsTypeRef;
    fn get_return_ts_type(&self) -> &TsType;
    fn is_canister_method_type(&self, canister_method_type: &CanisterMethodType) -> bool;
    fn is_manual(&self) -> bool;
}

impl FnDeclHelperMethods for FnDecl {
    fn get_canister_method_type(&self) -> &str {
        match &self.get_return_type_ref().type_name {
            TsEntityName::Ident(ident) => ident.sym.chars().as_str(),
            TsEntityName::TsQualifiedName(_) => panic!("{}", self.build_qualified_type_error_msg()),
        }
    }

    fn get_return_type_ref(&self) -> &TsTypeRef {
        match &self.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(type_ref) => &type_ref,
                _ => panic!("{}", self.build_non_type_ref_return_type_error_msg()),
            },
            None => panic!("{}", self.build_missing_return_annotation_error_msg()),
        }
    }

    fn get_return_ts_type(&self) -> &TsType {
        let type_ref = &self.get_return_type_ref();
        match &type_ref.type_params {
            Some(type_param_instantiation) => &*type_param_instantiation.params[0],
            None => {
                let canister_method_type = self.get_canister_method_type();
                let error_message = self.build_missing_return_type_error_msg(canister_method_type);
                panic!("{}", error_message)
            }
        }
    }

    fn get_function_name(&self) -> String {
        self.ident.sym.chars().as_str().to_string()
    }

    fn get_param_name_idents(&self) -> Vec<Ident> {
        let param_idents = self.get_param_binding_idents();

        param_idents
            .iter()
            .map(|ident| format_ident!("{}", ident.sym.chars().as_str().to_string()))
            .collect()
    }

    fn get_param_binding_idents(&self) -> Vec<&BindingIdent> {
        self.function
            .params
            .iter()
            .map(|param| match &param.pat {
                Pat::Ident(ident) => ident,
                Pat::Array(_) => panic!("{}", self.build_array_destructure_error_msg()),
                Pat::Rest(_) => panic!("{}", self.build_rest_param_error_msg()),
                Pat::Object(_) => panic!("{}", self.build_object_destructure_error_msg()),
                Pat::Assign(_) => panic!("{}", self.build_param_default_value_error_msg()),
                Pat::Invalid(_) => panic!("{}", self.build_invalid_param_error_msg()),
                Pat::Expr(_) => panic!("{}", self.build_invalid_param_error_msg()),
            })
            .collect()
    }

    fn get_param_ts_types(&self) -> Vec<&TsType> {
        let param_idents = self.get_param_binding_idents();

        param_idents
            .iter()
            .fold(vec![], |acc, ident| match &ident.type_ann {
                Some(ts_type_ann) => vec![acc, vec![&ts_type_ann.type_ann]].concat(),
                None => panic!("{}", self.build_untyped_param_error_msg()),
            })
    }

    /// Returns whether the fn_decl is of the provided type.
    ///
    /// **Note:** This method shouldn't panic even if it is missing a return
    /// type because it is called to filter all fn_decls, including those that
    /// aren't canister methods.
    fn is_canister_method_type(&self, canister_method_type: &CanisterMethodType) -> bool {
        match &self.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(type_ref) => match &type_ref.type_name {
                    TsEntityName::Ident(ident) => {
                        let method_type = ident.sym.chars().as_str();
                        match canister_method_type {
                            // TODO: Consider that these names may not come from azle. For example:
                            // ```
                            // import { Query } from 'not_azle';
                            // export function example(): Query<string> {...}
                            // ```
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
                    }
                    TsEntityName::TsQualifiedName(_) => {
                        // TODO: Consider that azle may have been imported with a wildcard import
                        // and should still be valid. For example:
                        // ```
                        // import * as Azle from 'azle';
                        // export function example(): Azle.Query<string> {...}
                        // ```
                        false
                    }
                },
                _ => false,
            },
            None => false,
        }
    }

    fn is_manual(&self) -> bool {
        let canister_method_type = self.get_canister_method_type();

        canister_method_type == "QueryManual" || canister_method_type == "UpdateManual"
    }
}

impl GetDependencies for Vec<FnDecl> {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        // TODO the found types are resetting every once and a while. I am guessing it's as we start another function or maybe a different type in that function. Either way it might be slightly more efficient to continually build up the list to avoid redundancy
        self.iter().fold(found_type_names.clone(), |acc, fn_decl| {
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
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        let return_types = self.get_return_ts_type();
        let param_types = self.get_param_ts_types();
        let ts_types = vec![vec![return_types], param_types].concat();

        ts_types
            .iter()
            .fold(found_type_names.clone(), |acc, ts_type| {
                acc.union(&ts_type.get_dependent_types(type_alias_lookup, &acc))
                    .cloned()
                    .collect()
            })
    }
}
