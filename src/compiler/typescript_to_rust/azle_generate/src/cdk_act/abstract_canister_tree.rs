use proc_macro2::TokenStream;

use super::{
    generators::{candid_file_generation, random, vm_value_conversion},
    nodes::{
        data_type_nodes, ActExternalCanister,
        {
            ActCanisterMethod, ActHeartbeatMethod, ActInitMethod, ActInspectMessageMethod,
            ActPostUpgradeMethod, ActPreUpgradeMethod,
        },
    },
    ActDataType, ToTokenStream, ToTokenStreams,
};

/// An easily traversable representation of a rust canister
pub struct AbstractCanisterTree {
    pub arrays: Vec<ActDataType>,
    pub external_canisters: Vec<ActExternalCanister>,
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
        let randomness_implementation = random::generate_randomness_implementation();

        let try_into_vm_value_trait = vm_value_conversion::generate_try_into_vm_value();
        let try_into_vm_value_impls = &self.try_into_vm_value_impls;
        let try_from_vm_value_trait = vm_value_conversion::generate_try_from_vm_value();
        let try_from_vm_value_impls = &self.try_from_vm_value_impls;

        let func_arg_token = data_type_nodes::generate_func_arg_token();

        let cross_canister_functions = self.external_canisters.to_token_streams();

        let user_defined_code = &self.rust_code;

        let heartbeat_method = self.heartbeat_method.to_token_stream();
        let init_method = self.init_method.to_token_stream();
        let inspect_message_method = self.inspect_message_method.to_token_stream();
        let post_upgrade_method = self.post_upgrade_method.to_token_stream();
        let pre_upgrade_method = self.pre_upgrade_method.to_token_stream();

        let query_methods = self.query_methods.to_token_streams();
        let update_methods = self.update_methods.to_token_streams();

        let candid_file_generation_code =
            candid_file_generation::generate_candid_file_generation_code();

        let arrays: Vec<TokenStream> = self.arrays.to_token_streams();
        let funcs: Vec<TokenStream> = self.funcs.iter().map(|act| act.to_token_stream()).collect();
        let options: Vec<TokenStream> = self.options.to_token_streams();
        let primitives: Vec<TokenStream> = self.primitives.to_token_streams();
        let records: Vec<TokenStream> = self.records.to_token_streams();
        let tuples: Vec<TokenStream> = self.tuples.to_token_streams();
        let type_refs: Vec<TokenStream> = self.type_refs.to_token_streams();
        let variants: Vec<TokenStream> = self.variants.to_token_streams();

        quote::quote! {
            #randomness_implementation

            #try_into_vm_value_trait
            #try_into_vm_value_impls
            #try_from_vm_value_trait
            #try_from_vm_value_impls


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

            #(#cross_canister_functions)*

            #user_defined_code

            #candid_file_generation_code
        }
    }
}
