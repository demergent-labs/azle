use super::generators::candid_file_generation;

/// An easily traversable representation of a rust canister
///
/// TODO: This needs A LOT of work
pub struct AbstractCanisterTree {
    pub rust_code: proc_macro2::TokenStream,
}

impl AbstractCanisterTree {
    pub fn to_token_stream(&self) -> proc_macro2::TokenStream {
        // TODO: This needs A LOT of work
        let user_defined_code = &self.rust_code;

        let candid_file_generation_code =
            candid_file_generation::generate_candid_file_generation_code();

        quote::quote! {
            #user_defined_code

            #candid_file_generation_code
        }
    }
}
