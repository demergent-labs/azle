import { Rust } from '../../../../../types';

export function generateIcObjectFunctionMsgCyclesRefunded128(): Rust {
    return /* rust */ `
        fn _azle_ic_msg_cycles_refunded128(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let return_value: boa_engine::bigint::JsBigInt = ic_cdk::api::call::msg_cycles_refunded128().into();
            Ok(return_value.into())
        }
    `;
}
