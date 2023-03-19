use cdk_framework::act::node::GuardFunction;
use quote::quote;
use swc_ecma_ast::FnDecl;

use crate::{
    ts_ast::{azle_program::HelperMethods, source_map::SourceMapped, GetName},
    TsAst,
};

impl TsAst {
    pub fn build_guard_functions(&self) -> Vec<GuardFunction> {
        self.azle_programs
            .get_fn_decls()
            .iter()
            .filter(|fn_decl| fn_decl.has_guard_result_return_type())
            .map(|fn_decl| {
                let name = fn_decl.ident.get_name().to_string();

                // TODO: Construct a function body for these guard functions

                GuardFunction {
                    name,
                    body: quote! {Ok(())},
                }
            })
            .collect()
    }
}

impl SourceMapped<'_, FnDecl> {
    pub fn has_guard_result_return_type(&self) -> bool {
        match &self.function.return_type {
            Some(ts_type_ann) => match &*ts_type_ann.type_ann {
                swc_ecma_ast::TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                    swc_ecma_ast::TsEntityName::Ident(ident) => ident.get_name() != "GuardResult",
                    swc_ecma_ast::TsEntityName::TsQualifiedName(_) => false,
                },
                _ => false,
            },
            None => false,
        }
    }
}
