use cdk_framework::act::node::data_type::Func;
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::ts_ast::{azle_type::AzleTypeRef, source_map::SourceMapped, GetName};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_func(&self) -> Option<Func> {
        let name = Some(self.id.get_name().to_string());
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == "Func" {
                        let azle_type_ref = AzleTypeRef {
                            ts_type_ref: ts_type_ref.clone(),
                            source_map: self.source_map,
                        };
                        let mut func = azle_type_ref.to_func();
                        func.name = name;

                        Some(func)
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }
}
