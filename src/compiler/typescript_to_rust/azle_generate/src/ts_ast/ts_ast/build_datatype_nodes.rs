use cdk_framework::act::DataTypes;

use super::TsAst;

impl TsAst {
    pub fn build_data_types(&self) -> DataTypes {
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

        // let tuples =
        //     self.ts_type_alias_decls()
        //         .iter()
        //         .fold(vec![], |mut acc, ts_type_alias_decl| {
        //             if let Some(tuple) = ts_type_alias_decl.to_tuple() {
        //                 acc.push(tuple)
        //             }
        //             acc
        //         });

        let variants =
            self.ts_type_alias_decls()
                .iter()
                .fold(vec![], |mut acc, ts_type_alias_decl| {
                    if let Some(variant) = ts_type_alias_decl.to_variant() {
                        acc.push(variant)
                    }
                    acc
                });

        DataTypes {
            funcs,
            records,
            tuples: vec![],
            type_aliases: vec![],
            variants,
        }
    }
}
