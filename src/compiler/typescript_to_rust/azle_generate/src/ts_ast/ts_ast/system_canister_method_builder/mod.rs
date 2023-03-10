use cdk_framework::act::node::canister_method::{
    HeartbeatMethod, InitMethod, InspectMessageMethod, PostUpgradeMethod, PreUpgradeMethod,
};

use super::TsAst;

mod heartbeat;
mod init;
mod inspect_message;
mod post_upgrade;
mod pre_upgrade;

impl TsAst {
    pub fn build_heartbeat_method(&self) -> Option<HeartbeatMethod> {
        heartbeat::build_canister_method_system_heartbeat(self)
    }

    pub fn build_init_method(&self) -> InitMethod {
        init::build_canister_method_system_init(self)
    }

    pub fn build_inspect_method(&self) -> Option<InspectMessageMethod> {
        inspect_message::build_canister_method_system_inspect_message(self)
    }

    pub fn build_pre_upgrade_method(&self) -> PreUpgradeMethod {
        pre_upgrade::build_canister_method_system_pre_upgrade(self)
    }

    pub fn build_post_upgrade_method(&self) -> PostUpgradeMethod {
        post_upgrade::build_canister_method_system_post_upgrade(self)
    }
}
