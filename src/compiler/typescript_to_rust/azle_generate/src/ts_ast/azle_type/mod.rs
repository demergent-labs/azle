use swc_common::SourceMap;
use swc_ecma_ast::TsType;

pub use azle_array_type::AzleArrayType;
pub use azle_fn_or_constructor_type::AzleFnOrConstructorType;
pub use azle_fn_or_constructor_type::AzleFnType;
pub use azle_keyword_type::AzleKeywordType;
pub use azle_tuple_type::AzleTupleType;
pub use azle_type_lit::AzleTypeLit;
pub use azle_type_ref::AzleTypeRef;

mod azle_array_type;
mod azle_fn_or_constructor_type;
mod azle_keyword_type;
mod azle_tuple_type;
mod azle_type_lit;
mod azle_type_ref;
mod errors;
mod get_dependent_types;
mod get_source_info;
mod get_source_text;
mod to_act_data_type;

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

    // pub fn as_azle_type_ref(self) -> Option<AzleTypeRef<'a>> {
    //     match self {
    //         AzleType::AzleTypeRef(azle_type_ref) => Some(azle_type_ref),
    //         _ => None,
    //     }
    // }

    // It seems like these would be useful, but we aren't using them right now,
    // but they can hang out here until we are done that way if we need them
    // they are here. though its not like they are that hard to write up from
    // scratch...
    // pub fn is_azle_type_lit(&self) -> bool {
    //     match self {
    //         AzleType::AzleTypeLit(_) => true,
    //         _ => false,
    //     }
    // }
    //
    // pub fn is_azle_type_ref(&self) -> bool {
    //     match self {
    //         AzleType::AzleTypeRef(_) => true,
    //         _ => false,
    //     }
    // }
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
            _ => panic!("{}", errors::unsupported_type_error(ts_type, source_map)),
        }
    }
}
