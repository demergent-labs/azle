use rquickjs::{Context, Ctx, Function};
use std::path::Path;

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), move |candid_path: String| {
        let (env, actor) = candid_parser::pretty_check_file(Path::new(&candid_path)).unwrap();

        candid_parser::bindings::javascript::compile(&env, &actor)
    })
    .unwrap()
}
