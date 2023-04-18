use cdk_framework::act::node::candid::TypeAlias;
use swc_ecma_ast::{TsType, TsTypeAliasDecl, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_type_alias(&self) -> Option<TypeAlias> {
        self.process_ts_type_ref("Alias", |type_ref| {
            let aliased_type = type_ref.get_ts_type().to_candid_type();

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
        F: Fn(SourceMapped<TsTypeRef>) -> T,
    {
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == type_name {
                        let type_ref = SourceMapped::new(ts_type_ref, self.source_map);
                        Some(handler(type_ref))
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }
}
