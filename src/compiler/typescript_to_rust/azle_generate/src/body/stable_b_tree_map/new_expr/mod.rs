use std::ops::Deref;

use swc_ecma_ast::NewExpr;

use super::expr::{ToU32, ToU8};
use crate::{ts_ast::SourceMapped, Error, StableBTreeMapNode};

mod errors;
mod get_span;

pub enum ArgName {
    MessageId,
    MaxKeySize,
    MaxValueSize,
}

impl SourceMapped<'_, NewExpr> {
    pub fn to_stable_b_tree_map_node(&self) -> Result<StableBTreeMapNode, Vec<Error>> {
        match &self.type_args {
            Some(type_args) => {
                if type_args.params.len() != 2 {
                    return Err(Error::NewError(
                        self.build_incorrect_type_args_error_message().to_string(),
                    )
                    .into());
                }

                let key_type =
                    SourceMapped::new(type_args.params.get(0).unwrap().deref(), self.source_map)
                        .to_candid_type()?;

                let value_type =
                    SourceMapped::new(type_args.params.get(1).unwrap().deref(), self.source_map)
                        .to_candid_type()?;

                match &self.args {
                    Some(args) => {
                        if args.len() == 0 {
                            return Err(Error::NewError(
                                self.build_missing_args_error_message().to_string(),
                            )
                            .into());
                        }

                        for arg in args {
                            if arg.spread.is_some() {
                                return Err(Error::NewError(
                                    self.build_arg_spread_error_message().to_string(),
                                )
                                .into());
                            }
                        }

                        if args.len() != 3 {
                            return Err(Error::NewError(
                                self.build_incorrect_number_of_args_error_message()
                                    .to_string(),
                            )
                            .into());
                        }

                        let memory_id = match &args.get(0).unwrap().expr.to_u8() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(Error::NewError(
                                    self.build_invalid_arg_error_message(ArgName::MessageId)
                                        .to_string(),
                                )
                                .into())
                            }
                        };

                        let max_key_size = match &args.get(1).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(Error::NewError(
                                    self.build_invalid_arg_error_message(ArgName::MaxKeySize)
                                        .to_string(),
                                )
                                .into())
                            }
                        };

                        let max_value_size = match &args.get(2).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(Error::NewError(
                                    self.build_invalid_arg_error_message(ArgName::MaxValueSize)
                                        .to_string(),
                                )
                                .into())
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
                    None => Err(Error::NewError(
                        self.build_missing_args_error_message().to_string(),
                    )
                    .into()),
                }
            }
            None => Err(
                Error::NewError(self.build_missing_type_args_error_message().to_string()).into(),
            ),
        }
    }
}
