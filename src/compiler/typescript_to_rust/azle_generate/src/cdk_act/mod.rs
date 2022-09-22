pub use abstract_canister_tree::AbstractCanisterTree;
pub use actable::Actable;
pub use data_type_nodes::ActDataTypeNode;
pub use nodes::CanisterMethod;
pub use nodes::CanisterMethodActNode;

pub mod abstract_canister_tree;
pub mod actable;
pub mod data_type_nodes;
pub mod generators;
pub mod nodes;

pub enum CanisterMethodType {
    Heartbeat,
    Init,
    InspectMessage,
    PostUpgrade,
    PreUpgrade,
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
    fn to_token_stream(&self) -> proc_macro2::TokenStream;
}

pub trait ToTokenStreams {
    fn to_token_streams(&self) -> Vec<proc_macro2::TokenStream>;
}

impl<T: ToTokenStream> ToTokenStreams for Vec<T> {
    fn to_token_streams(&self) -> Vec<proc_macro2::TokenStream> {
        self.iter().map(|t| t.to_token_stream()).collect()
    }
}
