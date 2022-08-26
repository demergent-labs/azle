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
    get_query_fn_decls, get_update_fn_decls, generate_update_function_token_streams, get_ast_type_alias_decls_from_programs, FunctionInformation, StructInfoTODORename,
};

use crate::generators::canister_methods::generate_type_alias_token_streams;

fn collect_function_type_dependencies(function_info: &Vec<FunctionInformation>) -> HashSet<String>{
    let dependencies = function_info
        .iter()
        .fold(vec![], |acc, fun_info| {
            vec![acc, fun_info.dependant_types.clone()].concat()
        });
    HashSet::from_iter(dependencies.iter().cloned())
}

fn collect_inline_dependencies(function_info: &Vec<FunctionInformation>) -> Vec<proc_macro2::TokenStream> {
    function_info
        .iter()
        .fold(vec![], |acc, fun_info| {
            vec![acc, get_better_name(&fun_info.inline_dependant_types)].concat()
        })
}

fn get_better_name(struct_info: &Vec<StructInfoTODORename>) -> Vec<proc_macro2::TokenStream> {
    struct_info.iter().fold(vec![], |acc2, inlines| {
        let thing = &inlines.structure;
        let things = get_better_name(&inlines.inline_dependencies);
        vec![acc2, things, vec![thing.clone()]].concat()
    })
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
    let count = 0;

    let query_function_info = generate_query_function_infos(&ast_fnc_decls_query, count);
    let count = query_function_info.1;
    let query_function_info = query_function_info.0;
    let query_function_token_streams: Vec<proc_macro2::TokenStream> = query_function_info
        .iter()
        .map(|fun_info| {
            fun_info.token_stream.clone()
        })
        .collect();

    // let query_inline_type_aliases = quote!();
    let update_function_info = generate_update_function_token_streams(&ast_fnc_decls_update, count);
    let count = update_function_info.1;
    let update_function_info = update_function_info.0;
    let update_function_token_streams: Vec<proc_macro2::TokenStream> = update_function_info
        .iter()
        .map(|fun_info| {
            fun_info.token_stream.clone()
        })
        .collect();
    // let update_inline_type_aliases = quote!();

    // Collect all dependant names
    let query_function_dependant_types = collect_function_type_dependencies(&query_function_info);
    let update_function_dependant_types = collect_function_type_dependencies(&update_function_info);

    let type_alias_dependant_types: HashSet<&String> = query_function_dependant_types.union(&update_function_dependant_types).collect();

    let query_function_inline_dependant_types = collect_inline_dependencies(&query_function_info);
    let update_function_inline_dependant_types = collect_inline_dependencies(&update_function_info);
    let inline_types = vec![query_function_inline_dependant_types, update_function_inline_dependant_types].concat();

    // println!("#######################\nThese are the inline types {:#?}", inline_types);
    println!("#######################\nThese are the dependant types {:#?}", type_alias_dependant_types);

    // let type_aliases = generate_type_aliases_token_stream(&ast_type_alias_decls, &dependant_types);
    let type_aliases_map = generate_type_alias_token_streams(&type_alias_dependant_types, &ast_type_alias_decls, count);
    let count = type_aliases_map.1;
    let type_aliases_map = type_aliases_map.0;

    println!("We found {count} inline types");

    let type_aliases = type_aliases_map.iter().fold(quote!(), |acc, (_name, token_stream)| {
        quote!{
            #acc
            #token_stream
        }
    });

    quote! {
        #(#inline_types)*
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
