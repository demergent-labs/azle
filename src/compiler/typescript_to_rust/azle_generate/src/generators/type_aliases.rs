use crate::{
    cdk_act::{ActNode, Actable},
    ts_ast::ts_type_alias_decl,
};
use proc_macro2::TokenStream;
use std::collections::HashSet;
use swc_ecma_ast::TsTypeAliasDecl;

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and convert those rust types to token streams
 */
pub fn generate_type_alias_acts(
    type_names: &HashSet<String>,
    ast_type_alias_variant_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<ActNode> {
    let type_alias_lookup =
        ts_type_alias_decl::generate_type_alias_lookup(ast_type_alias_variant_decls);

    type_names.iter().fold(vec![], |acc, dependant_type| {
        let type_alias_decl = type_alias_lookup.get(dependant_type);
        let token_stream = match type_alias_decl {
            Some(type_alias_decl) => type_alias_decl.to_act_node(),
            None => {
                todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!")
            }
        };
        vec![acc, vec![token_stream]].concat()
    })
}

pub fn generate_type_definition_token_streams(acts: &Vec<ActNode>) -> Vec<TokenStream> {
    acts.iter()
        .map(|act| act.to_type_definition_token_stream())
        .collect()
}
