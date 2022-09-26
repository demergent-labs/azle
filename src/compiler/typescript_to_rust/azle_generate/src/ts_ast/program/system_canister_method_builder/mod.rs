use swc_ecma_ast::Program;

use crate::cdk_act::{
    nodes::{
        ActHeartbeatMethodNode, ActInitMethodNode, ActInspectMessageMethodNode,
        ActPostUpgradeMethodNode, ActPreUpgradeMethodNode,
    },
    traits::SystemCanisterMethodBuilder,
};

mod heartbeat;
mod init;
mod inspect_message;
mod post_upgrade;
mod pre_upgrade;

impl SystemCanisterMethodBuilder for Vec<Program> {
    fn build_heartbeat_method(&self) -> Option<ActHeartbeatMethodNode> {
        heartbeat::build_canister_method_system_heartbeat(self)
    }

    fn build_init_method(&self) -> ActInitMethodNode {
        init::build_canister_method_system_init(self)
    }

    fn build_inspect_method(&self) -> Option<ActInspectMessageMethodNode> {
        inspect_message::build_canister_method_system_inspect_message(self)
    }

    fn build_pre_upgrade_method(&self) -> ActPreUpgradeMethodNode {
        pre_upgrade::build_canister_method_system_pre_upgrade(self)
    }

    fn build_post_upgrade_method(&self) -> ActPostUpgradeMethodNode {
        post_upgrade::build_canister_method_system_post_upgrade(self)
    }
}
