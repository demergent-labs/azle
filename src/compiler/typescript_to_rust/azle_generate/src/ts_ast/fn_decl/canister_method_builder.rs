use swc_common::SourceMap;
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
    fn build_canister_method_node(
        &self,
        request_type: &RequestType,
        source_map: &SourceMap,
    ) -> ActCanisterMethod {
        let body = method_body::generate_canister_method_body(&self);
        let is_manual = self.is_manual();
        let name = self.get_function_name();
        let params = self.build_params(source_map);
        let return_type = self.build_return_type(source_map);

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

    fn build_params(&self, source_map: &SourceMap) -> Vec<ActFnParam> {
        let names = self.get_param_name_idents();
        let types = build_param_types(&self, source_map);
        names
            .iter()
            .enumerate()
            .map(|(i, name)| ActFnParam {
                name: name.clone().to_string(),
                data_type: types[i].clone(),
            })
            .collect()
    }

    fn build_return_type(&self, source_map: &SourceMap) -> ActDataType {
        let return_ts_type = self.get_return_ts_type();
        return_ts_type.to_act_data_type(&None, source_map)
    }
}

fn build_param_types(fn_decl: &FnDecl, source_map: &SourceMap) -> Vec<ActDataType> {
    fn_decl
        .get_param_ts_types()
        .iter()
        .map(|ts_type| ts_type.to_act_data_type(&None, source_map))
        .collect()
}
