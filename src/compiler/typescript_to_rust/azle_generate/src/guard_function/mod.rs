use cdk_framework::act::node::GuardFunction;
use std::ops::Deref;
use swc_ecma_ast::FnDecl;

use crate::{traits::GetName, ts_ast::SourceMapped, TsAst};
use get_fn_decls::GetProgramFnDecls;

mod get_fn_decls;
mod rust;

impl TsAst {
    pub fn build_guard_functions(&self) -> Vec<GuardFunction> {
        self.programs
            .get_fn_decls()
            .iter()
            .filter(|fn_decl| fn_decl.has_guard_result_return_type())
            .map(|fn_decl| {
                let name = fn_decl.ident.get_name().to_string();
                let body = rust::generate(&name);

                GuardFunction { name, body }
            })
            .collect()
    }
}

impl SourceMapped<'_, FnDecl> {
    pub fn has_guard_result_return_type(&self) -> bool {
        self.function
            .return_type
            .as_ref()
            .and_then(|ts_type_ann| ts_type_ann.type_ann.deref().as_ts_type_ref())
            .and_then(|ts_type_ref| ts_type_ref.type_name.as_ident())
            .map(|ident| ident.get_name() == "GuardResult")
            .unwrap_or(false)
    }
}
