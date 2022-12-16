use cdk_framework::{ToAct, ToTokenStream};
use quote::quote;

use crate::{generators::header, ts_ast::TsAst};

mod errors;
mod generators;
mod ts_ast;
mod ts_keywords;

pub fn azle_generate(
    ts_file_names: &Vec<&str>,
    main_js: &str,
    stable_storage_js: &str,
) -> proc_macro2::token_stream::TokenStream {
    let header = header::generate_header_code(main_js, stable_storage_js);

    let canister_definition = TsAst::from_ts_file_names(&ts_file_names)
        .to_act()
        .to_token_stream(());

    quote! {
        #header
        #canister_definition
    }
    .into()
}
