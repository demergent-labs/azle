use cdk_framework::act::node::candid::{Func, Record, Tuple, TypeAlias, Variant};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::ts_ast::{
    azle_type::{AzleTupleType, AzleTypeRef},
    source_map::SourceMapped,
    GetName,
};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_func(&self) -> Option<Func> {
        self.process_ts_type_ref("Func", |azle_type_ref| {
            azle_type_ref.to_func(Some(self.id.get_name().to_string()))
        })
    }

    pub fn to_record(&self) -> Option<Record> {
        self.process_ts_type_ref("Record", |azle_type_ref| {
            let mut record = azle_type_ref.to_record();
            record.name = Some(self.id.get_name().to_string());
            record
        })
    }

    pub fn to_tuple(&self) -> Option<Tuple> {
        match &*self.type_ann {
            TsType::TsTupleType(ts_tuple_type) => {
                let azle_tuple_type = AzleTupleType {
                    ts_tuple_type: ts_tuple_type.clone(),
                    source_map: self.source_map,
                };
                let mut tuple = azle_tuple_type.to_tuple();
                tuple.name = Some(self.id.get_name().to_string());

                Some(tuple)
            }
            _ => None,
        }
    }

    pub fn to_type_alias(&self) -> Option<TypeAlias> {
        self.process_ts_type_ref("Alias", |azle_type_ref| {
            let aliased_type = azle_type_ref.get_enclosed_azle_type().to_data_type();

            TypeAlias {
                name: self.id.get_name().to_string(),
                aliased_type: Box::new(aliased_type),
            }
        })
    }

    pub fn to_variant(&self) -> Option<Variant> {
        self.process_ts_type_ref("Variant", |azle_type_ref| {
            let mut variant = azle_type_ref.to_variant();
            variant.name = Some(self.id.get_name().to_string());
            variant
        })
    }

    fn process_ts_type_ref<F, T>(&self, type_name: &str, handler: F) -> Option<T>
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
