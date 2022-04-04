import { Rust } from '../../../../../types';

export function generateIcObjectFunctionCanisterBalance(): Rust {
    return `
        fn azle_ic_canister_balance(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            Ok(ic_cdk::api::canister_balance().azle_into_js_value(_context))
        }
    `;
}