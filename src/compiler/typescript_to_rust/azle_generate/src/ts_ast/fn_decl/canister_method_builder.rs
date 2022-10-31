use swc_ecma_ast::FnDecl;

use crate::{
    cdk_act::{
        nodes::{ActCanisterMethod, ActFnParam, CanisterMethod},
        traits::CanisterMethodBuilder,
        ActDataType, RequestType, ToActDataType,
    },
    generators::canister_methods::method_body,
    ts_ast::fn_decl::FnDeclHelperMethods,
};

impl CanisterMethodBuilder for FnDecl {
    fn build_canister_method_node(&self, request_type: &RequestType) -> ActCanisterMethod {
        let body = method_body::generate_canister_method_body(&self);
        let is_manual = self.is_manual();
        let name = self.get_function_name();
        let params = self.build_params();
        let return_type = self.build_return_type();

        let canister_method = CanisterMethod {
            body,
            is_manual,
            name,
            params,
            return_type,
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
        return_ts_type.to_act_data_type(&None)
    }
}

// TODO why isn't this on the trait? and for that matter why is it separated
// from the get name. It would be much simpler imho to get the names and the
// params all in the same pass
fn build_param_types(fn_decl: &FnDecl) -> Vec<ActDataType> {
    fn_decl
        .get_param_ts_types()
        .iter()
        .map(|ts_type| ts_type.to_act_data_type(&None))
        .collect()
}
