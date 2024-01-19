use wasmedge_quickjs::{Context, JsFn, JsValue};

pub struct NativeFunction;
impl JsFn for NativeFunction {
    fn call(context: &mut Context, this_val: JsValue, argv: &[JsValue]) -> JsValue {
        let canister_id_bytes = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(0).unwrap()
        {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };
        let canister_id = candid::Principal::from_slice(&canister_id_bytes);

        let method = if let JsValue::String(js_string) = argv.get(1).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };

        let args_raw = if let JsValue::ArrayBuffer(js_array_buffer) = argv.get(2).unwrap() {
            js_array_buffer.to_vec()
        } else {
            panic!("conversion from JsValue to JsArrayBuffer failed")
        };

        let payment_string = if let JsValue::String(js_string) = argv.get(3).unwrap() {
            js_string.to_string()
        } else {
            panic!("conversion from JsValue to JsString failed")
        };
        let payment: u128 = payment_string.parse().unwrap();

        let notify_result = ic_cdk::api::call::notify_raw(canister_id, &method, &args_raw, payment);

        match notify_result {
            Ok(_) => JsValue::UnDefined,
            Err(err) => {
                // TODO obviously fix this once we figure out wasmedge_quickjs errors

                // TODO it might be nice to convert the rejection code to a string as well if possible
                // TODO to give the user an actual error message (like the enum variants converted to string)
                let err_string = format!(
                    "Rejection code {rejection_code}",
                    rejection_code = (err as i32).to_string()
                );

                // Err(anyhow::anyhow!(err_string))

                panic!(err_string);
            }
        }
    }
}
