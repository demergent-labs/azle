import { Rust } from '../../../../../types';

export function generateIcObjectFunctionStableRead(): Rust {
    // TODO Optimize vec conversion https://github.com/demergent-labs/azle/issues/482
    return /* rust */ `
        fn _azle_ic_stable_read(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context,
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            let offset: u32 = _aargs
                .get(0)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();
            let length: u32 = _aargs
                .get(1)
                .unwrap()
                .clone()
                .azle_try_from_js_value(_context)
                .unwrap();

            let mut buf: Vec<u8> = vec![0; length as usize];
            ic_cdk::api::stable::stable_read(offset, &mut buf);
            Ok(buf.azle_into_js_value(_context))
        }
    `;
}
