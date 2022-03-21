import { Rust } from '../../../../../types';

export function generateIcObjectFunctionPrint(): Rust {
    return `
        fn azle_ic_print(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            ic_cdk::println!("{:#?}", _aargs);
        
            return Ok(boa_engine::JsValue::Undefined);
        }
    `;
}