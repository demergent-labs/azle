use cdk_framework::act::CandidTypes;

use super::TsAst;

impl TsAst {
    pub fn build_candid_types(&self) -> CandidTypes {
        let funcs =
            self.ts_type_alias_decls()
                .iter()
                .fold(vec![], |mut acc, ts_type_alias_decl| {
                    if let Some(func) = ts_type_alias_decl.to_func() {
                        acc.push(func)
                    }
                    acc
                });

        let records =
            self.ts_type_alias_decls()
                .iter()
                .fold(vec![], |mut acc, ts_type_alias_decl| {
                    if let Some(record) = ts_type_alias_decl.to_record() {
                        acc.push(record)
                    }
                    acc
                });

        let services = self.build_services();

        let tuples =
            self.ts_type_alias_decls()
                .iter()
                .fold(vec![], |mut acc, ts_type_alias_decl| {
                    if let Some(tuple) = ts_type_alias_decl.to_tuple() {
                        acc.push(tuple)
                    }
                    acc
                });

        let type_aliases =
            self.ts_type_alias_decls()
                .iter()
                .fold(vec![], |mut acc, ts_type_alias_decl| {
                    if let Some(type_alias) = ts_type_alias_decl.to_type_alias() {
                        acc.push(type_alias)
                    }
                    acc
                });

        let variants =
            self.ts_type_alias_decls()
                .iter()
                .fold(vec![], |mut acc, ts_type_alias_decl| {
                    if let Some(variant) = ts_type_alias_decl.to_variant() {
                        acc.push(variant)
                    }
                    acc
                });

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
