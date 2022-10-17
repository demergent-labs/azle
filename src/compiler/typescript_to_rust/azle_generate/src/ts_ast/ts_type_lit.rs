use super::GenerateInlineName;
use swc_ecma_ast::TsTypeLit;

impl GenerateInlineName for TsTypeLit {
    fn generate_inline_name(&self) -> String {
        let id = self.calculate_hash();
        format!("AzleInline{}", id)
    }
}
