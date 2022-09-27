use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsPropertySignature, TsTypeAliasDecl, TsTypeElement, TsTypeLit};

use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_record::Record, act_variants::Variant, ActRecord, ActRecordMember, ActVariant,
        ActVariantMember,
    },
    ActDataType, ToActDataType,
};

use super::{ts_types_to_act::calculate_hash, GetDependencies};

impl GetDependencies for TsTypeLit {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.members.iter().fold(vec![], |acc, member| {
            match member.as_ts_property_signature() {
                Some(prop_sig) => {
                    let type_ann = prop_sig.type_ann.clone().unwrap();
                    let ts_type = *type_ann.type_ann.clone();
                    vec![
                        acc,
                        ts_type.get_dependent_types(type_alias_lookup, found_types),
                    ]
                    .concat()
                }
                None => {
                    todo!("Handle parsing type literals if the field isn't a TsPropertySignature")
                }
            }
        })
    }
}

pub fn parse_ts_type_lit_as_struct(name: &Option<&String>, ts_type_lit: &TsTypeLit) -> ActRecord {
    let members: Vec<ActRecordMember> = ts_type_lit.members.iter().fold(vec![], |acc, member| {
        let structures = parse_type_literal_fields(member);
        vec![acc, vec![structures]].concat()
    });

    match name {
        Some(name) => ActRecord::TypeAlias(Record {
            name: name.clone().clone(),
            members,
        }),
        None => ActRecord::Literal(Record {
            name: generate_inline_ident(ts_type_lit),
            members,
        }),
    }
}

fn parse_type_literal_fields(member: &TsTypeElement) -> ActRecordMember {
    match member.as_ts_property_signature() {
        Some(prop_sig) => ActRecordMember {
            member_name: parse_type_literal_member_name(prop_sig),
            member_type: parse_type_literal_member_type(prop_sig),
        },
        None => todo!("Handle parsing type literals if the field isn't a TsPropertySignature"),
    }
}

pub fn parse_type_literal_member_name(prop_sig: &TsPropertySignature) -> String {
    prop_sig
        .key
        .as_ident()
        .unwrap()
        .sym
        .chars()
        .as_str()
        .to_string()
}

pub fn parse_type_literal_member_type(prop_sig: &TsPropertySignature) -> ActDataType {
    let type_ann = prop_sig.type_ann.clone().unwrap();
    let ts_type = *type_ann.type_ann.clone();
    ts_type.to_act_data_type(&None)
}

pub fn generate_inline_ident(ts_type_lit: &TsTypeLit) -> String {
    let id = calculate_hash(ts_type_lit);
    // TODO could a variant and a struct produce the same hash if they have the same inline part?
    format!("AzleInline{}", id)
}

pub fn parse_ts_type_lit_as_enum(name: &Option<&String>, ts_type_lit: &TsTypeLit) -> ActVariant {
    let members: Vec<ActVariantMember> = ts_type_lit.members.iter().fold(vec![], |acc, member| {
        let result = parse_type_literal_members_for_enum(member);
        vec![acc, vec![result]].concat()
    });
    match name {
        Some(name) => ActVariant::TypeAlias(Variant {
            name: name.clone().clone(),
            members,
        }),
        None => ActVariant::Literal(Variant {
            name: generate_inline_ident(ts_type_lit),
            members,
        }),
    }
}

fn parse_type_literal_members_for_enum(member: &TsTypeElement) -> ActVariantMember {
    match member.as_ts_property_signature() {
        Some(prop_sig) => ActVariantMember {
            member_name: parse_type_literal_member_name(prop_sig),
            member_type: parse_type_literal_member_type(prop_sig),
        },
        None => todo!("Handle parsing type literals if the member isn't a TsPropertySignature"),
    }
}
