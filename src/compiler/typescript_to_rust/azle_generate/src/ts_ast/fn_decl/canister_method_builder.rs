use swc_ecma_ast::FnDecl;

use crate::{
    cdk_act::{
        nodes::{ActCanisterMethod, ActFnParam, CanisterMethod},
        traits::CanisterMethodBuilder,
        ActDataTypeNode, RequestType,
    },
    generators::canister_methods::method_body,
    ts_ast::{fn_decl::FnDeclHelperMethods, ts_types_to_act},
};

impl CanisterMethodBuilder for FnDecl {
    fn build_canister_method_node(&self, request_type: &RequestType) -> ActCanisterMethod {
        let body = method_body::generate_canister_method_body(&self);
        let is_manual = self.is_manual();
        let name = self.get_fn_decl_function_name();
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

    fn build_return_type(&self) -> ActDataTypeNode {
        let return_ts_type = self.get_return_ts_type();
        ts_types_to_act::ts_type_to_act_node(&return_ts_type, &None)
    }
}

fn build_param_types(fn_decl: &FnDecl) -> Vec<ActDataTypeNode> {
    fn_decl
        .get_param_ts_types()
        .iter()
        .map(|ts_type| ts_types_to_act::ts_type_to_act_node(ts_type, &None))
        .collect()
}
