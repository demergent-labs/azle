use swc_ecma_ast::{TsEntityName, TsType, TsTypeAliasDecl, TsTypeRef};

use crate::{traits::GetName, ts_ast::SourceMapped, Error};

impl SourceMapped<'_, TsTypeAliasDecl> {}

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn is_alias(&self) -> bool {
        let type_params: Vec<_> = self
            .type_params
            .iter()
            .flat_map(|ts_type_param_decl| ts_type_param_decl.params.clone())
            .map(|ts_type_param| ts_type_param.name.get_name())
            .collect();
        let type_args: Vec<_> = match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => ts_type_ref
                .type_params
                .iter()
                .flat_map(|thing| thing.params.clone())
                .map(|boxed_type| *boxed_type)
                .collect(),
            _ => vec![],
        };
        if type_params.len() != type_args.len() {
            return false;
        }
        let type_args_are_generics = type_args.iter().all(|ts_type| {
            if let TsType::TsTypeRef(type_ref) = ts_type {
                if let TsEntityName::Ident(name) = &type_ref.type_name {
                    return type_params.contains(&name.get_name());
                }
            }
            false
        });
        type_args_are_generics
    }

    pub fn process_ts_type_ref<F, T>(
        &self,
        type_names: &Vec<String>,
        handler: F,
    ) -> Result<Option<T>, Vec<Error>>
    where
        F: Fn(SourceMapped<TsTypeRef>) -> Result<T, Vec<Error>>,
    {
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => {
                let name = ts_type_ref.type_name.get_name();
                if type_names.contains(&name) {
                    let type_ref = self.spawn(ts_type_ref);
                    handler(type_ref).map(Some)
                } else {
                    Ok(None)
                }
            }
            _ => Ok(None),
        }
    }
}
