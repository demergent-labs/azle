use cdk_framework::{
    self, nodes::data_type_nodes, traits::SystemCanisterMethodBuilder, AbstractCanisterTree,
    ActCanisterMethod, ActDataType, CanisterMethodType, RequestType, ToAct,
};
use quote::quote;

use super::TsAst;
use crate::{
    generators::{canister_methods, errors, ic_object::functions, vm_value_conversion},
    ts_ast::{
        azle_type_alias_decls::azle_type_alias_decl::AzleTypeAliasListHelperMethods,
        program::azle_program::AzleProgramVecHelperMethods,
    },
    ts_keywords,
};

impl ToAct for TsAst {
    fn to_act(&self) -> AbstractCanisterTree {
        let keywords = ts_keywords::ts_keywords();

        // Collect AST Information
        let ast_type_alias_decls = &self.azle_programs.get_azle_type_alias_decls();

        // Separate function decls into queries and updates
        let azle_fnc_decls_query = self
            .azle_programs
            .get_azle_fn_decls_of_type(&CanisterMethodType::Query);
        let azle_fnc_decls_update = self
            .azle_programs
            .get_azle_fn_decls_of_type(&CanisterMethodType::Update);

        let query_methods = canister_methods::build_canister_method_nodes(
            &azle_fnc_decls_query,
            RequestType::Query,
        );
        let update_methods = canister_methods::build_canister_method_nodes(
            &azle_fnc_decls_update,
            RequestType::Update,
        );

        let query_method_type_acts =
            cdk_framework::nodes::act_canister_method::get_all_types_from_canister_method_acts(
                &query_methods,
            );
        let update_method_type_acts =
            cdk_framework::nodes::act_canister_method::get_all_types_from_canister_method_acts(
                &update_methods,
            );

        let dependencies = self.azle_programs.get_dependent_types();
        let type_alias_acts = ast_type_alias_decls.build_type_alias_acts(&dependencies);

        let type_alias_inline_acts = data_type_nodes::build_inline_type_acts(&type_alias_acts);
        let query_method_inline_acts =
            data_type_nodes::build_inline_type_acts(&query_method_type_acts);
        let update_method_inline_acts =
            data_type_nodes::build_inline_type_acts(&update_method_type_acts);

        let all_inline_acts = vec![
            type_alias_inline_acts,
            query_method_inline_acts,
            update_method_inline_acts,
        ]
        .concat();
        let all_inline_acts = data_type_nodes::deduplicate(all_inline_acts, &keywords);

        let all_type_acts = vec![type_alias_acts, all_inline_acts].concat();

        let arrays: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Array(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let funcs: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Func(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let options: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Option(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let primitives: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Primitive(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let records: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Record(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let tuples: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Tuple(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let type_refs: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::TypeRef(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let variants: Vec<ActDataType> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataType::Variant(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();

        let heartbeat_method = self.build_heartbeat_method();
        let init_method = self.build_init_method();
        let inspect_message_method = self.build_inspect_method();
        let post_upgrade_method = self.build_post_upgrade_method();
        let pre_upgrade_method = self.build_pre_upgrade_method();

        let external_canisters = self.build_external_canisters();

        // TODO: Remove these clones
        let query_and_update_canister_methods: Vec<ActCanisterMethod> =
            vec![query_methods.clone(), update_methods.clone()].concat();
        let ic_object_functions = functions::generate_ic_object_functions(
            &query_and_update_canister_methods,
            &external_canisters,
        );

        let try_into_vm_value_impls = vm_value_conversion::generate_try_into_vm_value_impls();
        let try_from_vm_value_impls = vm_value_conversion::generate_try_from_vm_value_impls();

        let async_result_handler =
            self.generate_async_result_handler(&query_and_update_canister_methods);

        let boa_error_handler = errors::generate_error_handler();

        // TODO Some of the things in this quote belong inside of the quote in AbstractCanisterTree
        AbstractCanisterTree {
            cdk_name: "azle".to_string(),
            arrays,
            external_canisters,
            funcs,
            heartbeat_method,
            init_method,
            inspect_message_method,
            keywords,
            options,
            post_upgrade_method,
            pre_upgrade_method,
            primitives,
            query_methods,
            records,
            rust_code: quote! {
                #boa_error_handler
                #ic_object_functions
                #async_result_handler
            },
            try_from_vm_value_impls,
            try_into_vm_value_impls,
            tuples,
            type_refs,
            update_methods,
            variants,
        }
    }
}
