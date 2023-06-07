use cdk_framework::{act::CandidTypes, traits::CollectResults};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::{
    errors::CollectResults as OtherCollectResults,
    ts_ast::{Program, SourceMapped, TsAst},
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
            self.extract_candid_types(|x| x.to_type_alias(), |p| &p.symbol_table.alias),
            self.extract_candid_types(|x| x.to_func(), |p| &p.symbol_table.func),
            self.extract_candid_types(|x| x.to_record(), |p| &p.symbol_table.record),
            self.build_services(),
            self.extract_candid_types(|x| x.to_tuple(), |p| &p.symbol_table.tuple),
            self.extract_candid_types(|x| x.to_variant(), |p| &p.symbol_table.variant),
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

    pub fn extract_candid_types<G, F, T, Symbol>(
        &self,
        extractor: F,
        ask_dan_and_jordan_for_better_namer: G,
    ) -> Result<Vec<T>, Vec<Error>>
    where
        F: Fn(&SourceMapped<TsTypeAliasDecl>) -> Result<Option<T>, Vec<Error>>,
        G: Fn(&Program) -> &Vec<Symbol>,
    {
        self.programs
            .iter()
            .flat_map(|program| {
                if ask_dan_and_jordan_for_better_namer(program).len() > 0 {
                    program.ts_type_alias_decls()
                } else {
                    vec![]
                }
            })
            .map(|ts_type_alias_decl| extractor(&ts_type_alias_decl).transpose())
            .flatten()
            .collect_results()
    }
}
