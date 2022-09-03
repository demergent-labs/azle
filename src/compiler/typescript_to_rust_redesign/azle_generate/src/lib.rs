// TODO let's find all Query and Update functions and create their function bodies
// TODO then we can move on from there

use quote::quote;
use std::{collections::HashSet, iter::FromIterator, path::Path};
use swc_common::{sync::Lrc, SourceMap};
use swc_ecma_ast::Program;
use swc_ecma_parser::{
    lexer::Lexer,
    Parser,
    StringInput,
    // FileInput,
    // SourceFileInput,
    Syntax,
    TsConfig,
};

mod generators {
    pub mod canister_methods;
    pub mod azle_into_js_value;
    pub mod azle_try_from_js_value;
}

use generators::{canister_methods::{
    generate_query_function_infos, generate_update_function_infos, get_ast_fn_decls_from_programs,
    get_ast_record_type_alias_decls, get_ast_type_alias_decls_from_programs, get_query_fn_decls,
    get_update_fn_decls, FunctionInformation, StructInfo,
    system::init::generate_canister_method_system_init
}, azle_into_js_value::generate_azle_into_js_value, azle_try_from_js_value::generate_azle_try_from_js_value};

use crate::generators::canister_methods::generate_type_alias_token_streams;

fn collect_function_type_dependencies(function_info: &Vec<FunctionInformation>) -> HashSet<String> {
    let dependencies = function_info.iter().fold(vec![], |acc, fun_info| {
        vec![acc, fun_info.type_alias_dependant_types.clone()].concat()
    });
    HashSet::from_iter(dependencies.iter().cloned())
}

fn collect_inline_dependencies(
    function_info: &Vec<FunctionInformation>,
) -> Vec<proc_macro2::TokenStream> {
    function_info.iter().fold(vec![], |acc, fun_info| {
        vec![
            acc,
            collect_inline_dependencies_for_struct(&fun_info.inline_dependant_types),
        ]
        .concat()
    })
}

fn collect_inline_dependencies_for_struct(
    struct_info: &Box<Vec<StructInfo>>,
) -> Vec<proc_macro2::TokenStream> {
    struct_info.iter().fold(vec![], |acc2, dependencies| {
        let this_dependency_token_stream = &dependencies.structure;
        let sub_dependency_token_streams =
            collect_inline_dependencies_for_struct(&dependencies.inline_dependencies);
        vec![
            acc2,
            vec![this_dependency_token_stream.clone()],
            sub_dependency_token_streams,
        ]
        .concat()
    })
}

pub fn azle_generate(ts_file_names: &Vec<&str>, main_js: &str) -> proc_macro2::token_stream::TokenStream {
    let programs = get_programs(&ts_file_names);

    // Collect AST Information
    let ast_type_alias_decls = get_ast_type_alias_decls_from_programs(&programs);
    let ast_record_type_alias_decls = get_ast_record_type_alias_decls(&ast_type_alias_decls);
    let ast_fnc_decls = get_ast_fn_decls_from_programs(&programs);

    // Separate function decls into queries and updates
    let ast_fnc_decls_query = get_query_fn_decls(&ast_fnc_decls);
    let ast_fnc_decls_update = get_update_fn_decls(&ast_fnc_decls);

    // println!("ast_fnc_decls_query: {:#?}", ast_fnc_decls_query);

    let query_function_info = generate_query_function_infos(&ast_fnc_decls_query);
    let query_function_streams: Vec<proc_macro2::TokenStream> = query_function_info
        .iter()
        .map(|fun_info| fun_info.function.clone())
        .collect();

    // let query_inline_type_aliases = quote!();
    let update_function_info = generate_update_function_infos(&ast_fnc_decls_update);
    let update_function_streams: Vec<proc_macro2::TokenStream> = update_function_info
        .iter()
        .map(|fun_info| fun_info.function.clone())
        .collect();
    // let update_inline_type_aliases = quote!();

    // Collect all dependant names
    let query_function_dependant_types = collect_function_type_dependencies(&query_function_info);
    let update_function_dependant_types = collect_function_type_dependencies(&update_function_info);

    let type_alias_dependant_types: HashSet<&String> = query_function_dependant_types
        .union(&update_function_dependant_types)
        .collect();

    let query_function_inline_dependant_types = collect_inline_dependencies(&query_function_info);
    let update_function_inline_dependant_types = collect_inline_dependencies(&update_function_info);
    // TODO it would be great to add the inline_types we found from doing the type aliases while we are at it
    let function_inline_records = vec![
        query_function_inline_dependant_types,
        update_function_inline_dependant_types,
    ]
    .concat();

    let type_aliases_map =
        generate_type_alias_token_streams(&type_alias_dependant_types, &ast_type_alias_decls);
    let type_alias_inline_deps = type_aliases_map
        .iter()
        .fold(vec![], |acc, (_, (_, token_stream))| {
            vec![acc, token_stream.clone()].concat()
        });
    let type_alias_inline_records =
        collect_inline_dependencies_for_struct(&Box::from(type_alias_inline_deps));

    let inline_records_function_streams =
        vec![function_inline_records, type_alias_inline_records].concat();

    let records_function_streams: Vec<proc_macro2::TokenStream> = type_aliases_map
        .iter()
        .map(|(_, (token_stream, _))| token_stream.clone())
        .collect();

    let canister_method_system_init = generate_canister_method_system_init();

    let azle_into_js_value = generate_azle_into_js_value();
    let azle_try_from_js_value = generate_azle_try_from_js_value();

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

        // static PRINCIPAL_JS: &'static str = r#"${principal_js}"#;

        #canister_method_system_init

        #(#inline_records_function_streams)*
        #(#records_function_streams)*
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
