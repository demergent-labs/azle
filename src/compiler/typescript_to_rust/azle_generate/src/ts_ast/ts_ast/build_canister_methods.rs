use cdk_framework::act::CanisterMethods;

use super::TsAst;

impl TsAst {
    pub fn build_canister_methods(&self) -> CanisterMethods {
        let heartbeat_method = self.build_heartbeat_method();
        let init_method = self.build_init_method();
        let inspect_message_method = self.build_inspect_method();
        let post_upgrade_method = self.build_post_upgrade_method();
        let pre_upgrade_method = self.build_pre_upgrade_method();
        let query_methods = self.build_query_methods();
        let update_methods = self.build_update_methods();

        CanisterMethods {
            heartbeat_method,
            init_method,
            inspect_message_method,
            post_upgrade_method,
            pre_upgrade_method: Some(pre_upgrade_method),
            query_methods,
            update_methods,
        }
    }
}
