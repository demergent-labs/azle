use rquickjs::{Ctx, Function, TypedArray};

pub fn get_function(context: Ctx) -> Function {
    Function::new(context, |candid_encoded: TypedArray<u8>| {
        let candid_bytes = candid_encoded.as_ref();
        let candid_args: candid::IDLArgs = candid::IDLArgs::from_bytes(candid_bytes).unwrap();
        let candid_string = candid_args.to_string();

        candid_string
    })
    .unwrap()
}
