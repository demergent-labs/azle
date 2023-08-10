use cdk_framework::{
    act::node::canister_method::{CanisterMethodType, QueryMethod},
    traits::CollectIterResults,
};

use crate::{
    canister_method::AnnotatedFnDecl,
    ts_ast::{Program, SourceMapped},
    Error,
};

impl Program {
    pub fn build_query_methods(
        annotated_fn_decls: &Vec<SourceMapped<AnnotatedFnDecl>>,
    ) -> Result<Vec<QueryMethod>, Vec<Error>> {
        Ok(annotated_fn_decls
            .iter()
            .filter(|fn_decl| fn_decl.is_canister_method_type(CanisterMethodType::Query))
            .map(|query_fn_decl| query_fn_decl.to_definition())
            .collect_results()?
            .into_iter()
            .map(|definition| QueryMethod { definition })
            .collect())
    }
}
