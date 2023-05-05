use cdk_framework::act::node::canister_method::{CanisterMethodType, QueryMethod};

use crate::{canister_method::AnnotatedFnDecl, Error, TsAst};

impl TsAst {
    pub fn build_query_methods(
        &self,
        annotated_fn_decls: &Vec<AnnotatedFnDecl>,
    ) -> Result<Vec<QueryMethod>, Vec<Error>> {
        let query_methods = annotated_fn_decls
            .iter()
            .filter(|fn_decl| fn_decl.is_canister_method_type(CanisterMethodType::Query))
            .map(|query_fn_decl| query_fn_decl.to_definition())
            .map(|definition| QueryMethod { definition })
            .collect();

        Ok(query_methods)
    }
}
