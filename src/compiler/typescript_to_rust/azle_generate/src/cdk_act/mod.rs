use proc_macro2::TokenStream;

pub use abstract_canister_tree::AbstractCanisterTree;
pub use actable::Actable;
pub use actable::ToActDataType;
pub use nodes::data_type_nodes::ActDataType;
pub use nodes::ActCanisterMethod;
pub use nodes::CanisterMethod;

pub mod abstract_canister_tree;
pub mod actable;
pub mod generators;
pub mod nodes;
pub mod traits;

pub enum CanisterMethodType {
    Heartbeat,
    Init,
    InspectMessage,
    PostUpgrade,
    PreUpgrade,
    Query,
    Update,
}

pub enum RequestType {
    Query,
    Update,
}

pub enum SystemStructureType {
    Canister,
}

pub trait ToAct {
    fn to_act(&self) -> AbstractCanisterTree;
}

pub trait ToTokenStream {
    fn to_token_stream(&self) -> TokenStream;
}

pub trait ToTokenStreams {
    fn to_token_streams(&self) -> Vec<TokenStream>;
}

impl<T: ToTokenStream> ToTokenStreams for Vec<T> {
    fn to_token_streams(&self) -> Vec<TokenStream> {
        self.iter().map(|t| t.to_token_stream()).collect()
    }
}

impl<T: ToTokenStream> ToTokenStream for Option<T> {
    fn to_token_stream(&self) -> TokenStream {
        match self {
            Some(t) => t.to_token_stream(),
            None => quote::quote! {},
        }
    }
}
