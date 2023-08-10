use cdk_framework::act::node::GuardFunction;
use std::ops::Deref;
use swc_ecma_ast::{FnDecl, TsEntityName};

use crate::{
    traits::GetName,
    ts_ast::{Program, SourceMapped},
};

mod get_fn_decls;
mod rust;

impl Program {
    pub fn build_guard_functions(&self) -> Vec<GuardFunction> {
        self.get_fn_decls()
            .iter()
            .filter(|fn_decl| fn_decl.has_guard_result_return_type())
            .map(|fn_decl| {
                let name = fn_decl.ident.get_name();
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
            .map(|ts_type_ref| {
                let name = match &ts_type_ref.type_name {
                    TsEntityName::TsQualifiedName(qualified_name) => qualified_name.get_name(),
                    TsEntityName::Ident(ident) => ident.get_name(),
                };
                self.alias_table.guard_result.contains(&name)
            })
            .unwrap_or(false)
    }
}
