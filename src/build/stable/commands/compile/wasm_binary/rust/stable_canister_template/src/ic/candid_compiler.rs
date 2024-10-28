use std::path::Path;

use candid_parser::{bindings::javascript::compile, pretty_check_file};
use rquickjs::{Ctx, Function, Result};

pub fn get_function(ctx: Ctx) -> Result<Function> {
    Function::new(ctx, |candid_path: String| {
        let (env, actor) = pretty_check_file(Path::new(&candid_path)).unwrap();

        compile(&env, &actor)
    })
}
