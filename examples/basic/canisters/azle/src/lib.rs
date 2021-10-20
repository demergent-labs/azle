fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> { Ok(()) }

getrandom::register_custom_getrandom!(custom_getrandom);

// TODO the best way to do this is probably with a macro
// TODO the macro should go and grab the JS and put it in place
#[ic_cdk_macros::query]
fn execute_js() {
    let mut context = boa::Context::new();

    // let global_object = context.global_object();

    // ic_cdk::println!("global_object: {:#?}", global_object);

    context.register_global_function(
        "icPrint",
        0,
        ic_print
    ).unwrap();

    let value = context.eval("icPrint(\"cooper is a pup\");").unwrap();

    ic_cdk::println!("value: {:#?}", value);

    // value.as_number().unwrap().to_string()
}

fn ic_print(
    _this: &boa::JsValue,
    _aargs: &[boa::JsValue],
    _context: &mut boa::Context
) -> boa::JsResult<boa::JsValue> {
    ic_cdk::println!("{:#?}", _aargs);

    return Ok(boa::JsValue::Undefined);
}