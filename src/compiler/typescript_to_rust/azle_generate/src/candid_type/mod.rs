use cdk_framework::act::CandidTypes;
use swc_ecma_ast::TsTypeAliasDecl;

use crate::ts_ast::{source_map::SourceMapped, TsAst};

mod ts_type_alias_decl;

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

    fn extract_candid_types<F, T>(&self, extractor: F) -> Vec<T>
    where
        F: Fn(&SourceMapped<TsTypeAliasDecl>) -> Option<T>,
    {
        self.ts_type_alias_decls()
            .iter()
            .filter_map(|ts_type_alias_decl| extractor(ts_type_alias_decl))
            .collect()
    }
}
