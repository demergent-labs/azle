pub use abstract_canister_tree::AbstractCanisterTree;
pub use act_data_type_node::ActDataTypeNode;
pub use actable::Actable;
pub use nodes::CanisterMethod;
pub use nodes::CanisterMethodActNode;

pub mod abstract_canister_tree;
pub mod act_data_type_node;
pub mod actable;
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
