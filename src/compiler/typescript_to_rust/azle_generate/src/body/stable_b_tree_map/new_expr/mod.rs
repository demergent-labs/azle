use std::ops::Deref;

use cdk_framework::traits::CollectResults;
use swc_ecma_ast::NewExpr;

use self::errors::{
    ArgSpread, IncorrectNumberOfArgs, IncorrectTypeArgs, InvalidArg, MissingArgs,
    MissingSbtmTypeArguments,
};

use super::expr::{ToU32, ToU8};
use crate::{
    canister_method::check_length_and_map::CheckLengthAndMapTwo, ts_ast::SourceMapped, Error,
    StableBTreeMapNode,
};

pub mod errors;
mod get_span;

#[derive(PartialEq, Clone, Debug)]
pub enum ArgName {
    MessageId,
    MaxKeySize,
    MaxValueSize,
}

impl SourceMapped<'_, NewExpr> {
    pub fn to_stable_b_tree_map_node(&self) -> Result<StableBTreeMapNode, Vec<Error>> {
        match &self.type_args {
            Some(type_args) => {
                match &self.args {
                    Some(args) => {
                        if args.len() == 0 {
                            return Err(vec![MissingArgs::from_new_expr(self).into()]);
                        }
                        if args.len() != 3 {
                            return Err(vec![IncorrectNumberOfArgs::from_new_expr(self).into()]);
                        }
                        let (type_arg_candid_types, _, memory_id, max_key_size, max_value_size) = (
                            // Get key and value type from type_args
                            type_args
                                .params
                                .check_length_and_map(
                                    type_args.params.len() == 2,
                                    |_| IncorrectTypeArgs::from_new_expr(self).into(),
                                    |param| self.spawn(param.deref()).to_candid_type(),
                                )
                                .collect_results(),
                            // Get memory id and max key and value size from the call arguments
                            if args.iter().any(|arg| arg.spread.is_some()) {
                                return Err(vec![ArgSpread::from_new_expr(self).into()]);
                            } else {
                                Ok(())
                            },
                            args[0].expr.to_u8().map_err(|_| {
                                vec![InvalidArg::from_new_expr(self, ArgName::MessageId).into()]
                            }),
                            args[1].expr.to_u32().map_err(|_| {
                                vec![InvalidArg::from_new_expr(self, ArgName::MaxKeySize).into()]
                            }),
                            args[2].expr.to_u32().map_err(|_| {
                                vec![InvalidArg::from_new_expr(self, ArgName::MaxValueSize).into()]
                            }),
                        )
                            .collect_results()?;

                        let key_type = type_arg_candid_types[0].clone();
                        let value_type = type_arg_candid_types[1].clone();

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
            None => Err(vec![MissingSbtmTypeArguments::from_new_expr(self).into()]),
        }
    }
}
