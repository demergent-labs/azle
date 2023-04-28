use std::ops::Deref;

use swc_ecma_ast::NewExpr;

use super::expr::{ToU32, ToU8};
use crate::{errors::ErrorMessage, ts_ast::SourceMapped, StableBTreeMapNode};

mod errors;
mod get_span;

pub enum ArgName {
    MessageId,
    MaxKeySize,
    MaxValueSize,
}

impl SourceMapped<'_, NewExpr> {
    pub fn to_stable_b_tree_map_node(&self) -> Result<StableBTreeMapNode, ErrorMessage> {
        match &self.type_args {
            Some(type_args) => {
                if type_args.params.len() != 2 {
                    return Err(self.build_incorrect_type_args_error_message());
                }

                let key_type =
                    SourceMapped::new(type_args.params.get(0).unwrap().deref(), self.source_map)
                        .to_candid_type();

                let value_type =
                    SourceMapped::new(type_args.params.get(1).unwrap().deref(), self.source_map)
                        .to_candid_type();

                match &self.args {
                    Some(args) => {
                        if args.len() == 0 {
                            return Err(self.build_missing_args_error_message());
                        }

                        for arg in args {
                            if arg.spread.is_some() {
                                return Err(self.build_arg_spread_error_message());
                            }
                        }

                        if args.len() != 3 {
                            return Err(self.build_incorrect_number_of_args_error_message());
                        }

                        let memory_id = match &args.get(0).unwrap().expr.to_u8() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(self.build_invalid_arg_error_message(ArgName::MessageId))
                            }
                        };

                        let max_key_size = match &args.get(1).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(
                                    self.build_invalid_arg_error_message(ArgName::MaxKeySize)
                                )
                            }
                        };

                        let max_value_size = match &args.get(2).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(
                                    self.build_invalid_arg_error_message(ArgName::MaxValueSize)
                                )
                            }
                        };

                        Ok(StableBTreeMapNode {
                            memory_id,
                            key_type,
                            max_key_size,
                            value_type,
                            max_value_size,
                        })
                    }
                    None => Err(self.build_missing_args_error_message()),
                }
            }
            None => Err(self.build_missing_type_args_error_message()),
        }
    }
}
