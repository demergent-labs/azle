use cdk_framework::act::{
    node::{
        canister_method::{CanisterMethodType, QueryMethod, QueryOrUpdateDefinition, UpdateMethod},
        CandidType, CanisterMethod, Param,
    },
    CanisterMethods,
};
use swc_ecma_ast::TsType;

use crate::ts_ast::{azle_type::AzleType, AzleFnDecl, TsAst};

pub use annotation::Annotation;
pub use errors::ParseError;

mod annotation;
mod guard_function;
mod heartbeat;
mod init;
mod inspect_message;
mod module_item;
mod post_upgrade;
mod pre_upgrade;
mod query_and_update;
mod rust;

pub mod errors;
pub mod module;

impl TsAst {
    pub fn build_canister_methods(&self) -> CanisterMethods {
        let heartbeat_method = self.build_heartbeat_method();
        let init_method = Some(self.build_init_method());
        let inspect_message_method = self.build_inspect_message_method();
        let post_upgrade_method = Some(self.build_post_upgrade_method());
        let pre_upgrade_method = self.build_pre_upgrade_method();
        let query_methods = self.build_query_methods();
        let update_methods = self.build_update_methods();

        CanisterMethods {
            heartbeat_method,
            init_method,
            inspect_message_method,
            post_upgrade_method,
            pre_upgrade_method,
            query_methods,
            update_methods,
        }
    }
}

impl<'a> AzleFnDecl<'a> {
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

    fn assert_return_type_is_void(&self) {
        if self.annotation.method_type != CanisterMethodType::Heartbeat && self.is_promise() {
            panic!(
                "{}",
                errors::build_void_return_type_required_error_message(
                    &self.fn_decl,
                    self.source_map
                )
            )
        }

        let return_ts_type = self.get_return_ts_type();

        if let swc_ecma_ast::TsType::TsKeywordType(keyword) = return_ts_type {
            if let swc_ecma_ast::TsKeywordTypeKind::TsVoidKeyword = keyword.kind {
                return;
            }
        }

        panic!(
            "{}",
            errors::build_void_return_type_required_error_message(&self.fn_decl, self.source_map)
        )
    }

    fn assert_not_async(&self) {
        if self.fn_decl.function.is_async {
            panic!(
                "{}",
                errors::build_async_not_allowed_error_message(
                    &self.fn_decl,
                    self.source_map,
                    &self.annotation.method_type
                )
            )
        }

        if let TsType::TsTypeRef(type_ref) =
            &*self.fn_decl.function.return_type.as_ref().unwrap().type_ann
        {
            match type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => todo!(),
                swc_ecma_ast::TsEntityName::Ident(_) => todo!(),
            }
        }
    }
}
