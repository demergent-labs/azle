use super::GenerateInlineName;

use swc_ecma_ast::TsTupleType;

impl GenerateInlineName for TsTupleType {
    fn generate_inline_name(&self) -> String {
        format!("AzleInlineTuple{}", self.calculate_hash())
    }
}
