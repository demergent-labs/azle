use cdk_framework::act::node::canister_method::{CanisterMethod, CanisterMethodType, UpdateMethod};

use super::shared::BuildCanisterMethods;
use crate::{Error, TsAst};

impl TsAst {
    pub fn build_update_methods(&self) -> Result<Vec<UpdateMethod>, Vec<Error>> {
        let update_canister_methods = self
            .programs
            .build_canister_method_nodes(CanisterMethodType::Update);
        let update_methods =
            update_canister_methods
                .iter()
                .fold(vec![], |mut acc, canister_method| {
                    if let CanisterMethod::Update(update_method) = canister_method {
                        acc.push(update_method.clone());
                    }
                    acc
                });
        Ok(update_methods)
    }
}
