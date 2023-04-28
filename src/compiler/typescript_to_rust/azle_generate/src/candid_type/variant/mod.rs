use cdk_framework::act::node::candid::{variant::Member, Variant};
use swc_ecma_ast::{TsPropertySignature, TsTypeAliasDecl, TsTypeElement, TsTypeLit, TsTypeRef};

use crate::{
    errors::{ErrorMessage, Suggestion},
    traits::{GetName, GetSourceFileInfo, GetSourceInfo, GetSpan, TypeToString},
    ts_ast::SourceMapped,
};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_variant(&self) -> Option<Variant> {
        self.process_ts_type_ref("Variant", |type_ref| {
            // TODO this should be undone once we put all user-defined types in their own module
            let name_string = self.id.get_name().to_string();
            let name = Some(if name_string == "Result" {
                "_AzleResult".to_string()
            } else {
                name_string
            });

            Variant {
                name,
                type_params: self.get_type_params().into(),
                ..type_ref.to_variant()
            }
        })
    }
}

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_variant(&self) -> Variant {
        match self.get_ts_type().as_ts_type_lit() {
            Some(ts_type_lit) => ts_type_lit,
            None => panic!("{}", self.wrong_enclosed_type_error()),
        }
        .to_variant()
    }
}

impl SourceMapped<'_, TsTypeLit> {
    pub fn to_variant(&self) -> Variant {
        let members: Vec<Member> = self
            .members
            .iter()
            .map(|member| SourceMapped::new(member, self.source_map).to_variant_member())
            .collect();

        Variant {
            name: None,
            members,
            type_params: vec![].into(),
        }
    }
}

impl SourceMapped<'_, TsTypeElement> {
    pub fn to_variant_member(&self) -> Member {
        let ts_property_signature = match self.as_property_signature() {
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
                    .source_map
                    .generate_modified_source(self.get_span(), &replacement),
                range: self
                    .source_map
                    .generate_modified_range(self.get_span(), &replacement),
                annotation: Some("For example".to_string()),
                import_suggestion: None,
            }),
        }
    }
}

impl SourceMapped<'_, TsPropertySignature> {
    pub(super) fn to_variant_member(&self) -> Member {
        Member {
            name: self.get_member_name(),
            candid_type: self.get_act_data_type(),
        }
    }
}
