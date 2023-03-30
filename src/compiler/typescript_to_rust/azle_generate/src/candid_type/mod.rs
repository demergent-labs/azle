use cdk_framework::act::CandidTypes;

use crate::ts_ast::TsAst;

mod ts_ast;
mod ts_type_alias_decl;

pub mod azle_type_ref;

impl TsAst {
    pub fn build_candid_types(&self) -> CandidTypes {
        let funcs = self.extract_candid_types(|x| x.to_func());
        let records = self.extract_candid_types(|x| x.to_record());
        let services = self.build_services();
        let tuples = self.extract_candid_types(|x| x.to_tuple());
        let type_aliases = self.extract_candid_types(|x| x.to_type_alias());
        let variants = self.extract_candid_types(|x| x.to_variant());

        CandidTypes {
            funcs,
            records,
            services,
            tuples,
            type_aliases,
            variants,
        }
    }
}
