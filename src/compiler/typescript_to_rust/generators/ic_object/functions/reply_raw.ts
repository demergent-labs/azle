import { Rust } from '../../../../../types';

export function generateIcObjectFunctionReplyRaw(): Rust {
    return /* rust */ `
        fn _azle_ic_reply_raw(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let buf_js_value: boa_engine::JsValue = _aargs.get(0).unwrap().clone();
            let buf_vec: Vec<u8> = buf_js_value.azle_try_from_js_value(_context).unwrap();
            Ok(ic_cdk::api::call::reply_raw(&buf_vec).azle_into_js_value(_context))
        }
    `;
}
