import { Rust } from '../../../../../types';

export function generateIcObjectFunctionPerformanceCounter(): Rust {
    return /* rust */ `
        fn _azle_ic_performance_counter(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let counter_type: u32 = _aargs[0].clone().azle_try_from_js_value(_context).unwrap();
            let return_value: boa_engine::bigint::JsBigInt = ic_cdk::api::call::performance_counter(counter_type).into();
            Ok(return_value.into())
        }
    `;
}
