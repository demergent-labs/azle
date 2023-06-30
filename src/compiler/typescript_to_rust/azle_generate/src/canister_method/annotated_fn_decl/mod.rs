use cdk_framework::{act::node::canister_method::CanisterMethodType, traits::CollectIterResults};
use proc_macro2::Ident;
use quote::format_ident;
use swc_ecma_ast::{BindingIdent, FnDecl, Pat, TsType};

use crate::{
    canister_method::Annotation,
    errors::errors::{
        ArrayDestructuringInParamsNotSupported, ObjectDestructuringNotSupported,
        RestParametersNotSupported,
    },
    internal_error,
    traits::GetName,
    ts_ast::SourceMapped,
    Error,
};

pub use get_annotated_fn_decls::GetAnnotatedFnDecls;

use self::errors::{InvalidParams, MissingReturnType, ParamDefaultValue, UntypedParam};

use super::errors::MissingReturnTypeAnnotation;

mod get_annotated_fn_decls;

pub mod errors;

#[derive(Clone)]
pub struct AnnotatedFnDecl {
    pub annotation: Annotation,
    pub fn_decl: FnDecl,
}

impl SourceMapped<'_, AnnotatedFnDecl> {
    pub fn get_return_ts_type(&self) -> Result<&TsType, Error> {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => {
                let return_type = &*ts_type_ann.type_ann;

                let promise_return_type = if self.is_promise() {
                    let type_ref = match return_type.as_ts_type_ref() {
                        Some(type_ref) => type_ref,
                        None => internal_error!(), // Since it is a promise we know it's a type_ref
                    };
                    match &type_ref.type_params {
                        Some(type_param_instantiation) => &*type_param_instantiation.params[0],
                        None => {
                            return Err(MissingReturnType::from_annotated_fn_decl(
                                self, type_ref, "Promise",
                            )
                            .into())
                        }
                    }
                } else {
                    return_type
                };

                let manual_return_type = if self.is_manual() {
                    let inner_type_ref = match promise_return_type.as_ts_type_ref() {
                        Some(inner_type_ref) => inner_type_ref,
                        None => internal_error!(), // Since it is manual we know it's a type_ref
                    };
                    match &inner_type_ref.type_params {
                        Some(type_param_instantiation) => &type_param_instantiation.params[0],
                        None => {
                            return Err(MissingReturnType::from_annotated_fn_decl(
                                self,
                                inner_type_ref,
                                "Manual",
                            )
                            .into())
                        }
                    }
                } else {
                    promise_return_type
                };
                Ok(manual_return_type)
            }
            None => return Err(MissingReturnTypeAnnotation::from_annotated_fn_decl(self).into()),
        }
    }

    pub fn get_function_name(&self) -> String {
        self.fn_decl.ident.get_name()
    }

    pub fn get_param_name_idents(&self) -> Result<Vec<Ident>, Vec<Error>> {
        let param_idents = self.get_param_binding_idents()?;

        Ok(param_idents
            .iter()
            .map(|ident| format_ident!("{}", ident.get_name()))
            .collect())
    }

    pub fn get_param_binding_idents(&self) -> Result<Vec<&BindingIdent>, Vec<Error>> {
        self.fn_decl
            .function
            .params
            .iter()
            .map(|param| match &param.pat {
                Pat::Ident(ident) => Ok(ident),
                Pat::Array(array_pat) => Err(vec![Into::<Error>::into(
                    ArrayDestructuringInParamsNotSupported::from_annotated_fn_decl(self, array_pat),
                )]),
                Pat::Rest(rest_pat) => {
                    Err(vec![RestParametersNotSupported::from_annotated_fn_decl(
                        self, rest_pat,
                    )
                    .into()])
                }
                Pat::Object(object_pat) => Err(vec![
                    ObjectDestructuringNotSupported::from_annotated_fn_decl(self, object_pat)
                        .into(),
                ]),
                Pat::Assign(assign_pat) => Err(vec![ParamDefaultValue::from_annotated_fn_decl(
                    self, assign_pat,
                )
                .into()]),
                Pat::Invalid(_) => Err(vec![InvalidParams::from_annotated_fn_decl(self).into()]),
                Pat::Expr(_) => Err(vec![InvalidParams::from_annotated_fn_decl(self).into()]),
            })
            .collect_results()
    }

    pub fn get_param_ts_types(&self) -> Result<Vec<&TsType>, Vec<Error>> {
        let param_idents = self.get_param_binding_idents()?;

        param_idents
            .iter()
            .map(|ident| match &ident.type_ann {
                Some(ts_type_ann) => Ok(ts_type_ann.type_ann.as_ref()),
                None => {
                    return Err(vec![
                        UntypedParam::from_annotated_fn_decl(self, *ident).into()
                    ])
                }
            })
            .collect_results()
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
        let return_type = self
            .fn_decl
            .function
            .return_type
            .as_ref()
            .and_then(|ts_type_ann| match self.is_promise() {
                true => ts_type_ann
                    .type_ann
                    .as_ts_type_ref()
                    .and_then(|ts_type_ref| ts_type_ref.type_params.clone())
                    .and_then(|type_param_instantiation| {
                        Some(*type_param_instantiation.params[0].clone())
                    }),
                false => Some(*ts_type_ann.type_ann.clone()),
            });

        match return_type {
            Some(TsType::TsTypeRef(ts_type_ref)) => self
                .alias_table
                .manual
                .contains(&self.spawn(&ts_type_ref).get_name()),

            _ => false,
        }
    }

    pub fn is_promise(&self) -> bool {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(ts_type_ref) => ts_type_ref.type_name.get_name() == "Promise",
                _ => false,
            },
            None => false,
        }
    }
}
