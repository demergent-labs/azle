use proc_macro2::TokenStream;

use super::{
    generators::{candid_file_generation, ic_object::functions, random},
    nodes::CanisterMethodActNode,
    ActDataTypeNode, ToTokenStream, ToTokenStreams,
};

/// An easily traversable representation of a rust canister
///
/// TODO: This needs A LOT of work
pub struct AbstractCanisterTree {
    pub rust_code: TokenStream,
    pub update_methods: Vec<CanisterMethodActNode>,
    pub query_methods: Vec<CanisterMethodActNode>,
    pub aliases: Vec<ActDataTypeNode>,
    pub arrays: Vec<ActDataTypeNode>,
    pub funcs: Vec<ActDataTypeNode>,
    pub options: Vec<ActDataTypeNode>,
    pub primitives: Vec<ActDataTypeNode>,
    pub records: Vec<ActDataTypeNode>,
    pub tuples: Vec<ActDataTypeNode>,
    pub variants: Vec<ActDataTypeNode>,
}

impl ToTokenStream for AbstractCanisterTree {
    fn to_token_stream(&self) -> TokenStream {
        // TODO: This needs A LOT of work
        let randomness_implementation = random::generate_randomness_implementation();

        let user_defined_code = &self.rust_code;
        let query_methods = self.query_methods.to_token_streams();
        let update_methods = self.update_methods.to_token_streams();

        // TODO: Remove these clones
        let query_and_update_canister_methods: Vec<CanisterMethodActNode> =
            vec![self.query_methods.clone(), self.update_methods.clone()].concat();
        let ic_object_functions =
            functions::generate_ic_object_functions(&query_and_update_canister_methods);

        let candid_file_generation_code =
            candid_file_generation::generate_candid_file_generation_code();

        let aliases: Vec<TokenStream> = self
            .aliases
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let arrays: Vec<TokenStream> = self
            .arrays
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let funcs: Vec<TokenStream> = self
            .funcs
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let options: Vec<TokenStream> = self
            .options
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let primitives: Vec<TokenStream> = self
            .primitives
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let records: Vec<TokenStream> = self
            .records
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let tuples: Vec<TokenStream> = self
            .tuples
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();
        let variants: Vec<TokenStream> = self
            .variants
            .iter()
            .map(|act| act.to_type_definition_token_stream())
            .collect();

        quote::quote! {
            #randomness_implementation

            #ic_object_functions

            #(#query_methods)*
            #(#update_methods)*

            #(#arrays)*
            #(#aliases)*
            #(#funcs)*
            #(#options)*
            #(#primitives)*
            #(#records)*
            #(#tuples)*
            #(#variants)*

            #user_defined_code

            #candid_file_generation_code
        }
    }
}
