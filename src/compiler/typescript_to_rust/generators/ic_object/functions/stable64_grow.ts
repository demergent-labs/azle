import { Rust } from '../../../../../types';

export function generateIcObjectFunctionStable64Grow(): Rust {
    return /* rust */ `
        fn _azle_ic_stable64_grow(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let new_pages: u64 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();
            Ok(ic_cdk::api::stable::stable64_grow(new_pages).azle_into_js_value(_context))
        }
    `;
}
