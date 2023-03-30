use cdk_framework::act::node::candid::{Func, Record, Tuple, TypeAlias, Variant};
use swc_ecma_ast::{TsType, TsTypeAliasDecl};

use crate::ts_ast::{
    azle_type::{AzleTupleType, AzleTypeRef},
    source_map::SourceMapped,
    GetName,
};

impl SourceMapped<'_, TsTypeAliasDecl> {
    pub fn to_func(&self) -> Option<Func> {
        let name = self.id.get_name().to_string();
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == "Func" {
                        let azle_type_ref = AzleTypeRef {
                            ts_type_ref: ts_type_ref.clone(),
                            source_map: self.source_map,
                        };
                        let func = azle_type_ref.to_func(Some(name));

                        Some(func)
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }

    pub fn to_record(&self) -> Option<Record> {
        let name = self.id.get_name().to_string();
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == "Record" {
                        let azle_type_ref = AzleTypeRef {
                            ts_type_ref: ts_type_ref.clone(),
                            source_map: self.source_map,
                        };
                        let mut record = azle_type_ref.to_record();
                        record.name = Some(name);

                        Some(record)
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }

    pub fn to_tuple(&self) -> Option<Tuple> {
        let name = self.id.get_name().to_string();
        match &*self.type_ann {
            TsType::TsTupleType(ts_tuple_type) => {
                let azle_tuple_type = AzleTupleType {
                    ts_tuple_type: ts_tuple_type.clone(),
                    source_map: self.source_map,
                };
                let mut tuple = azle_tuple_type.to_tuple();
                tuple.name = Some(name);

                Some(tuple)
            }
            _ => None,
        }
    }

    pub fn to_type_alias(&self) -> Option<TypeAlias> {
        let name = self.id.get_name().to_string();
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == "Alias" {
                        let aliased_type = AzleTypeRef {
                            ts_type_ref: ts_type_ref.clone(),
                            source_map: self.source_map,
                        }
                        .get_enclosed_azle_type()
                        .to_data_type();

                        Some(TypeAlias {
                            name,
                            aliased_type: Box::new(aliased_type),
                        })
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }

    pub fn to_variant(&self) -> Option<Variant> {
        let name = self.id.get_name().to_string();
        match &*self.type_ann {
            TsType::TsTypeRef(ts_type_ref) => match &ts_type_ref.type_name {
                swc_ecma_ast::TsEntityName::TsQualifiedName(_) => None,
                swc_ecma_ast::TsEntityName::Ident(ident) => {
                    if ident.get_name() == "Variant" {
                        let azle_type_ref = AzleTypeRef {
                            ts_type_ref: ts_type_ref.clone(),
                            source_map: self.source_map,
                        };
                        let mut variant = azle_type_ref.to_variant();
                        variant.name = Some(name);

                        Some(variant)
                    } else {
                        None
                    }
                }
            },
            _ => None,
        }
    }
}
