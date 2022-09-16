use std::collections::HashSet;

use proc_macro2::TokenStream;
use quote::quote;
use swc_ecma_ast::TsTypeAliasDecl;

use crate::azle_act::{act_node::PrimitiveInfo, ActNode, Actable};

use super::type_aliases;

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and convert those rust types to token streams
 */
pub fn generate_type_alias_acts(
    type_names: &HashSet<String>,
    ast_type_alias_variant_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<ActNode> {
    let type_alias_lookup = type_aliases::generate_type_alias_lookup(ast_type_alias_variant_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    // TODO I'm guessing that we aren't going to want acc to be mutable
    type_names.iter().fold(vec![], |acc, dependant_type| {
        let type_alias_decl = type_alias_lookup.get(dependant_type);
        let token_stream = match type_alias_decl {
            Some(type_alias_decl) => {
                type_alias_decl_to_type_definition_token_stream(type_alias_decl)
            }
            None => {
                // For right now we are going to assume that if it's not in the map then we caught it somewhere else
                // TODO for the future we should fix that assumption by limiting type_alias_variants to be only the variants
                // Right now I think we are passing in whatever
                // todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!")
                ActNode::Primitive(PrimitiveInfo {
                    identifier: quote!(),
                })
            }
        };
        vec![acc, vec![token_stream]].concat()
    })
}

fn type_alias_decl_to_type_definition_token_stream(type_alias_decl: &TsTypeAliasDecl) -> ActNode {
    type_alias_decl.to_act()
}

pub fn generate_type_definition_token_streams(acts: &Vec<ActNode>) -> Vec<TokenStream> {
    acts.iter()
        .map(|act| act.to_type_definition_token_stream())
        .collect()
}
