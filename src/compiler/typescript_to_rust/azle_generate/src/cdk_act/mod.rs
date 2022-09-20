pub use abstract_canister_tree::AbstractCanisterTree;
pub use act_data_type_node::ActDataTypeNode;
pub use actable::Actable;
pub use canister_method::CanisterMethod;

pub mod abstract_canister_tree;
pub mod act_data_type_node;
pub mod actable;
pub mod canister_method;
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
