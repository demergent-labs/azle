import { Rust } from '../../../../../types';

export function generateIcObjectFunctionTime(): Rust {
    return `
        fn ic_time(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            return Ok(
                boa_engine::JsValue::Rational(
                    ic_cdk::api::time() as f64 // TODO this conversion is probably not safe
                )
            );
        }
    `;
}