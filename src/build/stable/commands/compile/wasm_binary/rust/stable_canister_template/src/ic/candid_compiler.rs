use std::path::Path;

use candid_parser::{bindings::javascript::compile, pretty_check_file};
use rquickjs::{Ctx, Function, Result};

use crate::ic::throw_error;

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx.clone(), move |candid_path: String| -> Result<String> {
        let (env, actor) =
            pretty_check_file(Path::new(&candid_path)).map_err(|e| throw_error(ctx.clone(), e))?;

        Ok(compile(&env, &actor))
    })
}
