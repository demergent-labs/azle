import { Rust } from '../../../../../types';

export function generateIcObjectFunctionSetCertifiedData(): Rust {
    return /* rust */ `
        fn _azle_ic_set_certified_data(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let data_js_value: boa_engine::JsValue = _aargs.get(0).unwrap().clone();
            let data_vec: Vec<u8> = data_js_value.azle_try_from_js_value(_context).unwrap();
            Ok(ic_cdk::api::set_certified_data(&data_vec).azle_into_js_value(_context))
        }
    `;
}
