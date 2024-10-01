use rquickjs::{Context, Ctx, Function, TypedArray, Value};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context.clone(), move |candid_string: String| {
        let candid_args = candid_parser::parse_idl_args(&candid_string).unwrap();
        let candid_encoded = candid_args.to_bytes().unwrap();

        TypedArray::<u8>::new(context.clone(), candid_encoded)
    })
    .unwrap()
}
