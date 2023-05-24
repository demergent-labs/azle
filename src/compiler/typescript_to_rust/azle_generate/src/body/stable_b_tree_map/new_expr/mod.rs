use std::ops::Deref;

use swc_ecma_ast::NewExpr;

use self::errors::{ArgSpread, IncorrectNumberOfArgs, IncorrectTypeArgs, InvalidArg, MissingArgs};

use super::expr::{ToU32, ToU8};
use crate::{
    candid_type::service::method::errors::MissingTypeArguments, ts_ast::SourceMapped, Error,
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
                if type_args.params.len() != 2 {
                    return Err(vec![IncorrectTypeArgs::from_new_expr(self).into()]);
                }

                let key_type =
                    // UNWRAP HERE
                    SourceMapped::new(type_args.params.get(0).unwrap().deref(), self.source_map)
                        .to_candid_type()?;

                let value_type =
                    // UNWRAP HERE
                    SourceMapped::new(type_args.params.get(1).unwrap().deref(), self.source_map)
                        .to_candid_type()?;

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

                        // UNWRAP HERE
                        let memory_id = match &args.get(0).unwrap().expr.to_u8() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(vec![InvalidArg::from_new_expr(
                                    self,
                                    ArgName::MessageId,
                                )
                                .into()])
                            }
                        };

                        // UNWRAP HERE
                        let max_key_size = match &args.get(1).unwrap().expr.to_u32() {
                            Ok(value) => *value,
                            Err(_) => {
                                return Err(vec![InvalidArg::from_new_expr(
                                    self,
                                    ArgName::MaxKeySize,
                                )
                                .into()])
                            }
                        };

                        // UNWRAP HERE
                        let max_value_size = match &args.get(2).unwrap().expr.to_u32() {
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
