import { Rust } from '../../../../../types';

export function generateIcObjectFunctionStable64Size(): Rust {
    return /* rust */ `
        fn _azle_ic_stable64_size(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::stable::stable64_size().azle_into_js_value(_context))
        }
    `;
}
