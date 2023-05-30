use cdk_framework::{act::node::candid::TypeAlias, traits::CollectResults};
use swc_ecma_ast::{TsType, TsTypeAliasDecl, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_type_alias(&self) -> Result<Option<TypeAlias>, Vec<Error>> {
        self.process_ts_type_ref("Alias", |type_ref| {
            let (aliased_type, type_params) = (
                type_ref.get_ts_type()?.to_candid_type(),
                self.get_type_params(),
            )
                .collect_results()?;

            Ok(TypeAlias {
                name: self.id.get_name().to_string(),
                aliased_type: Box::new(aliased_type),
                type_params: type_params.into(),
            })
        })
    }

    pub fn process_ts_type_ref<F, T>(
        &self,
        type_name: &str,
        handler: F,
    ) -> Result<Option<T>, Vec<Error>>
    where
        F: Fn(SourceMapped<TsTypeRef>) -> Result<T, Vec<Error>>,
    {
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => Ok(None),
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == type_name {
                        let type_ref = SourceMapped::new(ts_type_ref, self.source_map);
                        handler(type_ref).map(Some)
                    } else {
                        Ok(None)
                    }
                }
            },
            _ => Ok(None),
        }
    }
}
