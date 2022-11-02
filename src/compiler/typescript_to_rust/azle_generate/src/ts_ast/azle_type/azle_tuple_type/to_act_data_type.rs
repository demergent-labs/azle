use super::AzleTupleType;
use crate::ts_ast::GenerateInlineName;
use cdk_framework::{
    nodes::data_type_nodes::{
        act_tuple::{Tuple, TupleLiteral, TupleTypeAlias},
        ActTuple, LiteralOrTypeAlias,
    },
    ActDataType, ToActDataType,
};

impl ToActDataType for AzleTupleType<'_> {
    fn to_act_data_type(&self, alias_name: &Option<&String>) -> cdk_framework::ActDataType {
        ActDataType::Tuple(ActTuple {
            act_type: match alias_name {
                Some(name) => LiteralOrTypeAlias::TypeAlias(TupleTypeAlias {
                    tuple: Tuple {
                        name: name.clone().clone(),
                        elems: self.get_elem_types(),
                    },
                }),
                None => LiteralOrTypeAlias::Literal(TupleLiteral {
                    tuple: Tuple {
                        name: self.ts_tuple_type.generate_inline_name(),
                        elems: self.get_elem_types(),
                    },
                }),
            },
        })
    }
}
