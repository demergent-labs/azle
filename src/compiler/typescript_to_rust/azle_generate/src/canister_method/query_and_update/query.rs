use cdk_framework::act::node::canister_method::{CanisterMethod, CanisterMethodType, QueryMethod};

use super::shared::BuildCanisterMethods;
use crate::{Error, TsAst};

impl TsAst {
    pub fn build_query_methods(&self) -> Result<Vec<QueryMethod>, Vec<Error>> {
        let query_canister_methods = self
            .programs
            .build_canister_method_nodes(CanisterMethodType::Query);
        let query_methods =
            query_canister_methods
                .iter()
                .fold(vec![], |mut acc, canister_method| {
                    if let CanisterMethod::Query(query_method) = canister_method {
                        acc.push(query_method.clone());
                    }
                    acc
                });
        Ok(query_methods)
    }
}
