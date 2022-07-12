import { Rust } from '../../../../../types';

export function generateIcObjectFunctionTrap(): Rust {
    return /* rust */ `
        fn _azle_ic_trap(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            ic_cdk::api::trap(_aargs.get(0).unwrap().as_string().unwrap());
        }
    `;
}
