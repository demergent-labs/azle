use super::AzleFnDecl;
use crate::{generators::canister_methods::query_and_update, ts_ast::azle_type::AzleType};
use cdk_framework::{
    nodes::{ActCanisterMethod, ActFnParam, CanisterMethod},
    traits::CanisterMethodBuilder,
    ActDataType, RequestType, ToActDataType,
};

impl<'a> CanisterMethodBuilder for AzleFnDecl<'a> {
    fn build_canister_method_node(&self, request_type: &RequestType) -> ActCanisterMethod {
        let body = query_and_update::generate_query_and_update_body(&self);
        let is_manual = self.is_manual();
        let is_async = self.is_promise();
        let name = self.get_function_name();
        let params = self.build_params();
        let return_type = self.build_return_type();

        let canister_method = CanisterMethod {
            body,
            is_manual,
            is_async,
            name,
            params,
            return_type,
            cdk_name: "azle".to_string(),
            function_guard_name: None,
        };

        match request_type {
            RequestType::Query => ActCanisterMethod::QueryMethod(canister_method),
            RequestType::Update => ActCanisterMethod::UpdateMethod(canister_method),
        }
    }

    fn build_params(&self) -> Vec<ActFnParam> {
        let names = self.get_param_name_idents();
        let types = build_param_types(&self);
        names
            .iter()
            .enumerate()
            .map(|(i, name)| ActFnParam {
                name: name.clone().to_string(),
                data_type: types[i].clone(),
            })
            .collect()
    }

    fn build_return_type(&self) -> ActDataType {
        let return_ts_type = self.get_return_ts_type();
        let return_azle_type = AzleType::from_ts_type(return_ts_type.clone(), self.source_map);
        return_azle_type.to_act_data_type(&None)
    }
}

// TODO why isn't this on the trait? and for that matter why is it separated
// from the get name. It would be much simpler imho to get the names and the
// params all in the same pass
fn build_param_types(azle_fn_decl: &AzleFnDecl) -> Vec<ActDataType> {
    azle_fn_decl
        .get_param_ts_types()
        .iter()
        .map(|ts_type| {
            let azle_type =
                AzleType::from_ts_type(ts_type.clone().clone(), azle_fn_decl.source_map);
            azle_type.to_act_data_type(&None)
        })
        .collect()
}
