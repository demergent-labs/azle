// TODO let's find all Query and Update functions and create their function bodies
// TODO then we can move on from there

use azle_act::{act_node::ActNode, CanisterMethodType};
use generators::{
    azle_into_js_value, azle_try_from_js_value,
    canister_methods::{
        self,
        system::{heartbeat, init, inspect_message, post_upgrade, pre_upgrade},
    },
    cross_canister_call_functions, funcs, ic_object, stacktrace, type_aliases,
    variant_type_aliases::{self},
};
use quote::quote;
use std::{collections::HashSet, path::Path};
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_ast::{FnDecl, Program};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax, TsConfig};
use ts_ast::ts_type_alias_decl;

mod azle_act;
mod ts_ast;

pub mod generators;

pub fn azle_generate(
    ts_file_names: &Vec<&str>,
    main_js: &str,
    stable_storage_js: &str,
) -> proc_macro2::token_stream::TokenStream {
    let programs = get_programs(&ts_file_names);

    // Collect AST Information
    let ast_type_alias_decls = ts_ast::program::get_ast_type_alias_decls_from_programs(&programs);
    let ast_other_type_alias_decls =
        ts_type_alias_decl::get_ast_other_type_alias_decls(&ast_type_alias_decls);
    let ast_canister_type_alias_decls =
        ts_type_alias_decl::get_ast_canister_type_alias_decls(&ast_type_alias_decls);

    let func_arg_token = funcs::generate_func_arg_token();

    // Separate function decls into queries and updates
    let ast_fnc_decls_query =
        ts_ast::program::get_canister_method_type_fn_decls(&programs, &CanisterMethodType::Query);
    let ast_fnc_decls_update =
        ts_ast::program::get_canister_method_type_fn_decls(&programs, &CanisterMethodType::Update);

    // Determine which type aliases must be present for the functions to work and save them for later parsing
    let query_dependencies = ts_ast::fn_decl::get_dependent_types_from_fn_decls(
        &ast_fnc_decls_query,
        &ast_type_alias_decls,
    );
    let update_dependencies = ts_ast::fn_decl::get_dependent_types_from_fn_decls(
        &ast_fnc_decls_update,
        &ast_type_alias_decls,
    );
    let canister_dependencies = ts_ast::ts_type_alias_decl::get_dependent_types_from_canister_decls(
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

    let query_function_info =
        canister_methods::query::generate_query_function_infos(&ast_fnc_decls_query);
    let query_function_streams: Vec<proc_macro2::TokenStream> = query_function_info
        .iter()
        .map(|fun_info| fun_info.canister_method.clone())
        .collect();

    let update_function_info =
        canister_methods::update::generate_update_function_infos(&ast_fnc_decls_update);
    let update_function_streams: Vec<proc_macro2::TokenStream> = update_function_info
        .iter()
        .map(|fun_info| fun_info.canister_method.clone())
        .collect();

    let query_function_inline_dependant_types = collect_inline_dependencies(&query_function_info);
    let update_function_inline_dependant_types = collect_inline_dependencies(&update_function_info);
    // TODO it would be great to add the inline_types we found from doing the type aliases while we are at it
    let function_inline_records = vec![
        query_function_inline_dependant_types,
        update_function_inline_dependant_types,
    ]
    .concat();

    let other_token_streams = type_aliases::generate_other_type_alias_token_streams(
        &dependencies,
        &ast_other_type_alias_decls,
    );

    let type_alias_acts =
        variant_type_aliases::generate_type_alias_acts(&dependencies, &ast_type_alias_decls);
    let type_alias_token_streams =
        variant_type_aliases::generate_type_definition_token_streams(&type_alias_acts);

    let canister_method_system_heartbeat =
        heartbeat::generate_canister_method_system_heartbeat(&programs);
    let canister_method_system_init = init::generate_canister_method_system_init(&programs);
    let canister_method_system_inspect_message =
        inspect_message::generate_canister_method_system_inspect_message(&programs);
    let canister_method_system_post_upgrade =
        post_upgrade::generate_canister_method_system_post_upgrade(&programs);
    let canister_method_system_pre_upgrade =
        pre_upgrade::generate_canister_method_system_pre_upgrade(&programs);

    let azle_into_js_value = azle_into_js_value::generate_azle_into_js_value();
    let azle_try_from_js_value = azle_try_from_js_value::generate_azle_try_from_js_value();

    let query_and_update_func_decls: Vec<FnDecl> =
        vec![ast_fnc_decls_query, ast_fnc_decls_update].concat();
    let ic_object_functions =
        ic_object::functions::generate_ic_object_functions(&query_and_update_func_decls);

    let async_result_handler =
        canister_methods::async_result_handler::generate_async_result_handler(&programs);
    let get_top_level_call_frame_fn = stacktrace::generate_get_top_level_call_frame_fn();

    let cross_canister_call_functions =
        cross_canister_call_functions::generate_cross_canister_call_functions(&programs);

    quote! {
        // This code is automatically generated by Azle

        // #![allow(dead_code)]
        // #![allow(non_camel_case_types)]
        // #![allow(non_snake_case)]
        // #![allow(unused_imports)]
        // #![allow(unused_variables)]

        #![allow(warnings, unused)]

        use std::str::FromStr;
        use azle_js_value_derive::{
            AzleIntoJsValue,
            AzleTryFromJsValue
        };
        use ic_cdk::api::call::CallResult;

        // TODO old safe working way
        // TODO I want to make sure I am doing this safely, but I can't do async code from within a with block
        // thread_local! {
        //     static BOA_CONTEXT: std::cell::RefCell<boa_engine::Context> = std::cell::RefCell::new(boa_engine::Context::default());
        // }

        // TODO new unsafe working way
        // TODO we are treading in dangerous territory now
        // TODO study this: https://mmapped.blog/posts/01-effective-rust-canisters.html
        // TODO try to get help from those on the forum
        // TODO it might be fine since we only ever obtain one mutable reference per query/update call
        // TODO we do not allow the user to obtain multiple mutable references, we only have one
        // TODO as long as we enforce that, we might be fine
        static mut BOA_CONTEXT_OPTION: Option<boa_engine::Context> = None;

        fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> { Ok(()) }

        getrandom::register_custom_getrandom!(custom_getrandom);

        static MAIN_JS: &'static str = #main_js;
        static STABLE_STORAGE_JS: &'static str = #stable_storage_js;

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
        #(#type_alias_token_streams)*
        #(#function_inline_records)*
        #(#other_token_streams)*
        #(#query_function_streams)*
        #(#update_function_streams)*

        #azle_into_js_value
        #azle_try_from_js_value

        candid::export_service!();

        #[ic_cdk_macros::query(name = "__get_candid_interface_tmp_hack")]
        fn export_candid() -> String {
            __export_service()
        }

        #[cfg(test)]

        mod tests {
            use super::*;

            #[test]
            fn write_candid_to_disk() {
                std::fs::write("index.did", export_candid()).unwrap();
            }
        }
    }
    .into()
}

fn get_programs(ts_file_names: &Vec<&str>) -> Vec<Program> {
    ts_file_names
        .iter()
        .map(|ts_file_name| {
            let filepath = Path::new(ts_file_name).to_path_buf();

            let cm: Lrc<SourceMap> = Default::default();

            let fm = cm.load_file(&filepath).unwrap();

            let lexer = Lexer::new(
                Syntax::Typescript(TsConfig::default()),
                Default::default(),
                StringInput::from(&*fm),
                None,
            );

            let mut parser = Parser::new_from(lexer);

            let program = parser.parse_program().unwrap();

            program
        })
        .collect()
}

fn collect_inline_dependencies(
    function_info: &Vec<azle_act::canister_method::CanisterMethod>,
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
    let rust_type_structure = match rust_type.get_structure() {
        Some(structure) => structure,
        None => quote!(),
    };
    let member_structures = rust_type.get_inline_members();
    let member_structures = member_structures.iter().fold(vec![], |acc, member| {
        vec![acc, collect_inline_dependencies_rust_type(member)].concat()
    });
    vec![vec![rust_type_structure], member_structures].concat()
}
