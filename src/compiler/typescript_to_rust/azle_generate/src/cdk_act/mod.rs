pub use act_node::ActNode;
pub use actable::Actable;
pub use canister_method::CanisterMethod;

pub mod act_node;
pub mod actable;
pub mod canister_method;
pub mod generators;

/// An easily traversable representation of a rust canister
///
/// TODO: This needs A LOT of work
pub struct AbstractCanisterTree {
    pub rust_code: proc_macro2::TokenStream,
}

impl AbstractCanisterTree {
    pub fn to_token_stream(&self) -> proc_macro2::TokenStream {
        self.rust_code.clone()
    }
}

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

pub trait CanisterTree {
    fn to_act(&self) -> AbstractCanisterTree;
}
