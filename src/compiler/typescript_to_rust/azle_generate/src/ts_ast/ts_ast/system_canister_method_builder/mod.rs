use cdk_framework::{
    nodes::{
        ActHeartbeatMethod, ActInitMethod, ActInspectMessageMethod, ActPostUpgradeMethod,
        ActPreUpgradeMethod,
    },
    traits::SystemCanisterMethodBuilder,
};

use super::TsAst;

mod heartbeat;
mod init;
mod inspect_message;
mod post_upgrade;
mod pre_upgrade;

impl SystemCanisterMethodBuilder for TsAst {
    fn build_heartbeat_method(&self) -> Option<ActHeartbeatMethod> {
        heartbeat::build_canister_method_system_heartbeat(self)
    }

    fn build_init_method(&self) -> ActInitMethod {
        init::build_canister_method_system_init(self)
    }

    fn build_inspect_method(&self) -> Option<ActInspectMessageMethod> {
        inspect_message::build_canister_method_system_inspect_message(self)
    }

    fn build_pre_upgrade_method(&self) -> ActPreUpgradeMethod {
        pre_upgrade::build_canister_method_system_pre_upgrade(self)
    }

    fn build_post_upgrade_method(&self) -> ActPostUpgradeMethod {
        post_upgrade::build_canister_method_system_post_upgrade(self)
    }
}
