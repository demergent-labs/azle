fn custom_getrandom(_buf: &mut [u8]) -> Result<(), getrandom::Error> { Ok(()) }

getrandom::register_custom_getrandom!(custom_getrandom);

// TODO let's get a simple console.log working

// TODO the best way to do this is probably with a macro
// TODO the macro should go and grab the JS and put it in place
#[ic_cdk_macros::query]
fn execute_js() {
    let mut context = boa::Context::new();

    let value = context.eval(js).unwrap();

    ic_cdk::println!("value: {:#?}", value);

    // value.as_number().unwrap().to_string()
}