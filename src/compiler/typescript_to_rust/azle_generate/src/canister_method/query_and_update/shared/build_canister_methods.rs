use cdk_framework::act::node::{
    canister_method::{
        CanisterMethod, CanisterMethodType, QueryMethod, QueryOrUpdateDefinition, UpdateMethod,
    },
    CandidType, Param,
};

use crate::{
    canister_method::{query_and_update, AnnotatedFnDecl, GetProgramAnnotatedFnDecls},
    ts_ast::{azle_type::AzleType, AzleProgram},
};

pub trait BuildCanisterMethods {
    fn build_canister_method_nodes(&self, request_type: CanisterMethodType) -> Vec<CanisterMethod>;
}

impl BuildCanisterMethods for Vec<AzleProgram> {
    fn build_canister_method_nodes(
        &self,
        canister_method_type: CanisterMethodType,
    ) -> Vec<CanisterMethod> {
        let azle_fnc_decls = self.get_annotated_fn_decls_of_type(canister_method_type.clone());

        azle_fnc_decls.iter().fold(vec![], |acc, fn_decl| {
            let canister_method_node = fn_decl.build_canister_method_node(&canister_method_type);
            vec![acc, vec![canister_method_node]].concat()
        })
    }
}

impl<'a> AnnotatedFnDecl<'a> {
    pub fn build_canister_method_node(
        &self,
        canister_method_type: &CanisterMethodType,
    ) -> CanisterMethod {
        let body = query_and_update::generate_query_and_update_body(&self);
        let is_async = self.is_promise();
        let is_manual = self.is_manual();
        let guard_function_name = self.annotation.guard.clone();
        let name = self.get_function_name();
        let params = self.build_params();
        let return_type = self.build_return_type();

        match canister_method_type {
            CanisterMethodType::Query => CanisterMethod::Query(QueryMethod {
                definition: QueryOrUpdateDefinition::new(
                    is_async,
                    is_manual,
                    guard_function_name,
                    name,
                    params,
                    return_type,
                    body,
                ),
            }),
            CanisterMethodType::Update => CanisterMethod::Update(UpdateMethod {
                definition: QueryOrUpdateDefinition::new(
                    is_async,
                    is_manual,
                    guard_function_name,
                    name,
                    params,
                    return_type,
                    body,
                ),
            }),
            _ => panic!("TODO: YOU SHOULDN'T BE TRYING TO PARSE NON QUERY/UPDATE METHODS HERE!"),
        }
    }

    pub fn build_params(&self) -> Vec<Param> {
        let names = self.get_param_name_idents();
        let types = self.build_param_types();
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

    // TODO why is this separated from get_name. It would be much simpler
    // imho to get the names and the params all in the same pass
    fn build_param_types(&self) -> Vec<CandidType> {
        self.get_param_ts_types()
            .iter()
            .map(|ts_type| {
                let azle_type = AzleType::from_ts_type(ts_type.clone().clone(), self.source_map);
                azle_type.to_data_type()
            })
            .collect()
    }
}
