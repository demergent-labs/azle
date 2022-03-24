import { ImplItemMethod } from '../../../ast_utilities/types';
import { Rust } from '../../../../../types';

// TODO I think I should hold off on anything crazy for now, just tell people to use float64 until further notice
// TODO follow this issue https://github.com/boa-dev/boa/issues/1961 and this issue https://github.com/boa-dev/boa/issues/1962
// TODO worst case I might need to create my own conversion from boa's JsValue to the Rust equivalent
// TODO this would give me complete control over every conversion, and number conversions are what I require complete control of
// TODO I need that control to possibly convert from a BigInt
// TODO get this to work for Option...if necessary...probably is necessary to do some kind of recursion
export function generateReturnValueHandler(implItemMethod: ImplItemMethod): Rust {
    // TODO handle void/undefined
    
    return `
        #[derive(Debug, serde::Serialize, serde::Deserialize)]
        struct IcApiInfo {
            name: String // TODO make this an enum probably
        }

        let generator_object = return_value.as_object().unwrap();

        let next_js_value = generator_object.get("next", &mut boa_context).unwrap();
        let next_js_object = next_js_value.as_object().unwrap();

        let mut continue_running = true;
        let mut args: Vec<boa_engine::JsValue> = vec![];

        let mut final_js_value = boa_engine::JsValue::Undefined; // TODO this will probably break down below

        while continue_running {
            let yield_result_js_value = next_js_object.call(&return_value, &args[..], &mut boa_context).unwrap();
            let yield_result_js_object = yield_result_js_value.as_object().unwrap();
        
            let yield_result_value_js_value = yield_result_js_object.get("value", &mut boa_context).unwrap();
        
            let ic_api_info_result: Result<IcApiInfo, _> = serde_json::from_value(yield_result_value_js_value.to_json(&mut boa_context).unwrap());
        
            match ic_api_info_result {
                Ok(ic_api_info) => {
                    if ic_api_info.name == "rawRand" {
                        // let arg = boa_engine::JsValue::from("hello");

                        // TODO we will want to call a special function here
                        let call_result: Result<(Vec<u8>,()), _> = ic_cdk::api::call::call(
                            ic_cdk::export::Principal::management_canister(),
                            "raw_rand",
                            ()
                        ).await;
        
                        let result = call_result.unwrap().0;

                        let mut context = boa_engine::Context::default();

                        // TODO this was Uint8Array.from
                        // TODO this is a hacky conversion but I do not think there is a better way without boa exposing the functionality
                        let value = context
                            .eval(
                                format!(
                                    "{rand_bytes}",
                                    rand_bytes = serde_json::to_string(&result).unwrap()
                                )
                            )
                            .unwrap();

                        let arg = value;

                        args = vec![arg];
                    }
                    else {
                    }
                },
                Err(_) => {
                    final_js_value = yield_result_value_js_value;
                    continue_running = false;
                }
            };
        }

        serde_json::from_value(final_js_value.to_json(&mut boa_context).unwrap()).unwrap()
    `;

    // return `
    //     if
    //         return_value.is_object() &&
    //         return_value.as_object().unwrap().is_generator()
    //     {
    //         let generator_object = return_value.as_object().unwrap();
    
    //         let next_js_value = generator_object.get("next", &mut boa_context).unwrap();
    //         let next_js_object = next_js_value.as_object().unwrap();
    
    //         let final_js_value = azle_run_generator(
    //             &[],
    //             next_js_object,
    //             &mut boa_context,
    //             &return_value
    //         ).await;

    //         return serde_json::from_value(final_js_value.to_json(&mut boa_context).unwrap()).unwrap();
    //     }

    //     serde_json::from_value(return_value.to_json(&mut boa_context).unwrap()).unwrap()
    // `;
    
    // const returnTypeName = getImplItemMethodReturnTypeName(implItemMethod);

    // if (returnTypeName === '') {
    //     return '';
    // }

    // TODO I am holding off on further conversions...in the worst case this code might get complicated
    // TODO as I'll have to implement my own conversions from JsValue to Rust structs
    // TODO especially to overcome any possible BigInt issues
    // TODO but if I can do that, we should have perfect representation of every primitive number type
    // if (returnTypeName === 'int') {

    // }

    // if (returnTypeName === 'int64') {

    // }

    // if (returnTypeName === 'int32') {
        
    // }

    // if (returnTypeName === 'int16') {
        
    // }

    // if (returnTypeName === 'int8') {
        
    // }

    // if (returnTypeName === 'nat') {

    // }

    // if (returnTypeName === 'nat32') {

    // }

    // return `serde_json::from_value(return_value.to_json(&mut boa_context).unwrap()).unwrap()`;
}

function getImplItemMethodReturnTypeName(implItemMethod: ImplItemMethod): string {
    const returnTypeAst = implItemMethod.output?.path.segments[0].arguments.angle_bracketed.args[0].type.tuple.elems[0];

    if (returnTypeAst === undefined) {
        return '';
    }
    else {
        return returnTypeAst.path.segments[0].ident;
    }
}