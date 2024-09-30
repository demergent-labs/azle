use std::{cell::RefCell, collections::HashMap};
use wasmedge_quickjs::AsObject;

mod instantiate;

thread_local! {
    static WASM_INSTANCES: RefCell<HashMap<String, (wasmi::Instance, wasmi::Store<()>)>> = RefCell::new(HashMap::new());
}

#[allow(unused)]
pub fn register(context: &mut wasmedge_quickjs::Context) {
    let mut web_assembly = context.new_object();

    web_assembly.set(
        "instantiate",
        context
            .new_function::<instantiate::NativeFunction>("instantiate")
            .into(),
    );

    context
        .get_global()
        .set("_azleWebAssembly", web_assembly.into());
}
