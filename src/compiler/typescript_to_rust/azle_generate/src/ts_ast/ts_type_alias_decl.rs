use super::{ts_method_signature::TsMethodHelperMethods, ts_type, GetDependencies, GetName};
use crate::cdk_act::{nodes::ActNode, Actable, SystemStructureType, ToActDataType};
use std::{
    collections::{HashMap, HashSet},
    iter::FromIterator,
};
use swc_ecma_ast::TsTypeAliasDecl;

pub fn get_dependent_types_from_canister_decls(
    canister_decls: &Vec<TsTypeAliasDecl>,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
) -> HashSet<String> {
    canister_decls
        .iter()
        .fold(HashSet::new(), |acc, canister_decl| {
            acc.union(&get_dependent_types_from_canister_decl(
                canister_decl,
                possible_dependencies,
                &acc,
            ))
            .cloned()
            .collect()
        })
}

pub fn generate_type_alias_lookup(
    ast_type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> HashMap<String, TsTypeAliasDecl> {
    ast_type_alias_decls
        .iter()
        .fold(HashMap::new(), |mut acc, ast_type_alias_decl| {
            let type_alias_names = ast_type_alias_decl.id.get_name().to_string();
            acc.insert(type_alias_names, ast_type_alias_decl.clone());
            acc
        })
}

pub fn is_type_alias_decl_system_structure_type(
    type_alias_decl: &TsTypeAliasDecl,
    system_structure_type: &SystemStructureType,
) -> bool {
    // let type_alias_decl
    match system_structure_type {
        SystemStructureType::Canister => {
            let type_reference_name_option =
                ts_type::get_identifier_name_for_ts_type(&*type_alias_decl.type_ann);

            match type_reference_name_option {
                Some(type_reference_name) => type_reference_name == "Canister",
                None => false,
            }
        }
    }
}

fn get_dependent_types_from_canister_decl(
    canister_decl: &TsTypeAliasDecl,
    possible_dependencies: &Vec<TsTypeAliasDecl>,
    found_types: &HashSet<String>,
) -> HashSet<String> {
    let type_alias_lookup = generate_type_alias_lookup(possible_dependencies);

    // Verify that it is a canister
    let is_canister = canister_decl.type_ann.is_ts_type_ref()
        && canister_decl
            .type_ann
            .as_ts_type_ref()
            .unwrap()
            .type_name
            .as_ident()
            .unwrap()
            .sym
            .chars()
            .as_str()
            == "Canister";
    if !is_canister {
        panic!("Expecting Canister")
    }
    // Get the tstypeliteral out of it
    let ts_type_lit = &*canister_decl
        .type_ann
        .as_ts_type_ref()
        .unwrap()
        .type_params
        .as_ref()
        .unwrap()
        .params[0];
    let ts_type_lit = ts_type_lit.as_ts_type_lit().unwrap();

    // Look at the members
    // Make sure that all of the members are tsMethodSignators and not tsPropertySignatures
    let ts_types = ts_type_lit
        .members
        .iter()
        .fold(vec![], |acc, member| match member {
            swc_ecma_ast::TsTypeElement::TsMethodSignature(method_sig) => {
                let return_types = method_sig.get_return_type();
                let param_types = method_sig.get_param_ts_types();
                vec![acc, vec![return_types], param_types].concat()
            }
            _ => todo!("There should only be Method Signatures on a Canister type?"),
        });

    // Get the goods out of a method signature
    ts_types.iter().fold(found_types.clone(), |acc, ts_type| {
        let result = HashSet::from_iter(
            ts_type
                .get_dependent_types(&type_alias_lookup, &acc)
                .iter()
                .cloned(),
        );
        acc.union(&result).cloned().collect()
    })
}

pub fn get_ast_canister_type_alias_decls(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
) -> Vec<TsTypeAliasDecl> {
    get_ast_type_alias_decls_by_type_ref_name(type_alias_decls, "Canister")
}

pub fn get_ast_type_alias_decls_by_type_ref_name(
    type_alias_decls: &Vec<TsTypeAliasDecl>,
    type_ref_name: &str,
) -> Vec<TsTypeAliasDecl> {
    type_alias_decls
        .clone()
        .into_iter()
        .filter(|ts_type_alias_decl| {
            ts_type_alias_decl.type_ann.is_ts_type_ref()
                && match ts_type_alias_decl.type_ann.as_ts_type_ref() {
                    Some(ts_type_ref) => match ts_type_ref.type_name.as_ident() {
                        Some(ident) => ident.sym.chars().as_str() == type_ref_name,
                        None => false,
                    },
                    None => false,
                }
        })
        .collect()
}

impl Actable for TsTypeAliasDecl {
    fn to_act_node(&self) -> ActNode {
        let ts_type_name = self.get_name().to_string();

        ActNode::DataType(self.type_ann.to_act_data_type(&Some(&ts_type_name)))
    }
}

impl GetDependencies for TsTypeAliasDecl {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.type_ann
            .get_dependent_types(type_alias_lookup, found_types)
    }
}

impl GetName for TsTypeAliasDecl {
    fn get_name(&self) -> &str {
        self.id.sym.chars().as_str()
    }
}
