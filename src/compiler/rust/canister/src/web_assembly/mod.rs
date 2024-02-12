use wasmedge_quickjs::{AsObject, Context, JsFn, JsValue};

mod instantiate;

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
