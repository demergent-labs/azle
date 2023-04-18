use cdk_framework::act::node::candid::{TypeArg, TypeRef};
use swc_ecma_ast::TsTypeRef;

use crate::{
    traits::GetName,
    ts_ast::{azle_type::AzleType, SourceMapped},
};

impl SourceMapped<'_, TsTypeRef> {
    pub fn to_type_ref(&self) -> TypeRef {
        let type_arguments = if let Some(type_params) = &self.type_params {
            type_params
                .params
                .iter()
                .map(|param| {
                    let return_azle_type = AzleType::from_ts_type(*param.clone(), self.source_map);
                    TypeArg(return_azle_type.to_candid_type())
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
