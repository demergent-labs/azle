import { Rust } from '../../../../../types';

export function generateIcObjectFunctionCaller(): Rust {
    return `
        fn azle_ic_caller(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            return Ok(
                boa_engine::JsValue::String(
                    boa_engine::JsString::new(
                        ic_cdk::api::caller().to_text()
                    )
                )
            );
        }
    `;
}