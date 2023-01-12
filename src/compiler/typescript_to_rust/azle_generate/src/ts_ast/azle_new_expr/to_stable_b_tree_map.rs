use super::AzleNewExpr;
use crate::{
    utils::{ToU32, ToU8},
    AzleStableBTreeMapNode,
};

impl AzleNewExpr<'_> {
    pub fn to_azle_stable_b_tree_map_node(&self) -> Result<AzleStableBTreeMapNode, String> {
        let memory_id_error_message = self.build_memory_id_error_message();
        let second_argument_size_error_message = self.build_second_argument_size_error_message();
        let third_argument_size_error_message = self.build_third_argument_size_error_message();

        match &self.new_expr.type_args {
            Some(type_args) => {
                if type_args.params.len() != 2 {
                    return Err(self.build_incorrect_type_args_error_message().to_string());
                }

                let key_type = *type_args.params.get(0).unwrap().clone();
                let value_type = *type_args.params.get(1).unwrap().clone();

                match &self.new_expr.args {
                    Some(args) => {
                        if args.len() == 0 {
                            return Err(self.build_missing_args_error_message().to_string());
                        }

                        for arg in args {
                            if arg.spread.is_some() {
                                return Err(self.build_arg_spread_error_message().to_string());
                            }
                        }

                        if args.len() != 3 {
                            return Err(self
                                .build_incorrect_number_of_args_error_message()
                                .to_string());
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

                        Ok(AzleStableBTreeMapNode {
                            memory_id,
                            key_type,
                            max_key_size,
                            value_type,
                            max_value_size,
                        })
                    }
                    None => Err(self.build_missing_args_error_message().to_string()),
                }
            }
            None => Err(self.build_missing_type_args_error_message().to_string()),
        }
    }
}
