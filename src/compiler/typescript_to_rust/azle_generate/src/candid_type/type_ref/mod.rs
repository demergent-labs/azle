use std::ops::Deref;

use cdk_framework::act::node::candid::{TypeArg, TypeRef};
use swc_ecma_ast::TsTypeRef;

use crate::{traits::GetName, ts_ast::SourceMapped};

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_type_ref(&self) -> TypeRef {
        let type_arguments = if let Some(type_params) = &self.type_params {
            type_params
                .params
                .iter()
                .map(|param| {
                    TypeArg(SourceMapped::new(param.deref(), self.source_map).to_candid_type())
                })
                .collect()
        } else {
            vec![]
        };

        let name_string = self.get_name().to_string();

        TypeRef {
            name: if name_string == "Result" {
                "_AzleResult".to_string()
            } else {
                name_string
            },
            type_arguments,
        }
    }
}
