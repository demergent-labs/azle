use quote::quote;
use std::collections::HashSet;

use crate::{
    cdk_act::{
        self, AbstractCanisterTree, ActNode, CanisterMethod, CanisterMethodType, CanisterTree,
    },
    complex_types, funcs, functions,
    generators::{
        azle_into_js_value, azle_try_from_js_value,
        canister_methods::{
            self,
            system::{heartbeat, init, inspect_message, post_upgrade, pre_upgrade},
        },
        cross_canister_call_functions,
    },
    stacktrace, ts_ast, type_aliases,
};

pub struct TsProgramBundle {
    pub programs: Vec<swc_ecma_ast::Program>,
}

impl CanisterTree for TsProgramBundle {
    fn to_act(&self) -> AbstractCanisterTree {
        // Collect AST Information
        let ast_complex_type_alias_decls =
            ts_ast::program::get_ast_type_alias_decls_from_programs(&self.programs);
        let ast_type_alias_decls =
            ts_ast::ts_type_alias_decl::get_ast_type_alias_decls(&ast_complex_type_alias_decls);
        let ast_canister_type_alias_decls =
            ts_ast::ts_type_alias_decl::get_ast_canister_type_alias_decls(
                &ast_complex_type_alias_decls,
            );

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
            &ast_complex_type_alias_decls,
        );
        let update_dependencies = ts_ast::fn_decl::get_dependent_types_from_fn_decls(
            &ast_fnc_decls_update,
            &ast_complex_type_alias_decls,
        );
        let canister_dependencies =
            ts_ast::ts_type_alias_decl::get_dependent_types_from_canister_decls(
                &ast_canister_type_alias_decls,
                &ast_complex_type_alias_decls,
            );

        let dependencies: HashSet<String> = query_dependencies
            .union(&update_dependencies)
            .cloned()
            .collect();
        let dependencies: HashSet<String> = dependencies
            .union(&canister_dependencies)
            .cloned()
            .collect();

        let query_canister_methods =
            canister_methods::query::generate_query_function_infos(&ast_fnc_decls_query);
        let query_function_streams: Vec<proc_macro2::TokenStream> = query_canister_methods
            .iter()
            .map(|fun_info| fun_info.canister_method.clone())
            .collect();

        let update_canister_methods =
            canister_methods::update::generate_update_function_infos(&ast_fnc_decls_update);
        let update_function_streams: Vec<proc_macro2::TokenStream> = update_canister_methods
            .iter()
            .map(|fun_info| fun_info.canister_method.clone())
            .collect();

        let query_function_inline_dependant_types =
            collect_inline_dependencies(&query_canister_methods);
        let update_function_inline_dependant_types =
            collect_inline_dependencies(&update_canister_methods);
        // TODO it would be great to add the inline_types we found from doing the type aliases while we are at it
        let function_inline_records = vec![
            query_function_inline_dependant_types,
            update_function_inline_dependant_types,
        ]
        .concat();

        let type_alias_token_streams =
            type_aliases::generate_type_alias_acts(&dependencies, &ast_type_alias_decls);

        let complex_type_alias_acts =
            complex_types::generate_complex_acts(&dependencies, &ast_complex_type_alias_decls);

        let complex_type_definitions_token_streams =
            complex_types::generate_complex_type_definition_token_streams(&complex_type_alias_acts);

        let query_and_update_canister_methods: Vec<CanisterMethod> =
            vec![query_canister_methods, update_canister_methods].concat();
        let ic_object_functions =
            functions::generate_ic_object_functions(&query_and_update_canister_methods);

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
            rust_code: quote! {
                #canister_method_system_init
                #canister_method_system_pre_upgrade
                #canister_method_system_post_upgrade
                #canister_method_system_heartbeat
                #canister_method_system_inspect_message

                #ic_object_functions

                #cross_canister_call_functions

                #async_result_handler
                #get_top_level_call_frame_fn

                #func_arg_token
                #(#complex_type_definitions_token_streams)*
                #(#function_inline_records)*
                #(#type_alias_token_streams)*
                #(#query_function_streams)*
                #(#update_function_streams)*

                #azle_into_js_value
                #azle_try_from_js_value

            },
        }
    }
}

fn collect_inline_dependencies(
    function_info: &Vec<cdk_act::CanisterMethod>,
) -> Vec<proc_macro2::TokenStream> {
    function_info.iter().fold(vec![], |acc, fun_info| {
        vec![
            acc,
            collect_inline_dependencies_from_list(&*fun_info.inline_types),
        ]
        .concat()
    })
}

// TODO I think we can get rid of these two functions with a little work
fn collect_inline_dependencies_from_list(
    rust_types: &Vec<ActNode>,
) -> Vec<proc_macro2::TokenStream> {
    rust_types.iter().fold(vec![], |acc, rust_type| {
        vec![acc, collect_inline_dependencies_rust_type(rust_type)].concat()
    })
}

fn collect_inline_dependencies_rust_type(rust_type: &ActNode) -> Vec<proc_macro2::TokenStream> {
    let rust_type_structure = match rust_type.get_definition() {
        Some(structure) => structure,
        None => quote!(),
    };
    let member_structures = rust_type.get_inline_members();
    let member_structures = member_structures.iter().fold(vec![], |acc, member| {
        vec![acc, collect_inline_dependencies_rust_type(member)].concat()
    });
    vec![vec![rust_type_structure], member_structures].concat()
}
