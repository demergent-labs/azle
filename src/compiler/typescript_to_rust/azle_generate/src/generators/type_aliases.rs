use crate::{
    cdk_act::{ActDataType, Actable},
    ts_ast::{type_alias::azle_type_alias_decl::AzleTypeAliasListHelperMethods, AzleTypeAliasDecl},
};
use std::collections::HashSet;

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and convert those rust types to token streams
 */
pub fn build_type_alias_acts(
    type_names: &HashSet<String>,
    azle_type_aliases: &Vec<AzleTypeAliasDecl>,
) -> Vec<ActDataType> {
    let type_alias_lookup = azle_type_aliases.generate_type_alias_lookup();

    type_names.iter().fold(vec![], |acc, dependant_type_name| {
        let type_alias_decl = type_alias_lookup.get(dependant_type_name);
        let token_stream = match type_alias_decl {
            Some(azle_type_alias) => azle_type_alias.to_act_node().as_data_type().unwrap(),
            None => {
                todo!("ERROR: Dependant Type [{dependant_type_name}] not found type alias list!")
            }
        };
        vec![acc, vec![token_stream]].concat()
    })
}
