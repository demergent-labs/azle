use cdk_framework::nodes::ActExternalCanister;
use swc_ecma_ast::ClassDecl;

use crate::ts_ast::Mapped;

impl Mapped<'_, ClassDecl> {
    pub fn to_act_external_canister(&self) -> ActExternalCanister {
        // TODO: Implement This

        ActExternalCanister {
            name: "TODO".to_string(),
            methods: vec![],
        }
    }
}
