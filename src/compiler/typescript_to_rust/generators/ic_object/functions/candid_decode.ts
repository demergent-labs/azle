import { Rust } from '../../../../../types';

export function generateIcObjectFunctionCandidDecode(): Rust {
    return /* rust */ `
        fn _azle_ic_candid_decode(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let candid_encoded: Vec<u8> = _aargs.get(0).unwrap().clone().azle_try_from_js_value(_context).unwrap();
            let candid_args: candid::IDLArgs = candid::IDLArgs::from_bytes(&candid_encoded).unwrap();
            let candid_string = candid_args.to_string();

            Ok(candid_string.azle_into_js_value(_context))
        }
    `;
}
