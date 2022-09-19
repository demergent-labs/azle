use quote::quote;
use std::collections::HashSet;

use crate::{
    cdk_act::{
        self, act_data_type_node, AbstractCanisterTree, ActDataTypeNode, CanisterMethodType, ToAct,
    },
    generators::{
        azle_into_js_value, azle_try_from_js_value,
        canister_methods::{
            self,
            system::{heartbeat, init, inspect_message, post_upgrade, pre_upgrade},
        },
        cross_canister_call_functions, funcs, stacktrace, type_aliases,
    },
    ts_ast,
};

pub struct TsProgramBundle {
    pub programs: Vec<swc_ecma_ast::Program>,
}

impl ToAct for TsProgramBundle {
    fn to_act(&self) -> AbstractCanisterTree {
        // Collect AST Information
        let ast_type_alias_decls =
            ts_ast::program::get_ast_type_alias_decls_from_programs(&self.programs);
        let ast_canister_type_alias_decls =
            ts_ast::ts_type_alias_decl::get_ast_canister_type_alias_decls(&ast_type_alias_decls);

        let func_arg_token = funcs::generate_func_arg_token();

        // Separate function decls into queries and updates
        let ast_fnc_decls_query = ts_ast::program::get_canister_method_type_fn_decls(
            &self.programs,
            &CanisterMethodType::Query,
        );
        let ast_fnc_decls_update = ts_ast::program::get_canister_method_type_fn_decls(
            &self.programs,
            &CanisterMethodType::Update,
        );

        // Determine which type aliases must be present for the functions to work and save them for later parsing
        let query_dependencies = ts_ast::fn_decl::get_dependent_types_from_fn_decls(
            &ast_fnc_decls_query,
            &ast_type_alias_decls,
        );
        let update_dependencies = ts_ast::fn_decl::get_dependent_types_from_fn_decls(
            &ast_fnc_decls_update,
            &ast_type_alias_decls,
        );
        let canister_dependencies =
            ts_ast::ts_type_alias_decl::get_dependent_types_from_canister_decls(
                &ast_canister_type_alias_decls,
                &ast_type_alias_decls,
            );

        let dependencies: HashSet<String> = query_dependencies
            .union(&update_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> = dependencies
            .union(&canister_dependencies)
            .cloned()
            .collect();

        let query_methods = canister_methods::query::build_query_methods(&ast_fnc_decls_query);
        let update_methods = canister_methods::update::build_update_methods(&ast_fnc_decls_update);

        let query_method_inline_acts =
            cdk_act::nodes::canister_method::build_inline_types_from_canister_method_acts(
                &query_methods,
            );
        let update_method_inline_acts =
            cdk_act::nodes::canister_method::build_inline_types_from_canister_method_acts(
                &update_methods,
            );

        let type_alias_acts =
            type_aliases::build_type_alias_acts(&dependencies, &ast_type_alias_decls);

        let type_alias_inline_acts =
            act_data_type_node::build_inline_types_from_type_alias_acts(&type_alias_acts);

        let all_inline_acts = vec![
            type_alias_inline_acts,
            query_method_inline_acts,
            update_method_inline_acts,
        ]
        .concat();
        let all_inline_acts = act_data_type_node::deduplicate(all_inline_acts);

        let all_type_acts = vec![type_alias_acts, all_inline_acts].concat();

        let aliases: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Primitive(primitive) => match primitive {
                    act_data_type_node::Primitive::TypeAlias(_) => true,
                    _ => false,
                },
                ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                    act_data_type_node::TypeRef::TypeAlias(_) => true,
                    _ => false,
                },
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let arrays: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Array(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let funcs: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Func(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let options: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Option(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let primitives: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Primitive(primitive) => match primitive {
                    act_data_type_node::Primitive::Literal(_) => todo!(),
                    act_data_type_node::Primitive::TypeAlias(_) => false,
                },
                ActDataTypeNode::TypeRef(type_ref) => match type_ref {
                    act_data_type_node::TypeRef::Literal(_) => {
                        todo!("Figure out if this actually happens at this point.")
                    }
                    act_data_type_node::TypeRef::TypeAlias(_) => false,
                },
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let records: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Record(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let tuples: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Tuple(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();
        let variants: Vec<ActDataTypeNode> = all_type_acts
            .iter()
            .filter(|act| match act {
                ActDataTypeNode::Variant(_) => true,
                _ => false,
            })
            .map(|act| act.clone())
            .collect();

        let canister_method_system_heartbeat =
            heartbeat::generate_canister_method_system_heartbeat(&self.programs);
        let canister_method_system_init =
            init::generate_canister_method_system_init(&self.programs);
        let canister_method_system_inspect_message =
            inspect_message::generate_canister_method_system_inspect_message(&self.programs);
        let canister_method_system_post_upgrade =
            post_upgrade::generate_canister_method_system_post_upgrade(&self.programs);
        let canister_method_system_pre_upgrade =
            pre_upgrade::generate_canister_method_system_pre_upgrade(&self.programs);

        let azle_into_js_value = azle_into_js_value::generate_azle_into_js_value();
        let azle_try_from_js_value = azle_try_from_js_value::generate_azle_try_from_js_value();

        let async_result_handler =
            canister_methods::async_result_handler::generate_async_result_handler(&self.programs);
        let get_top_level_call_frame_fn = stacktrace::generate_get_top_level_call_frame_fn();

        let cross_canister_call_functions =
            cross_canister_call_functions::generate_cross_canister_call_functions(&self.programs);

        // TODO Some of the things in this quote belong inside of the quote in AbstractCanisterTree

        AbstractCanisterTree {
            update_methods,
            query_methods,
            rust_code: quote! {
                #canister_method_system_init
                #canister_method_system_pre_upgrade
                #canister_method_system_post_upgrade
                #canister_method_system_heartbeat
                #canister_method_system_inspect_message

                #cross_canister_call_functions

                #async_result_handler
                #get_top_level_call_frame_fn

                #func_arg_token

                #azle_into_js_value
                #azle_try_from_js_value

            },
            aliases,
            arrays,
            funcs,
            options,
            primitives,
            records,
            tuples,
            variants,
        }
    }
}
