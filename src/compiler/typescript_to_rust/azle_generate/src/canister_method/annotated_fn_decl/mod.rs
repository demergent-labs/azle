use cdk_framework::act::node::canister_method::CanisterMethodType;
use proc_macro2::Ident;
use quote::format_ident;
use swc_common::SourceMap;
use swc_ecma_ast::{BindingIdent, FnDecl, Pat, TsEntityName, TsType};

use crate::{
    canister_method::Annotation,
    errors::{
        errors::{
            ArrayDestructuringInParamsNotSupported, ObjectDestructuringNotSupported,
            RestParametersNotSupported,
        },
        CollectResults,
    },
    traits::GetName,
    Error,
};

pub use get_annotated_fn_decls::GetAnnotatedFnDecls;

use self::errors::{
    InvalidParams, MissingReturnType, ParamDefaultValue, QualifiedType, UntypedParam,
};

use super::errors::MissingReturnTypeAnnotation;

mod get_annotated_fn_decls;

pub mod errors;

#[derive(Clone)]
pub struct AnnotatedFnDecl<'a> {
    pub annotation: Annotation,
    pub fn_decl: FnDecl,
    pub source_map: &'a SourceMap,
}

impl AnnotatedFnDecl<'_> {
    pub fn get_return_ts_type(&self) -> Result<&TsType, Error> {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => {
                let return_type = &*ts_type_ann.type_ann;

                let promise_unwrapped_return_type = if self.is_promise()? {
                    // UNWRAP HERE
                    let type_ref = return_type.as_ts_type_ref().unwrap();
                    match &type_ref.type_params {
                        Some(type_param_instantiation) => &*type_param_instantiation.params[0],
                        None => return Err(MissingReturnType::from_annotated_fn_decl(self).into()), // formerly called with (type_ref.span, "Promise")
                    }
                } else {
                    return_type
                };

                let manual_unwrapped_return_type = if self.is_manual()? {
                    // UNWRAP HERE
                    let inner_type_ref = promise_unwrapped_return_type.as_ts_type_ref().unwrap();
                    match &inner_type_ref.type_params {
                        Some(type_param_instantiation) => &type_param_instantiation.params[0],
                        None => return Err(MissingReturnType::from_annotated_fn_decl(self).into()), // formerly called with (inner_type_ref.span, "Manual")
                    }
                } else {
                    promise_unwrapped_return_type
                };
                Ok(manual_unwrapped_return_type)
            }
            None => return Err(MissingReturnTypeAnnotation::from_annotated_fn_decl(self).into()),
        }
    }

    pub fn get_function_name(&self) -> String {
        self.fn_decl.ident.get_name().to_string()
    }

    pub fn get_param_name_idents(&self) -> Result<Vec<Ident>, Vec<Error>> {
        let param_idents = self.get_param_binding_idents()?;

        Ok(param_idents
            .iter()
            .map(|ident| format_ident!("{}", ident.get_name().to_string()))
            .collect())
    }

    pub fn get_param_binding_idents(&self) -> Result<Vec<&BindingIdent>, Vec<Error>> {
        self.fn_decl
            .function
            .params
            .iter()
            .map(|param| match &param.pat {
                Pat::Ident(ident) => Ok(ident),
                Pat::Array(_) => Err(vec![Into::<Error>::into(
                    ArrayDestructuringInParamsNotSupported::from_annotated_fn_decl(self),
                )]),
                Pat::Rest(_) => Err(vec![RestParametersNotSupported::from_annotated_fn_decl(
                    self,
                )
                .into()]),
                Pat::Object(_) => Err(vec![
                    ObjectDestructuringNotSupported::from_annotated_fn_decl(self).into(),
                ]),
                Pat::Assign(_assign_pat) => {
                    Err(vec![ParamDefaultValue::from_annotated_fn_decl(self).into()])
                }
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
                None => return Err(vec![UntypedParam::from_annotated_fn_decl(self).into()]), // Called with *ident
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

    pub fn is_manual(&self) -> Result<bool, Error> {
        let return_type = match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match self.is_promise()? {
                // UNWRAP HERE
                true => match &ts_type_ann.type_ann.as_ts_type_ref().unwrap().type_params {
                    Some(type_param_instantiation) => &type_param_instantiation.params[0],
                    None => return Ok(false),
                },
                false => &*ts_type_ann.type_ann,
            },
            None => return Ok(false),
        };

        match return_type {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                TsEntityName::Ident(ident) => Ok(ident.get_name() == "Manual"),
                TsEntityName::TsQualifiedName(_) => {
                    return Err(QualifiedType::from_annotated_fn_decl(self).into())
                }
            },
            _ => Ok(false),
        }
    }

    pub fn is_promise(&self) -> Result<bool, Error> {
        match &self.fn_decl.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                    TsEntityName::Ident(ident) => Ok(ident.get_name() == "Promise"),
                    TsEntityName::TsQualifiedName(_) => {
                        return Err(QualifiedType::from_annotated_fn_decl(self).into())
                    }
                },
                _ => Ok(false),
            },
            None => Ok(false),
        }
    }
}
