use super::{
    ast_traits::ToDisplayString, ts_type_element::TsTypeElementHelperMethods, AzleTypeAliasDecl,
    GenerateInlineName, GetDependencies, GetName, GetTsType,
};
use crate::cdk_act::{
    nodes::data_type_nodes::{
        act_record::{Record, RecordLiteral, RecordTypeAlias},
        act_variants::{Variant, VariantLiteral, VariantTypeAlias},
        ActRecord, ActRecordMember, ActVariant, ActVariantMember, LiteralOrTypeAlias,
    },
    ActDataType,
};
use std::collections::{HashMap, HashSet};
use swc_ecma_ast::TsTypeLit;

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
            Some(record_name) => ActRecord {
                act_type: LiteralOrTypeAlias::TypeAlias(RecordTypeAlias {
                    record: Record {
                        name: record_name.clone().clone(),
                        members,
                    },
                }),
            },
            None => ActRecord {
                act_type: LiteralOrTypeAlias::Literal(RecordLiteral {
                    record: Record {
                        name: self.generate_inline_name(),
                        members,
                    },
                }),
            },
        })
    }

    fn to_variant(&self, variant_name: &Option<&String>) -> ActDataType {
        let members: Vec<ActVariantMember> = self
            .members
            .iter()
            .map(|member| member.to_variant_member())
            .collect();

        ActDataType::Variant(match variant_name {
            Some(record_name) => ActVariant {
                act_type: LiteralOrTypeAlias::TypeAlias(VariantTypeAlias {
                    variant: Variant {
                        name: record_name.clone().clone(),
                        members,
                    },
                }),
            },
            None => ActVariant {
                act_type: LiteralOrTypeAlias::Literal(VariantLiteral {
                    variant: Variant {
                        name: self.generate_inline_name(),
                        members,
                    },
                }),
            },
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
        type_alias_lookup: &HashMap<String, AzleTypeAliasDecl>,
        found_type_names: &HashSet<String>,
    ) -> HashSet<String> {
        self.members
            .iter()
            .fold(found_type_names.clone(), |acc, member| {
                acc.union(
                    &member
                        .get_ts_type()
                        .get_dependent_types(type_alias_lookup, &acc),
                )
                .cloned()
                .collect()
            })
    }
}

impl ToDisplayString for TsTypeLit {
    fn to_display_string(&self) -> String {
        let members = self.members.iter().fold(String::new(), |acc, member| {
            let member_name = member.get_name();
            let member_type = member.get_ts_type().to_display_string();
            let member_string = format!("{member_name}, {member_type}");
            format!("{}, {}", acc, member_string)
        });
        format!("{{{}}}", members)
    }
}
