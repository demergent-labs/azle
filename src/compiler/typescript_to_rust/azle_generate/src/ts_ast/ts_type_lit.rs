use super::{
    ast_traits::GetTsType, ts_type_element::TsTypeElementHelperMethods, GenerateInlineName,
    GetDependencies,
};
use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_record::Record, act_variants::Variant, ActRecord, ActRecordMember, ActVariant,
        ActVariantMember,
    },
    ActDataType,
};
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::{TsTypeAliasDecl, TsTypeLit};

pub trait TsTypeLitHelperMethods {
    fn to_record(&self, record_name: &Option<&String>) -> ActDataType;
    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType;
}

impl TsTypeLitHelperMethods for TsTypeLit {
    fn to_record(&self, record_name: &Option<&String>) -> ActDataType {
        let members: Vec<ActRecordMember> = self
            .members
            .iter()
            .map(|member| member.to_record_member())
            .collect();

        ActDataType::Record(match record_name {
            Some(record_name) => ActRecord::TypeAlias(Record {
                name: record_name.clone().clone(),
                members,
            }),
            None => ActRecord::Literal(Record {
                name: self.generate_inline_name(),
                members,
            }),
        })
    }

    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType {
        let members: Vec<ActVariantMember> = self
            .members
            .iter()
            .map(|member| member.to_variant_member())
            .collect();

        ActDataType::Variant(match variant_name {
            Some(name) => ActVariant::TypeAlias(Variant {
                name: name.clone().clone(),
                members,
            }),
            None => ActVariant::Literal(Variant {
                name: self.generate_inline_name(),
                members,
            }),
        })
    }
}

impl GenerateInlineName for TsTypeLit {
    fn generate_inline_name(&self) -> String {
        let id = self.calculate_hash();
        format!("AzleInline{}", id)
    }
}

impl GetDependencies for TsTypeLit {
    fn get_dependent_types(
        &self,
        type_alias_lookup: &HashMap<String, TsTypeAliasDecl>,
        found_types: &HashSet<String>,
    ) -> Vec<String> {
        self.members.iter().fold(vec![], |acc, member| {
            vec![
                acc,
                member
                    .get_ts_type()
                    .get_dependent_types(type_alias_lookup, found_types),
            ]
            .concat()
        })
    }
}
