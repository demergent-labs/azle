use cdk_framework::{
    act::CandidTypes,
    traits::{CollectIterResults, CollectResults},
};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::{
    ts_ast::{SourceMapped, TsAst},
    Error,
};

pub mod errors;
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
    pub fn build_candid_types(&self) -> Result<CandidTypes, Vec<Error>> {
        let (type_aliases, funcs, records, services, tuples, variants) = (
            self.extract_candid_types(|x| x.to_type_alias()),
            self.extract_candid_types(|x| x.to_func()),
            self.extract_candid_types(|x| x.to_record()),
            self.build_services(),
            self.extract_candid_types(|x| x.to_tuple()),
            self.extract_candid_types(|x| x.to_variant()),
        )
            .collect_results()?;

        Ok(CandidTypes {
            funcs,
            records,
            services,
            tuples,
            type_aliases,
            variants,
        })
    }

    pub fn extract_candid_types<F, T>(&self, extractor: F) -> Result<Vec<T>, Vec<Error>>
    where
        F: Fn(&SourceMapped<TsTypeAliasDecl>) -> Result<Option<T>, Vec<Error>>,
    {
        self.ts_type_alias_decls()
            .iter()
            .map(|ts_type_alias_decl| extractor(&ts_type_alias_decl).transpose())
            .flatten()
            .collect_results()
    }
}
