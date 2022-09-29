use crate::cdk_act::{
    nodes::{
        ActCanisterMethod, ActFnParam, ActHeartbeatMethod, ActInitMethod, ActInspectMessageMethod,
        ActPostUpgradeMethod, ActPreUpgradeMethod,
    },
    ActDataType, RequestType,
};

pub trait SystemCanisterMethodBuilder {
    fn build_heartbeat_method(&self) -> Option<ActHeartbeatMethod>;
    fn build_init_method(&self) -> ActInitMethod;
    fn build_inspect_method(&self) -> Option<ActInspectMessageMethod>;
    fn build_pre_upgrade_method(&self) -> ActPreUpgradeMethod;
    fn build_post_upgrade_method(&self) -> ActPostUpgradeMethod;
}

pub trait CanisterMethodBuilder {
    fn build_canister_method_node(&self, request_type: &RequestType) -> ActCanisterMethod;
    fn build_params(&self) -> Vec<ActFnParam>;
    fn build_return_type(&self) -> ActDataType;
}
