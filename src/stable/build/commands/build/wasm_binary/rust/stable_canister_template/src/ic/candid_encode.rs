use candid_parser::parse_idl_args;
use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |candid_string: String| -> Result<TypedArray<u8>> {
            let candid_args =
                parse_idl_args(&candid_string).map_err(|e| throw_error(ctx.clone(), e))?;
            let candid_encoded = candid_args
                .to_bytes()
                .map_err(|e| throw_error(ctx.clone(), e))?;

            TypedArray::<u8>::new(ctx.clone(), candid_encoded)
        },
    )
}
