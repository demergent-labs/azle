use swc_ecma_ast::TsTupleType;

use crate::ts_ast::GenerateInlineName;

impl GenerateInlineName for TsTupleType {
    fn generate_inline_name(&self) -> String {
        format!("AzleInlineTuple{}", self.calculate_hash())
    }
}
