use cdk_framework::act::node::GuardFunction;

use crate::{
    ts_ast::{azle_program::HelperMethods, GetName},
    TsAst,
};

mod fn_decl;
mod rust;

impl TsAst {
    pub fn build_guard_functions(&self) -> Vec<GuardFunction> {
        self.azle_programs
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
