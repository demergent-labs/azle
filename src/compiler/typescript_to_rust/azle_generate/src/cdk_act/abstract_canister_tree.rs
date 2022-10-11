use proc_macro2::TokenStream;

use super::{
    generators::{candid_file_generation, ic_object::functions, random, vm_value_conversion},
    nodes::{
        data_type_nodes,
        {
            ActCanisterMethod, ActHeartbeatMethod, ActInitMethod, ActInspectMessageMethod,
            ActPostUpgradeMethod, ActPreUpgradeMethod,
        },
    },
    ActDataType, ToTokenStream, ToTokenStreams,
};

/// An easily traversable representation of a rust canister
///
/// TODO: This needs A LOT of work
pub struct AbstractCanisterTree {
    pub arrays: Vec<ActDataType>,
    pub funcs: Vec<ActDataType>,
    pub heartbeat_method: Option<ActHeartbeatMethod>,
    pub init_method: ActInitMethod,
    pub inspect_message_method: Option<ActInspectMessageMethod>,
    pub options: Vec<ActDataType>,
    pub post_upgrade_method: ActPostUpgradeMethod,
    pub pre_upgrade_method: ActPreUpgradeMethod,
    pub primitives: Vec<ActDataType>,
    pub query_methods: Vec<ActCanisterMethod>,
    pub records: Vec<ActDataType>,
    pub rust_code: TokenStream,
    pub try_from_vm_value_impls: TokenStream,
    pub try_into_vm_value_impls: TokenStream,
    pub tuples: Vec<ActDataType>,
    pub type_refs: Vec<ActDataType>,
    pub update_methods: Vec<ActCanisterMethod>,
    pub variants: Vec<ActDataType>,
}

impl ToTokenStream for AbstractCanisterTree {
    fn to_token_stream(&self) -> TokenStream {
        // TODO: This needs A LOT of work
        let randomness_implementation = random::generate_randomness_implementation();

        let try_into_vm_value_trait = vm_value_conversion::generate_try_into_vm_value();
        let try_into_vm_value_impls = &self.try_into_vm_value_impls;
        let try_from_vm_value_trait = vm_value_conversion::generate_try_from_vm_value();
        let try_from_vm_value_impls = &self.try_from_vm_value_impls;

        let func_arg_token = data_type_nodes::generate_func_arg_token();

        let user_defined_code = &self.rust_code;

        let heartbeat_method = self.heartbeat_method.to_token_stream();
        let init_method = self.init_method.to_token_stream();
        let inspect_message_method = self.inspect_message_method.to_token_stream();
        let post_upgrade_method = self.post_upgrade_method.to_token_stream();
        let pre_upgrade_method = self.pre_upgrade_method.to_token_stream();

        let query_methods = self.query_methods.to_token_streams();
        let update_methods = self.update_methods.to_token_streams();

        // TODO: Remove these clones
        let query_and_update_canister_methods: Vec<ActCanisterMethod> =
            vec![self.query_methods.clone(), self.update_methods.clone()].concat();
        let ic_object_functions =
            functions::generate_ic_object_functions(&query_and_update_canister_methods);

        let candid_file_generation_code =
            candid_file_generation::generate_candid_file_generation_code();

        let arrays: Vec<TokenStream> = self
            .arrays
            .iter()
            .map(|act| act.to_token_stream())
            .collect();
        let funcs: Vec<TokenStream> = self.funcs.iter().map(|act| act.to_token_stream()).collect();
        let options: Vec<TokenStream> = self
            .options
            .iter()
            .map(|act| act.to_token_stream())
            .collect();
        let primitives: Vec<TokenStream> = self
            .primitives
            .iter()
            .map(|act| act.to_token_stream())
            .collect();
        let records: Vec<TokenStream> = self
            .records
            .iter()
            .map(|act| act.to_token_stream())
            .collect();
        let tuples: Vec<TokenStream> = self
            .tuples
            .iter()
            .map(|act| act.to_token_stream())
            .collect();
        let type_refs: Vec<TokenStream> = self
            .type_refs
            .iter()
            .map(|act| act.to_token_stream())
            .collect();
        let variants: Vec<TokenStream> = self
            .variants
            .iter()
            .map(|act| act.to_token_stream())
            .collect();

        quote::quote! {
            #randomness_implementation

            #try_into_vm_value_trait
            #try_into_vm_value_impls
            #try_from_vm_value_trait
            #try_from_vm_value_impls

            #ic_object_functions

            #heartbeat_method
            #init_method
            #inspect_message_method
            #post_upgrade_method
            #pre_upgrade_method

            #(#query_methods)*
            #(#update_methods)*
            #func_arg_token

            #(#arrays)*
            #(#type_refs)*
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
