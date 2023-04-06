use cdk_framework::act::node::candid::{variant::Member, Variant};
use swc_ecma_ast::TsTypeAliasDecl;

use crate::{
    errors::{ErrorMessage, Suggestion},
    ts_ast::{
        azle_type::{
            azle_type_lit::{
                azle_type_element::azle_property_signature::AzlePropertySignature, AzleTypeElement,
                AzleTypeLit,
            },
            AzleTypeRef,
        },
        source_map::{get_source_file_info::GetSourceFileInfo, SourceMapped},
        traits::{GetName, GetSourceInfo, GetSpan, TypeToString},
    },
};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_variant(&self) -> Option<Variant> {
        self.process_ts_type_ref("Variant", |azle_type_ref| {
            let mut variant = azle_type_ref.to_variant();

            let name_string = self.id.get_name().to_string();

            // TODO this should be undone once we put all user-defined types in their own module
            variant.name = Some(if name_string == "Result" {
                "_AzleResult".to_string()
            } else {
                name_string
            });

            let type_params = self.get_type_params();

            variant.type_params = type_params.into();

            variant
        })
    }
}

impl AzleTypeRef<'_> {
    pub fn to_variant(&self) -> Variant {
        match self.get_enclosed_azle_type().as_azle_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_variant()
    }
}

impl AzleTypeLit<'_> {
    pub fn to_variant(&self) -> Variant {
        let members: Vec<Member> = self
            .ts_type_lit
            .members
            .iter()
            .map(|member| {
                AzleTypeElement::from_ts_type_element(member.clone(), self.source_map)
                    .to_variant_member()
            })
            .collect();

        Variant {
            name: None,
            members,
            type_params: vec![].into(),
        }
    }
}

impl AzleTypeElement<'_> {
    pub fn to_variant_member(&self) -> Member {
        let ts_property_signature = match self.as_azle_property_signature() {
            Some(ts_property_signature) => ts_property_signature,
            None => panic!("{}", self.variant_property_signature_error()),
        };
        ts_property_signature.to_variant_member()
    }

    pub(super) fn variant_property_signature_error(&self) -> ErrorMessage {
        let replacement = "property_name: null".to_string();
        ErrorMessage {
            title: "Invalid Variant".to_string(),
            origin: self.get_origin(),
            line_number: self.get_line_number(),
            source: self.get_source(),
            range: self.get_range(),
            annotation: format!("{} is not allowed here.", self.type_to_string()),
            suggestion: Some(Suggestion {
                title: "Variant members must be properties".to_string(),
                source: self
                    .get_source_map()
                    .generate_modified_source(self.get_span(), &replacement),
                range: self
                    .get_source_map()
                    .generate_modified_range(self.get_span(), &replacement),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }
}

impl AzlePropertySignature<'_> {
    pub(super) fn to_variant_member(&self) -> Member {
        Member {
            name: self.get_member_name(),
            candid_type: self.get_act_data_type(),
        }
    }
}
