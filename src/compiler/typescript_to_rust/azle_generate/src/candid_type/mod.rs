use cdk_framework::act::CandidTypes;
use swc_ecma_ast::TsTypeAliasDecl;

use crate::ts_ast::{SourceMapped, TsAst};

pub mod func;
pub mod opt;
pub mod primitive;
pub mod record;
pub mod service;
pub mod tuple;
pub mod type_alias;
pub mod type_param;
pub mod type_ref;
pub mod variant;
pub mod vec;

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

    pub fn extract_candid_types<F, T>(&self, extractor: F) -> Vec<T>
    where
        F: Fn(&SourceMapped<TsTypeAliasDecl>) -> Option<T>,
    {
        self.ts_type_alias_decls()
            .iter()
            .filter_map(|ts_type_alias_decl| extractor(ts_type_alias_decl))
            .collect()
    }
}
