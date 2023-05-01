use cdk_framework::act::node::canister_method::CanisterMethodType;
use proc_macro2::Ident;
use quote::format_ident;
use swc_common::SourceMap;
use swc_ecma_ast::{BindingIdent, FnDecl, Pat, TsEntityName, TsType};

use crate::{canister_method::Annotation, traits::GetName};

pub use get_annotated_fn_decls::GetAnnotatedFnDecls;

mod get_annotated_fn_decls;

pub mod errors;

#[derive(Clone)]
pub struct AnnotatedFnDecl<'a> {
    pub annotation: Annotation,
    pub fn_decl: FnDecl,
    pub source_map: &'a SourceMap,
}

impl AnnotatedFnDecl<'_> {
    pub fn get_return_ts_type(&self) -> &TsType {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => {
                let return_type = &*ts_type_ann.type_ann;

                let promise_unwrapped_return_type = if self.is_promise() {
                    let type_ref = return_type.as_ts_type_ref().unwrap();
                    match &type_ref.type_params {
                        Some(type_param_instantiation) => &*type_param_instantiation.params[0],
                        None => {
                            panic!(
                                "{}",
                                self.build_missing_return_type_error_msg(type_ref.span, "Promise")
                            )
                        }
                    }
                } else {
                    return_type
                };

                let manual_unwrapped_return_type = if self.is_manual() {
                    let inner_type_ref = promise_unwrapped_return_type.as_ts_type_ref().unwrap();
                    match &inner_type_ref.type_params {
                        Some(type_param_instantiation) => &type_param_instantiation.params[0],
                        None => {
                            panic!(
                                "{}",
                                self.build_missing_return_type_error_msg(
                                    inner_type_ref.span,
                                    "Manual"
                                )
                            )
                        }
                    }
                } else {
                    promise_unwrapped_return_type
                };
                manual_unwrapped_return_type
            }
            None => panic!("{}", self.build_missing_return_annotation_error_msg()), //TODO: Improve this error message
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
    pub fn is_canister_method_type(&self, canister_method_type: CanisterMethodType) -> bool {
        self.annotation.method_type == canister_method_type
    }

    pub fn is_manual(&self) -> bool {
        let return_type = match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match self.is_promise() {
                true => match &ts_type_ann.type_ann.as_ts_type_ref().unwrap().type_params {
                    Some(type_param_instantiation) => &type_param_instantiation.params[0],
                    None => return false,
                },
                false => &*ts_type_ann.type_ann,
            },
            None => return false,
        };

        match return_type {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                TsEntityName::Ident(ident) => ident.get_name() == "Manual",
                TsEntityName::TsQualifiedName(_) => {
                    panic!("{}", self.build_qualified_type_error_msg(ts_type_ref.span))
                }
            },
            _ => false,
        }
    }

    pub fn is_promise(&self) -> bool {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                    TsEntityName::Ident(ident) => ident.get_name() == "Promise",
                    TsEntityName::TsQualifiedName(_) => {
                        panic!("{}", self.build_qualified_type_error_msg(ts_type_ref.span))
                    }
                },
                _ => false,
            },
            None => false,
        }
    }
}
