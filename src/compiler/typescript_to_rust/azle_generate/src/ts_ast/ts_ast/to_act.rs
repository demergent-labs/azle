use cdk_framework::{
    self,
    nodes::{data_type_nodes, ActCanisterMethod},
    traits::SystemCanisterMethodBuilder,
    AbstractCanisterTree, ActDataType, RequestType, ToAct,
};

use super::TsAst;
use crate::{
    generators::{
        body, header,
        vm_value_conversion::{try_from_vm_value_impls, try_into_vm_value_impls},
    },
    ts_ast::{
        azle_program::HelperMethods,
        azle_type_alias_decls::azle_type_alias_decl::AzleTypeAliasListHelperMethods,
    },
    ts_keywords,
};

impl ToAct for TsAst {
    fn to_act(&self) -> AbstractCanisterTree {
        let header = header::generate(&self.main_js);

        let keywords = ts_keywords::ts_keywords();

        // Collect AST Information
        let ast_type_alias_decls = &self.azle_programs.get_azle_type_alias_decls();

        // Separate function decls into queries and updates
        let query_methods = self
            .azle_programs
            .build_canister_method_nodes(RequestType::Query);

        let update_methods = self
            .azle_programs
            .build_canister_method_nodes(RequestType::Update);

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

        let try_into_vm_value_impls = try_into_vm_value_impls::generate();
        let try_from_vm_value_impls = try_from_vm_value_impls::generate();

        let body = body::generate(self, query_and_update_canister_methods, &external_canisters);

        AbstractCanisterTree {
            arrays,
            body,
            cdk_name: "azle".to_string(),
            external_canisters,
            funcs,
            header,
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
            try_from_vm_value_impls,
            try_into_vm_value_impls,
            tuples,
            type_refs,
            update_methods,
            variants,
            function_guards: vec![],
        }
    }
}
