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

pub use act_node::ActNode;
pub use actable::Actable;
pub use canister_method::CanisterMethod;

pub mod generators;

pub mod act_node;
pub mod actable;
pub mod canister_method;
