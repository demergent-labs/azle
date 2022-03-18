import { Rust } from '../../../../../types';

export function generateIcObjectFunctionRawRand(): Rust {
    return `
        fn ic_raw_rand(
            _this: &boa_engine::JsValue,
            _aargs: &[boa_engine::JsValue],
            _context: &mut boa_engine::Context
        ) -> boa_engine::JsResult<boa_engine::JsValue> {
            // let mut context = boa_engine::Context::new();

            // let raw_rand = futures::executor::block_on(async {
            //     let call_result: Result<(Vec<u8>,), _> = ic_cdk::api::call::call(
            //         ic_cdk::export::Principal::management_canister(),
            //         "raw_rand",
            //         ()
            //     ).await;

            //     return call_result.unwrap().0;
            // });

            // let value = context
            //     .eval(
            //         format!(
            //             "Uint8Array.from({raw_rand})",
            //             raw_rand = serde_json::to_string(&raw_rand).unwrap()
            //         )
            //     )
            //     .unwrap();

            // return Ok(value);

            // TODO we should be able to provide randomness without cross-canister calls
            Ok(boa_engine::JsValue::Undefined)
        }
    `;
}