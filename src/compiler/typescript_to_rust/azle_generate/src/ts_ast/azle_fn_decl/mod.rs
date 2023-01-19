use cdk_framework::CanisterMethodType;
use quote::format_ident;
use swc_common::SourceMap;
use swc_ecma_ast::{BindingIdent, FnDecl, Pat, TsEntityName, TsType, TsTypeRef};
use syn::Ident;

use crate::ts_ast::GetName;

pub mod canister_method_builder;
pub mod errors;
pub mod get_dependencies;

#[derive(Clone)]
pub struct AzleFnDecl<'a> {
    pub fn_decl: FnDecl,
    pub source_map: &'a SourceMap,
}

impl AzleFnDecl<'_> {
    pub fn get_canister_method_type(&self) -> &str {
        let return_type_ref = self.get_return_type_ref();
        match &return_type_ref.type_name {
            TsEntityName::Ident(ident) => ident.get_name(),
            TsEntityName::TsQualifiedName(_) => {
                panic!(
                    "{}",
                    self.build_qualified_type_error_msg(return_type_ref.span)
                )
            }
        }
    }

    pub fn get_return_type_ref(&self) -> &TsTypeRef {
        let outermost_type_ref = match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(type_ref) => type_ref,
                _ => panic!("{}", self.build_non_type_ref_return_type_error_msg()),
            },
            None => panic!("{}", self.build_missing_return_annotation_error_msg()),
        };

        if self.is_promise() {
            outermost_type_ref.type_params.as_ref().unwrap().params[0]
                .as_ts_type_ref()
                .unwrap()
        } else {
            outermost_type_ref
        }
    }

    pub fn get_return_ts_type(&self) -> &TsType {
        let type_ref = &self.get_return_type_ref();

        match &type_ref.type_params {
            Some(type_param_instantiation) => {
                let return_type = &*type_param_instantiation.params[0];
                if self.is_manual() {
                    match return_type {
                        TsType::TsTypeRef(ts_type_ref) => {
                            &ts_type_ref.type_params.as_ref().unwrap().params[0]
                        }
                        _ => panic!("Manual types must specify an inner type"),
                    }
                } else {
                    return_type
                }
            }
            None => {
                let canister_method_type = self.get_canister_method_type();
                let error_message =
                    self.build_missing_return_type_error_msg(type_ref.span, canister_method_type);
                panic!("{}", error_message)
            }
        }
    }

    pub fn get_function_name(&self) -> String {
        self.fn_decl.ident.get_name().to_string()
    }

    pub fn get_param_name_idents(&self) -> Vec<Ident> {
        let param_idents = self.get_param_binding_idents();

        param_idents
            .iter()
            .map(|ident| format_ident!("{}", ident.get_name().to_string()))
            .collect()
    }

    pub fn get_param_binding_idents(&self) -> Vec<&BindingIdent> {
        self.fn_decl
            .function
            .params
            .iter()
            .map(|param| match &param.pat {
                Pat::Ident(ident) => ident,
                Pat::Array(_) => panic!("{}", self.build_array_destructure_error_msg(param)),
                Pat::Rest(_) => panic!("{}", self.build_rest_param_error_msg(param)),
                Pat::Object(_) => panic!("{}", self.build_object_destructure_error_msg(param)),
                Pat::Assign(assign_pat) => {
                    panic!("{}", self.build_param_default_value_error_msg(assign_pat))
                }
                Pat::Invalid(_) => panic!("{}", self.build_invalid_param_error_msg()),
                Pat::Expr(_) => panic!("{}", self.build_invalid_param_error_msg()),
            })
            .collect()
    }

    pub fn get_param_ts_types(&self) -> Vec<&TsType> {
        let param_idents = self.get_param_binding_idents();

        param_idents
            .iter()
            .fold(vec![], |acc, ident| match &ident.type_ann {
                Some(ts_type_ann) => vec![acc, vec![&ts_type_ann.type_ann]].concat(),
                None => panic!("{}", self.build_untyped_param_error_msg(*ident)),
            })
    }

    /// Returns whether the fn_decl is of the provided type.
    ///
    /// **Note:** This method shouldn't panic even if it is missing a return
    /// type because it is called to filter all fn_decls, including those that
    /// aren't canister methods.
    pub fn is_canister_method_type(&self, canister_method_type: &CanisterMethodType) -> bool {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(type_ref) => {
                    let type_ref = if self.is_promise() {
                        let type_params = &type_ref.type_params.as_ref().unwrap().params;
                        let return_type_ref = type_params[0].as_ts_type_ref().unwrap();

                        return_type_ref
                    } else {
                        type_ref
                    };

                    match &type_ref.type_name {
                        TsEntityName::Ident(ident) => {
                            let method_type = ident.get_name();
                            match canister_method_type {
                                // TODO: Consider that these names may not come from azle. For example:
                                // ```
                                // import { Query } from 'not_azle';
                                // export function example(): Query<string> {...}
                                // ```
                                CanisterMethodType::Heartbeat => method_type == "Heartbeat",
                                CanisterMethodType::Init => method_type == "Init",
                                CanisterMethodType::InspectMessage => {
                                    method_type == "InspectMessage"
                                }
                                CanisterMethodType::PostUpgrade => method_type == "PostUpgrade",
                                CanisterMethodType::PreUpgrade => method_type == "PreUpgrade",
                                CanisterMethodType::Query => method_type == "Query",
                                CanisterMethodType::Update => method_type == "Update",
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
                    }
                }
                _ => false,
            },
            None => false,
        }
    }

    pub fn is_manual(&self) -> bool {
        let return_type_ref = self.get_return_type_ref();

        match &return_type_ref.type_params {
            Some(ts_type_param_instantiation) => {
                match ts_type_param_instantiation.params.get(0) {
                    Some(param) => {
                        match &**param {
                            TsType::TsTypeRef(ts_type_ref) => {
                                match &ts_type_ref.type_name {
                                    TsEntityName::Ident(ident) => {
                                        ident.get_name() == "Manual"
                                    },
                                    TsEntityName::TsQualifiedName(_) => panic!("Namespace-qualified identifiers are not currently supported in canister methods"),
                                }
                            },
                            _ => false
                        }
                    },
                    None => false
                }
            }
            None => false,
        }
    }

    pub fn is_promise(&self) -> bool {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => {
                match &*ts_type_ann.type_ann {
                    TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_params {
                        Some(ts_type_param_instantiation) => match &ts_type_ref.type_name {
                            TsEntityName::Ident(ident) => {
                                ident.get_name() == "Promise"
                                    && ts_type_param_instantiation.params[0].is_ts_type_ref()
                                // TODO this needs to be a bit more in-depth, it also needs to be one of the canister types
                                // TODO the problem is that other dependencies might use Promise<T> as a return type
                            }
                            _ => false,
                        },
                        None => false,
                    },
                    _ => false,
                }
            }
            None => {
                eprintln!("definitely false");
                false
            }
        }
    }
}
