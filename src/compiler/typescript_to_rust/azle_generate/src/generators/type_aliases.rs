use crate::{
    cdk_act::{ActDataType, Actable},
    ts_ast::ts_type_alias_decl::TsTypeAliasHelperMethods,
};
use std::collections::HashSet;
use swc_ecma_ast::TsTypeAliasDecl;

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and convert those rust types to token streams
 */
pub fn build_type_alias_acts(
    type_names: &HashSet<String>,
    ast_type_alias_variant_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<ActDataType> {
    let type_alias_lookup = ast_type_alias_variant_decls.generate_type_alias_lookup();

    type_names.iter().fold(vec![], |acc, dependant_type| {
        let type_alias_decl = type_alias_lookup.get(dependant_type);
        let token_stream = match type_alias_decl {
            Some(type_alias_decl) => type_alias_decl.to_act_node().as_data_type().unwrap(),
            None => {
                todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!")
            }
        };
        vec![acc, vec![token_stream]].concat()
    })
}
