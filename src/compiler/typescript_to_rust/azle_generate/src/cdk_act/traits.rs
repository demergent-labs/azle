use swc_common::SourceMap;

use crate::cdk_act::{
    nodes::{
        ActCanisterMethod, ActFnParam, ActHeartbeatMethod, ActInitMethod, ActInspectMessageMethod,
        ActPostUpgradeMethod, ActPreUpgradeMethod,
    },
    ActDataType, RequestType,
};

pub trait SystemCanisterMethodBuilder {
    fn build_heartbeat_method(&self) -> Option<ActHeartbeatMethod>;
    fn build_init_method(&self, source_map: &SourceMap) -> ActInitMethod;
    fn build_inspect_method(&self) -> Option<ActInspectMessageMethod>;
    fn build_pre_upgrade_method(&self) -> ActPreUpgradeMethod;
    fn build_post_upgrade_method(&self, source_map: &SourceMap) -> ActPostUpgradeMethod;
}

pub trait CanisterMethodBuilder {
    fn build_canister_method_node(
        &self,
        request_type: &RequestType,
        source_map: &SourceMap,
    ) -> ActCanisterMethod;
    fn build_params(&self, source_map: &SourceMap) -> Vec<ActFnParam>;
    fn build_return_type(&self, source_map: &SourceMap) -> ActDataType;
}
