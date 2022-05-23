import { Rust } from '../../../../../types';

export function generateIcObjectFunctionCaller(): Rust {
    return `
        fn azle_ic_caller(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::caller().into_js_value())
        }
    `;
}