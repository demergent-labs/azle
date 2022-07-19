import { Rust } from '../../../../../types';

export function generateIcObjectFunctionCaller(): Rust {
    return /* rust */ `
        fn _azle_ic_caller(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::caller().azle_into_js_value(_context))
        }
    `;
}
