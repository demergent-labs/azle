use proc_macro::TokenStream;
use azle_generate::azle_generate;
use syn::{parse_macro_input, LitStr};

#[proc_macro]
pub fn generate(ts_file_names_token_stream: TokenStream) -> TokenStream {
    let ts_file_names_string_literal = parse_macro_input!(ts_file_names_token_stream as LitStr);
    let ts_file_names_string_value = ts_file_names_string_literal.value();

    let ts_file_names: Vec<&str> = ts_file_names_string_value.split(",").collect();

    azle_generate(&ts_file_names).into()
}
