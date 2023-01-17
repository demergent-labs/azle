use proc_macro2::TokenStream;
use quote::quote;

pub fn generate() -> TokenStream {
    quote! {
        fn _azle_ic_reply_raw(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let buf_js_value: boa_engine::JsValue = _aargs.get(0).unwrap().clone();
            let buf_vec: Vec<u8> = buf_js_value.try_from_vm_value(&mut *_context).unwrap();
            Ok(ic_cdk::api::call::reply_raw(&buf_vec).try_into_vm_value(_context).unwrap())
        }
    }
}
