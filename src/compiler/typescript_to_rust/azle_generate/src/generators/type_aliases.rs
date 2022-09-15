use std::collections::{HashMap, HashSet};

use proc_macro2::TokenStream;
use quote::{format_ident, quote};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::azle_act;

/**
 * Loops through all of the dependant types, finds the corresponding ts types in
 * the type aliases, converts them to a rust type, and inserts it into the
 * result map
 */
pub fn generate_other_type_alias_token_streams(
    type_alias_dependant_types: &HashSet<String>,
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TokenStream> {
    let type_alias_lookup = generate_type_alias_lookup(ast_type_alias_decls);

    // For each dependant type, generate a dependency map and add it to the overall dependency map
    // TODO I'm guessing that we aren't going to want acc to be mutable
    type_alias_dependant_types
        .iter()
        .fold(vec![], |acc, dependant_type| {
            let type_alias_decl = type_alias_lookup.get(dependant_type);
            let dependency_map = match type_alias_decl {
                Some(type_alias_decl) => type_alias_decl_to_token_stream(type_alias_decl),
                None => {
                    // For right now we are going to assume that if it's not in the map then we caught it somewhere else
                    // TODO for the future we should fix that assumption by limiting type_alias_dependant_types to be only the records
                    // Right now I think we are passing in whatever
                    // todo!("ERROR: Dependant Type [{dependant_type}] not found type alias list!")
                    quote!()
                }
            };
            vec![acc, vec![dependency_map]].concat()
        })
}

fn type_alias_decl_to_token_stream(type_alias_decl: &TsTypeAliasDecl) -> TokenStream {
    // TODO I feel like this might run into some namespace issues
    let ts_type_name = type_alias_decl.id.sym.chars().as_str().to_string();
    let alias_ident = format_ident!("{}", ts_type_name);

    let aliased_ts_type = *type_alias_decl.type_ann.clone();

    let aliased_rust_type =
        azle_act::types::ts_type_to_rust_type(&aliased_ts_type, &Some(&alias_ident));
    let aliased_definition = if aliased_rust_type.is_inline_rust_type() {
        aliased_rust_type.to_type_definition_token_stream()
    } else {
        quote!()
    };

    // Add the Token stream for the TsTypeAliasDecl specified in the arguments
    // TODO if we can get this wrapped up in the to_type_definition_token_stream then we can roll this in with the other type alias generation
    let aliased_ident = aliased_rust_type.get_type_ident();
    quote! {
        type #alias_ident = #aliased_ident;
        #aliased_definition
    }
}

// TODO merge this one with the other one of the same name wherever it lives now
pub fn generate_type_alias_lookup(
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, TsTypeAliasDecl> {
    ast_type_alias_decls
        .iter()
        .fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
            let type_alias_names = ast_type_alias_decl.id.sym.chars().as_str().to_string();
            acc.insert(type_alias_names, ast_type_alias_decl.clone());
            acc
        })
}
