use candid::IDLArgs;
use rquickjs::{Ctx, Function, Result, TypedArray};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(
        ctx.clone(),
        move |candid_encoded: TypedArray<u8>| -> Result<String> {
            let candid_bytes = candid_encoded.as_ref();
            let candid_args: IDLArgs =
                IDLArgs::from_bytes(candid_bytes).map_err(|e| throw_error(ctx.clone(), e))?;
            let candid_string = candid_args.to_string();

            Ok(candid_string)
        },
    )
}
