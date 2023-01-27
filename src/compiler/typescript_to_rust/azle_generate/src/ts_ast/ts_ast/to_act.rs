use cdk_framework::{
    self, nodes::ActCanisterMethod, traits::SystemCanisterMethodBuilder, AbstractCanisterTree,
    ActDataType, RequestType, ToAct,
};

use super::TsAst;
use crate::{
    generators::{
        body, header,
        vm_value_conversion::{try_from_vm_value_impls, try_into_vm_value_impls},
    },
    ts_ast::azle_program::HelperMethods,
    ts_keywords,
};

impl ToAct for TsAst {
    fn to_act(&self) -> AbstractCanisterTree {
        let header = header::generate(&self.main_js);
        let keywords = ts_keywords::ts_keywords();
        let query_methods = self
            .azle_programs
            .build_canister_method_nodes(RequestType::Query);
        let update_methods = self
            .azle_programs
            .build_canister_method_nodes(RequestType::Update);
        let stable_b_tree_map_nodes = self.stable_b_tree_map_nodes();
        let external_canisters = self.build_external_canisters();

        let types = self.build_data_type_nodes(
            &query_methods,
            &update_methods,
            &stable_b_tree_map_nodes,
            &external_canisters,
            &keywords,
        );

        let arrays = filter_by_variant(&types, "Array");
        let funcs = filter_by_variant(&types, "Func");
        let options = filter_by_variant(&types, "Option");
        let primitives = filter_by_variant(&types, "Primitive");
        let records = filter_by_variant(&types, "Record");
        let tuples = filter_by_variant(&types, "Tuple");
        let type_refs = filter_by_variant(&types, "TypeRef");
        let variants = filter_by_variant(&types, "Variant");

        let heartbeat_method = self.build_heartbeat_method();
        let init_method = self.build_init_method();
        let inspect_message_method = self.build_inspect_method();
        let post_upgrade_method = self.build_post_upgrade_method();
        let pre_upgrade_method = self.build_pre_upgrade_method();

        // TODO: Remove these clones
        let query_and_update_canister_methods: Vec<ActCanisterMethod> =
            vec![query_methods.clone(), update_methods.clone()].concat();

        let try_into_vm_value_impls = try_into_vm_value_impls::generate();
        let try_from_vm_value_impls = try_from_vm_value_impls::generate();

        let body = body::generate(
            self,
            &query_and_update_canister_methods,
            &external_canisters,
            &stable_b_tree_map_nodes,
        );

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

fn filter_by_variant(types: &Vec<ActDataType>, variant: &str) -> Vec<ActDataType> {
    types
        .iter()
        .filter(|act| match act {
            ActDataType::Array(_) => variant == "Array",
            ActDataType::Func(_) => variant == "Func",
            ActDataType::Option(_) => variant == "Option",
            ActDataType::Primitive(_) => variant == "Primitive",
            ActDataType::Record(_) => variant == "Record",
            ActDataType::Tuple(_) => variant == "Tuple",
            ActDataType::TypeRef(_) => variant == "TypeRef",
            ActDataType::Variant(_) => variant == "Variant",
        })
        .cloned()
        .collect()
}
