use proc_macro2::TokenStream;

#[derive(Clone)]
pub struct StableBTreeMap {
    pub memory_id: u8,
    pub key_type: TokenStream,
    pub value_type: TokenStream,
    pub max_key_size: u32,
    pub max_value_size: u32,
}
