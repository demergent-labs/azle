use swc_ecma_ast::TsTypeLit;

use crate::ts_ast::GenerateInlineName;

impl GenerateInlineName for TsTypeLit {
    fn generate_inline_name(&self) -> String {
        let id = self.calculate_hash();
        format!("AzleInline{}", id)
    }
}
