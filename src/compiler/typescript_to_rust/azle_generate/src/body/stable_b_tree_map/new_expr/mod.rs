use std::ops::Deref;

use cdk_framework::traits::CollectResults;
use swc_ecma_ast::NewExpr;

use self::errors::{ArgSpread, IncorrectNumberOfArgs, IncorrectTypeArgs, InvalidArg, MissingArgs};

use super::expr::{ToU32, ToU8};
use crate::{
    candid_type::service::method::errors::MissingTypeArguments,
    canister_method::check_length_and_map::CheckLengthAndMapTwo, ts_ast::SourceMapped, Error,
    StableBTreeMapNode,
};

pub mod errors;
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
                // Get key and value type from type_args
                let type_arg_candid_types = type_args
                    .params
                    .check_length_and_map(
                        type_args.params.len() == 2,
                        |_| IncorrectTypeArgs::from_new_expr(self).into(),
                        |param| SourceMapped::new(param.deref(), self.source_map).to_candid_type(),
                    )
                    .collect_results()?;

                let key_type = type_arg_candid_types[0].clone();
                let value_type = type_arg_candid_types[1].clone();

                // Get memory id and max key and value size from the call arguments
                match &self.args {
                    Some(args) => {
                        if args.len() == 0 {
                            return Err(vec![MissingArgs::from_new_expr(self).into()]);
                        }

                        for arg in args {
                            if arg.spread.is_some() {
                                return Err(vec![ArgSpread::from_new_expr(self).into()]);
                            }
                        }

                        if args.len() != 3 {
                            return Err(vec![IncorrectNumberOfArgs::from_new_expr(self).into()]);
                        }

                        let memory_id = match &args[0].expr.to_u8() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(vec![InvalidArg::from_new_expr(
                                    self,
                                    ArgName::MessageId,
                                )
                                .into()])
                            }
                        };

                        let max_key_size = match &args[1].expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(vec![InvalidArg::from_new_expr(
                                    self,
                                    ArgName::MaxKeySize,
                                )
                                .into()])
                            }
                        };

                        let max_value_size = match &args[2].expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(vec![InvalidArg::from_new_expr(
                                    self,
                                    ArgName::MaxValueSize,
                                )
                                .into()])
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
                    None => Err(vec![MissingArgs::from_new_expr(self).into()]),
                }
            }
            None => Err(vec![MissingTypeArguments::from_new_expr(self).into()]),
        }
    }
}
