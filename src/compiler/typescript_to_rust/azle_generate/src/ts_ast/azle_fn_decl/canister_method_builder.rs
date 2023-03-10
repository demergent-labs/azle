use cdk_framework::act::node::{
    canister_method::{CanisterMethodType, QueryMethod, QueryOrUpdateDefinition, UpdateMethod},
    CandidType, CanisterMethod, Param,
};

use super::AzleFnDecl;
use crate::{generators::canister_methods::query_and_update, ts_ast::azle_type::AzleType};

impl<'a> AzleFnDecl<'a> {
    pub fn build_canister_method_node(
        &self,
        canister_method_type: &CanisterMethodType,
    ) -> CanisterMethod {
        let body = query_and_update::generate_query_and_update_body(&self);
        let is_manual = self.is_manual();
        let is_async = self.is_promise();
        let name = self.get_function_name();
        let params = self.build_params();
        let return_type = self.build_return_type();

        match canister_method_type {
            CanisterMethodType::Query => CanisterMethod::Query(QueryMethod {
                definition: QueryOrUpdateDefinition::new(
                    is_async,
                    is_manual,
                    None,
                    name,
                    params,
                    return_type,
                    body,
                    "azle".to_string(),
                ),
            }),
            CanisterMethodType::Update => CanisterMethod::Update(UpdateMethod {
                definition: QueryOrUpdateDefinition::new(
                    is_async,
                    is_manual,
                    None,
                    name,
                    params,
                    return_type,
                    body,
                    "azle".to_string(),
                ),
            }),
            _ => panic!("TODO: YOU SHOULDN'T BE TRYING TO PARSE NON QUERY/UPDATE METHODS HERE!"),
        }
    }

    pub fn build_params(&self) -> Vec<Param> {
        let names = self.get_param_name_idents();
        let types = build_param_types(&self);
        names
            .iter()
            .enumerate()
            .map(|(i, name)| Param {
                name: name.clone().to_string(),
                candid_type: types[i].clone(),
            })
            .collect()
    }

    fn build_return_type(&self) -> CandidType {
        let return_ts_type = self.get_return_ts_type();
        let return_azle_type = AzleType::from_ts_type(return_ts_type.clone(), self.source_map);
        return_azle_type.to_data_type()
    }
}

// TODO why isn't this on the trait? and for that matter why is it separated
// from the get name. It would be much simpler imho to get the names and the
// params all in the same pass
fn build_param_types(azle_fn_decl: &AzleFnDecl) -> Vec<CandidType> {
    azle_fn_decl
        .get_param_ts_types()
        .iter()
        .map(|ts_type| {
            let azle_type =
                AzleType::from_ts_type(ts_type.clone().clone(), azle_fn_decl.source_map);
            azle_type.to_data_type()
        })
        .collect()
}
