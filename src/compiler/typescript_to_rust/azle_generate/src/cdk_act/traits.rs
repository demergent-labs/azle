use crate::cdk_act::{
    nodes::{
        ActCanisterMethodNode, ActFnParam, ActHeartbeatMethodNode, ActInitMethodNode,
        ActInspectMessageMethodNode, ActPostUpgradeMethodNode, ActPreUpgradeMethodNode,
    },
    ActDataTypeNode, RequestType,
};

pub trait SystemCanisterMethodBuilder {
    fn build_heartbeat_method(&self) -> Option<ActHeartbeatMethodNode>;
    fn build_init_method(&self) -> ActInitMethodNode;
    fn build_inspect_method(&self) -> Option<ActInspectMessageMethodNode>;
    fn build_pre_upgrade_method(&self) -> ActPreUpgradeMethodNode;
    fn build_post_upgrade_method(&self) -> ActPostUpgradeMethodNode;
}

pub trait CanisterMethodBuilder {
    fn build_canister_method_node(&self, request_type: &RequestType) -> ActCanisterMethodNode;
    fn build_params(&self) -> Vec<ActFnParam>;
    fn build_return_type(&self) -> ActDataTypeNode;
}
