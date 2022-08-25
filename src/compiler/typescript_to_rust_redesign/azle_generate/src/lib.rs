// TODO let's find all Query and Update functions and create their function bodies
// TODO then we can move on from there

use proc_macro::TokenStream;
use quote::{
    quote
};
use std::{path::Path, collections::HashSet, iter::FromIterator};
use swc_ecma_parser::{
    lexer::Lexer,
    Parser,
    StringInput,
    // FileInput,
    // SourceFileInput,
    Syntax,
    TsConfig
};
use swc_ecma_ast::{
    Program,
};
use swc_common::{
    sync::Lrc,
    SourceMap,
};
use syn::{
    parse_macro_input,
    LitStr
};

mod generators {
    pub mod canister_methods;
}

use generators::canister_methods::{
    get_ast_fn_decls_from_programs,
    generate_query_function_infos,
    get_query_fn_decls, get_update_fn_decls, generate_update_function_token_streams, get_ast_type_alias_decls_from_programs, FunctionInformation,
};

use crate::generators::canister_methods::generate_type_alias_token_streams;

fn collect_function_type_dependencies(function_info: Vec<FunctionInformation>) -> HashSet<String>{
    let dependencies = function_info
        .iter()
        .fold(vec![], |acc, fun_info| {
            vec![acc, fun_info.dependant_types.clone()].concat()
        });
    HashSet::from_iter(dependencies.iter().cloned())
}

#[proc_macro]
pub fn azle_generate(ts_file_names_token_stream: TokenStream) -> TokenStream {
    let ts_file_names_string_literal = parse_macro_input!(ts_file_names_token_stream as LitStr);
    let ts_file_names_string_value = ts_file_names_string_literal.value();

    let ts_file_names: Vec<&str> = ts_file_names_string_value.split(",").collect();

    let programs = get_programs(&ts_file_names);

    let ast_type_alias_decls = get_ast_type_alias_decls_from_programs(&programs);

    let ast_fnc_decls = get_ast_fn_decls_from_programs(&programs);

    let ast_fnc_decls_query = get_query_fn_decls(&ast_fnc_decls);

    let ast_fnc_decls_update = get_update_fn_decls(&ast_fnc_decls);

    // println!("ast_fnc_decls_query: {:#?}", ast_fnc_decls_query);

    let query_function_info = generate_query_function_infos(&ast_fnc_decls_query);
    let query_function_token_streams: Vec<proc_macro2::TokenStream> = query_function_info
        .iter()
        .map(|fun_info| {
            fun_info.token_stream.clone()
        })
        .collect();

    // let query_inline_type_aliases = quote!();
    let update_function_info = generate_update_function_token_streams(&ast_fnc_decls_update);
    let update_function_token_streams: Vec<proc_macro2::TokenStream> = update_function_info
        .iter()
        .map(|fun_info| {
            fun_info.token_stream.clone()
        })
        .collect();
    // let update_inline_type_aliases = quote!();

    // Collect all dependant names
    let query_function_dependant_types = collect_function_type_dependencies(query_function_info);
    let update_function_dependant_types = collect_function_type_dependencies(update_function_info);

    let dependant_types: HashSet<&String> = query_function_dependant_types.union(&update_function_dependant_types).collect();

    println!("These are the query function dependant types: {:#?}", query_function_dependant_types);
    println!("These are the update function dependant types: {:#?}", update_function_dependant_types);
    println!("These are all the function dependant types: {:#?}", dependant_types);

    // let type_aliases = generate_type_aliases_token_stream(&ast_type_alias_decls, &dependant_types);
    let type_aliases_map = generate_type_alias_token_streams(&dependant_types, &ast_type_alias_decls);

    println!("These are all of the dependencies that we found for the whole program");
    for thing in type_aliases_map.clone() {
        println!("{}", thing.0)
    }

    let type_aliases = type_aliases_map.iter().fold(quote!(), |acc, (_name, token_stream)| {
        quote!{
            #acc
            #token_stream
        }
    });

    quote! {
        #type_aliases
        #(#query_function_token_streams)*
        #(#update_function_token_streams)*

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
    }.into()
}

fn get_programs(ts_file_names: &Vec<&str>) -> Vec<Program> {
    ts_file_names.iter().map(|ts_file_name| {
        let filepath = Path::new(ts_file_name).to_path_buf();

        let cm: Lrc<SourceMap> = Default::default();

        let fm = cm.load_file(&filepath).unwrap();

        let lexer = Lexer::new(
            Syntax::Typescript(TsConfig::default()),
            Default::default(),
            StringInput::from(&*fm),
            None
        );

        let mut parser = Parser::new_from(lexer);

        let program = parser.parse_program().unwrap();

        program
    }).collect()
}
