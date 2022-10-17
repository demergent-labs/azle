pub mod azle_array_type;
pub mod azle_fn_or_constructor_type;
pub mod azle_keyword_type;
pub mod azle_tuple_type;
pub mod azle_type_lit;
pub mod azle_type_ref;
pub mod get_dependent_types;
pub mod get_source_text;
pub mod to_act_data_type;
pub use azle_array_type::AzleArrayType;
pub use azle_fn_or_constructor_type::AzleFnOrConstructorType;
pub use azle_fn_or_constructor_type::AzleFnType;
pub use azle_keyword_type::AzleKeywordType;
pub use azle_tuple_type::AzleTupleType;
pub use azle_type_lit::AzleTypeLit;
pub use azle_type_ref::AzleTypeRef;

use swc_common::SourceMap;
use swc_ecma_ast::TsType;

#[derive(Clone)]
pub enum AzleType<'a> {
    AzleKeywordType(AzleKeywordType<'a>),
    AzleTypeRef(AzleTypeRef<'a>),
    AzleTypeLit(AzleTypeLit<'a>),
    AzleArrayType(AzleArrayType<'a>),
    AzleFnOrConstructorType(AzleFnOrConstructorType<'a>),
    AzleTupleType(AzleTupleType<'a>),
}

impl<'a> AzleType<'a> {
    pub fn as_azle_type_lit(self) -> Option<AzleTypeLit<'a>> {
        match self {
            AzleType::AzleTypeLit(azle_type_lit) => Some(azle_type_lit),
            _ => None,
        }
    }

    pub fn is_azle_type_lit(&self) -> bool {
        match self {
            AzleType::AzleTypeLit(_) => true,
            _ => false,
        }
    }

    pub fn as_azle_type_ref(self) -> Option<AzleTypeRef<'a>> {
        match self {
            AzleType::AzleTypeRef(azle_type_ref) => Some(azle_type_ref),
            _ => None,
        }
    }

    pub fn is_azle_type_ref(&self) -> bool {
        match self {
            AzleType::AzleTypeRef(_) => true,
            _ => false,
        }
    }
}

impl AzleType<'_> {
    pub fn from_ts_type(ts_type: TsType, source_map: &SourceMap) -> AzleType {
        match ts_type {
            TsType::TsKeywordType(ts_keyword_type) => AzleType::AzleKeywordType(AzleKeywordType {
                ts_keyword_type,
                source_map,
            }),
            TsType::TsFnOrConstructorType(ts_fn_or_constructor_type) => {
                AzleType::AzleFnOrConstructorType(
                    AzleFnOrConstructorType::from_ts_fn_or_constructor_type(
                        ts_fn_or_constructor_type,
                        source_map,
                    ),
                )
            }
            TsType::TsTypeRef(ts_type_ref) => AzleType::AzleTypeRef(AzleTypeRef {
                ts_type_ref,
                source_map,
            }),
            TsType::TsTypeLit(ts_type_lit) => AzleType::AzleTypeLit(AzleTypeLit {
                ts_type_lit,
                source_map,
            }),
            TsType::TsArrayType(ts_array_type) => AzleType::AzleArrayType(AzleArrayType {
                ts_array_type,
                source_map,
            }),
            TsType::TsTupleType(ts_tuple_type) => AzleType::AzleTupleType(AzleTupleType {
                ts_tuple_type,
                source_map,
            }),
            TsType::TsThisType(_) => todo!(),
            TsType::TsTypeQuery(_) => todo!(),
            TsType::TsOptionalType(_) => todo!(),
            TsType::TsRestType(_) => todo!(),
            TsType::TsUnionOrIntersectionType(_) => todo!(),
            TsType::TsConditionalType(_) => todo!(),
            TsType::TsInferType(_) => todo!(),
            TsType::TsParenthesizedType(_) => todo!(),
            TsType::TsTypeOperator(_) => todo!(),
            TsType::TsIndexedAccessType(_) => todo!(),
            TsType::TsMappedType(_) => todo!(),
            TsType::TsLitType(_) => todo!(),
            TsType::TsTypePredicate(_) => todo!(),
            TsType::TsImportType(_) => todo!(),
        }
    }
}
