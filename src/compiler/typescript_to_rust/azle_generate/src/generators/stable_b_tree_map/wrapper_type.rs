use cdk_framework::{ActDataType, ToTokenStream};
use proc_macro2::{Ident, TokenStream};
use quote::{format_ident, quote};

pub fn generate(
    act_data_type: &ActDataType,
    memory_id: u8,
    key_or_value: &str,
) -> (Ident, TokenStream) {
    let inner_type = &act_data_type.to_token_stream(&vec![]); // TODO do we need the keyword lists?
    let wrapper_struct_name = format_ident!("StableBTreeMap{}{}Type", memory_id, key_or_value);

    (
        wrapper_struct_name.clone(),
        quote! {
            #[derive(CandidType, Deserialize, CdkActTryFromVmValue)]
            struct #wrapper_struct_name(#inner_type);
        },
    )
}
