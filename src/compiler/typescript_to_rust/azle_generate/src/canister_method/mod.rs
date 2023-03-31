use cdk_framework::act::CanisterMethods;

use crate::ts_ast::TsAst;

pub use annotation::Annotation;
pub use errors::ParseError;

mod annotation;
mod get_azle_fn_decls;
mod heartbeat;
mod init;
mod inspect_message;
mod module_item;
mod post_upgrade;
mod pre_upgrade;
mod query_and_update;
mod rust;

pub mod errors;
pub mod module;

impl TsAst {
    pub fn build_canister_methods(&self) -> CanisterMethods {
        let heartbeat_method = self.build_heartbeat_method();
        let init_method = Some(self.build_init_method());
        let inspect_message_method = self.build_inspect_message_method();
        let post_upgrade_method = Some(self.build_post_upgrade_method());
        let pre_upgrade_method = self.build_pre_upgrade_method();
        let query_methods = self.build_query_methods();
        let update_methods = self.build_update_methods();

        CanisterMethods {
            heartbeat_method,
            init_method,
            inspect_message_method,
            post_upgrade_method,
            pre_upgrade_method,
            query_methods,
            update_methods,
        }
    }
}
