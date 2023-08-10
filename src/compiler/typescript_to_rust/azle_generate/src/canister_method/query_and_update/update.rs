use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, UpdateMethod},
    traits::CollectIterResults,
};

use crate::{
    canister_method::AnnotatedFnDecl,
    ts_ast::{Program, SourceMapped},
    Error,
};

impl Program {
    pub fn build_update_methods(
        annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
    ) -> Result<Vec<UpdateMethod>, Vec<Error>> {
        let update_methods = annotated_fn_decls
            .iter()
            .filter(|fn_decl| fn_decl.is_canister_method_type(CanisterMethodType::Update))
            .map(|update_fn_decl| update_fn_decl.to_definition())
            .collect_results()?
            .into_iter()
            .map(|definition| UpdateMethod { definition })
            .collect();

        Ok(update_methods)
    }
}
