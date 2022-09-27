use swc_ecma_ast::{TsKeywordType, TsKeywordTypeKind};

use crate::cdk_act::{nodes::data_type_nodes::ActPrimitiveLit, ActDataType, ToActDataType};

use super::ts_types_to_act::build_act_primitive_type_node;

impl ToActDataType for TsKeywordType {
    fn to_act_data_type(&self, name: &Option<&String>) -> ActDataType {
        let kind = self.kind;
        let token_stream = match &kind {
            TsKeywordTypeKind::TsBooleanKeyword => ActPrimitiveLit::Bool,
            TsKeywordTypeKind::TsStringKeyword => ActPrimitiveLit::String,
            TsKeywordTypeKind::TsVoidKeyword => ActPrimitiveLit::Void,
            TsKeywordTypeKind::TsNullKeyword => ActPrimitiveLit::Null,
            TsKeywordTypeKind::TsObjectKeyword => {
                todo!("to_act_data_type for TsObjectKeyword")
            }
            TsKeywordTypeKind::TsNumberKeyword => {
                todo!("to_act_data_type for TsNumberKeyword")
            }
            TsKeywordTypeKind::TsBigIntKeyword => {
                todo!("to_act_data_type for TsBigIntKeyword")
            }
            TsKeywordTypeKind::TsNeverKeyword => todo!("to_act_data_type for TsNeverKeyword"),
            TsKeywordTypeKind::TsSymbolKeyword => {
                todo!("to_act_data_type for TsSymbolKeyword")
            }
            TsKeywordTypeKind::TsIntrinsicKeyword => {
                todo!("to_act_data_type for TsIntrinsicKeyword")
            }
            TsKeywordTypeKind::TsUndefinedKeyword => {
                todo!("to_act_data_type for TsUndefinedKeyword")
            }
            TsKeywordTypeKind::TsUnknownKeyword => {
                todo!("to_act_data_type for TsUnknownKeyword")
            }
            TsKeywordTypeKind::TsAnyKeyword => todo!("to_act_data_type for TsAnyKeyword"),
        };
        build_act_primitive_type_node(token_stream, name)
    }
}
