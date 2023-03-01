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

        // let ast_type_alias_decls = &self.azle_programs.get_azle_type_alias_decls();
        // let all_types = ast_type_alias_decls.build_type_alias_acts();

        // TODO: Flesh this out
        DataTypes {
            funcs,
            records: vec![],
            tuples: vec![],
            type_aliases: vec![],
            variants: vec![],
        }
    }
}
