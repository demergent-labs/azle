use cdk_framework::ToActDataType;

use super::AzleNewExpr;
use crate::{
    ts_ast::azle_type::AzleType,
    utils::{ToU32, ToU8},
    StableBTreeMapNode,
};

impl AzleNewExpr<'_> {
    pub fn to_stable_b_tree_map_nodes(&self) -> Result<StableBTreeMapNode, String> {
        let example = "\n    new StableBTreeMap<CustomKeyType, CustomValueType>(0, 100, 1000)";
        let type_arg_error_message = format!("The \"StableBTreeMap\" type requires exactly 2 type arguments: the key datatype, and the value datatype. E.g.\n{}", example);
        let arg_spread_error_message = format!("The \"StableBTreeMap\" type does not currently support argument spreading. Instead, pass each argument individually. E.g.\n{}", example);
        let arg_error_message = format!("The \"StableBTreeMap\" type requires exactly 3 arguments: an identifier, the max key length, and the max value length. E.g.\n{}", example);
        let memory_id_error_message = format!(
            "The first argument to StableBTreeMap must be an integer literal between 0 and 255. E.g.\n{}",
            example
        );
        let second_argument_size_error_message = format!(
            "The second argument to StableBTreeMap must be an integer literal between 0 and 4,294,967,295. E.g.\n{}",
            example
        );
        let third_argument_size_error_message = format!(
            "The third argument to StableBTreeMap must be an integer literal between 0 and 4,294,967,295. E.g.\n{}",
            example
        );

        match &self.new_expr.type_args {
            Some(type_args) => {
                if type_args.params.len() != 2 {
                    return Err(type_arg_error_message);
                }

                let key_type = AzleType::from_ts_type(
                    *type_args.params.get(0).unwrap().clone(),
                    self.source_map,
                )
                .to_act_data_type(&None);

                let value_type = AzleType::from_ts_type(
                    *type_args.params.get(1).unwrap().clone(),
                    self.source_map,
                )
                .to_act_data_type(&None);

                match &self.new_expr.args {
                    Some(args) => {
                        for arg in args {
                            if arg.spread.is_some() {
                                return Err(arg_spread_error_message);
                            }
                        }

                        if args.len() != 3 {
                            return Err(arg_error_message);
                        }

                        let memory_id = match &args.get(0).unwrap().expr.to_u8() {
                            Ok(value) => *value,
                            Err(_) => return Err(memory_id_error_message),
                        };

                        let max_key_size = match &args.get(1).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => return Err(second_argument_size_error_message),
                        };

                        let max_value_size = match &args.get(2).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => return Err(third_argument_size_error_message),
                        };

                        Ok(StableBTreeMapNode {
                            memory_id,
                            key_type,
                            max_key_size,
                            value_type,
                            max_value_size,
                        })
                    }
                    None => Err(arg_error_message),
                }
            }
            None => Err(type_arg_error_message),
        }
    }
}
