use swc_ecma_ast::TsFnParam;

use crate::ts_ast::GetName;

impl GetName for TsFnParam {
    fn get_name(&self) -> &str {
        match self {
            TsFnParam::Ident(identifier) => identifier.id.get_name(),
            TsFnParam::Array(_) => todo!(),
            TsFnParam::Rest(_) => todo!(),
            TsFnParam::Object(_) => todo!(),
        }
    }
}
