use cdk_framework::act::node::candid::TypeAlias;
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::{
    traits::GetName,
    ts_ast::{azle_type::AzleTypeRef, source_map::SourceMapped},
};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_type_alias(&self) -> Option<TypeAlias> {
        self.process_ts_type_ref("Alias", |azle_type_ref| {
            let aliased_type = azle_type_ref.get_enclosed_azle_type().to_candid_type();

            let type_params = self.get_type_params();

            TypeAlias {
                name: self.id.get_name().to_string(),
                aliased_type: Box::new(aliased_type),
                type_params: type_params.into(),
            }
        })
    }

    pub fn process_ts_type_ref<F, T>(&self, type_name: &str, handler: F) -> Option<T>
    where
        F: Fn(AzleTypeRef) -> T,
    {
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == type_name {
                        let azle_type_ref = AzleTypeRef {
                            ts_type_ref: ts_type_ref.clone(),
                            source_map: self.source_map,
                        };
                        Some(handler(azle_type_ref))
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }
}
