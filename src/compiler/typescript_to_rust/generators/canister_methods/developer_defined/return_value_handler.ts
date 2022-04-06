import { ImplItemMethod } from '../../../ast_utilities/types';
import {
    CallFunctionInfo,
    Rust
} from '../../../../../types';

// TODO I think I should hold off on anything crazy for now, just tell people to use float64 until further notice
// TODO follow this issue https://github.com/boa-dev/boa/issues/1961 and this issue https://github.com/boa-dev/boa/issues/1962
// TODO worst case I might need to create my own conversion from boa's JsValue to the Rust equivalent
// TODO this would give me complete control over every conversion, and number conversions are what I require complete control of
// TODO I need that control to possibly convert from a BigInt
// TODO get this to work for Option...if necessary...probably is necessary to do some kind of recursion
export function generateReturnValueHandler(implItemMethod: ImplItemMethod): Rust {
    const returnTypeName = getImplItemMethodReturnTypeName(implItemMethod);

    return `
        if
            return_value.is_object() == false ||
            return_value.as_object().unwrap().is_generator() == false
        {
            ${returnTypeName === '' ? `return;` : `${generateReturnValueConversion('return_value', returnTypeName)}`}
        }

        let final_js_value = handle_generator_result(
            &mut boa_context,
            &return_value
        ).await;        

        ${returnTypeName === '' ? '' : `
            // if final_js_value.is_undefined() {

            // }
            // else {
                // serde_json::from_value(final_js_value.to_json(&mut boa_context).unwrap()).unwrap()
                ${generateReturnValueConversion('final_js_value', returnTypeName)}
            // }
        `}
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

export function generateHandleGeneratorResultFunction(callFunctionInfos: CallFunctionInfo[]): Rust {
    return `
        async fn handle_generator_result(
            boa_context: &mut boa_engine::Context,
            return_value: &boa_engine::JsValue
        ) -> boa_engine::JsValue {
            let generator_object = return_value.as_object().unwrap();

            let next_js_value = generator_object.get("next", boa_context).unwrap();
            let next_js_object = next_js_value.as_object().unwrap();

            let mut continue_running = true;
            let mut args: Vec<boa_engine::JsValue> = vec![];

            // let mut final_js_value = boa_engine::JsValue::Undefined; // TODO this will probably break down below
            let mut final_js_value = boa_engine::JsValue::from("hello"); // TODO this will probably break down below

            while continue_running == true {
                let yield_result_js_value = next_js_object.call(&return_value, &args[..], boa_context).unwrap();
                let yield_result_js_object = yield_result_js_value.as_object().unwrap();
                
                let yield_result_done_js_value = yield_result_js_object.get("done", boa_context).unwrap();
                let yield_result_done_bool = yield_result_done_js_value.as_boolean().unwrap();
                
                let yield_result_value_js_value = yield_result_js_object.get("value", boa_context).unwrap();

                if yield_result_done_bool == false {
                    let yield_result_value_js_object = yield_result_value_js_value.as_object().unwrap();
                    
                    let name_js_value = yield_result_value_js_object.get("name", boa_context).unwrap();
                    let name_string = name_js_value.as_string().unwrap();

                    if name_string == "rawRand" {
                        let call_result: Result<(Vec<u8>,()), _> = ic_cdk::api::call::call(
                            ic_cdk::export::Principal::management_canister(),
                            "raw_rand",
                            ()
                        ).await;

                        let result = call_result.unwrap().0;

                        let js_value = result.azle_into_js_value(boa_context);

                        args = vec![js_value];
                    }

                    if name_string == "call" {
                        let call_args_js_value = yield_result_value_js_object.get("args", boa_context).unwrap();
                        let call_args_js_object = call_args_js_value.as_object().unwrap();

                        let call_function_name_js_value = call_args_js_object.get("0", boa_context).unwrap(); // TODO get the first call arg
                        let call_function_name_string = call_function_name_js_value.as_string().unwrap().to_string();

                        match &call_function_name_string[..] {
                            ${callFunctionInfos.map((callFunctionInfo) => {
                                return `
                                    "${callFunctionInfo.functionName}" => {
                                        let canister_id_js_value = call_args_js_object.get("1", boa_context).unwrap();
                                        let canister_id_string = canister_id_js_value.as_string().unwrap().to_string();

                                        ${callFunctionInfo.params.map((param, index) => {
                                            return `
                                                let ${param.paramName}_js_value = call_args_js_object.get("${index + 2}", boa_context).unwrap();
                                                let ${param.paramName}: ${param.paramType} = ${param.paramName}_js_value.azle_try_from_js_value(boa_context).unwrap();
                                            `;
                                        }).join('\n')}

                                        let call_result = ${callFunctionInfo.functionName}(
                                            canister_id_string,
                                            ${callFunctionInfo.params.map((param) => {
                                                return param.paramName;
                                            }).join(',\n')}
                                        ).await;

                                        match call_result {
                                            Ok(value) => {
                                                let js_value = value.0.azle_into_js_value(boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(boa_context)
                                                    .property(
                                                        "ok",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                args = vec![canister_result_js_value];
                                            },
                                            Err(err) => {
                                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).into_js_value(boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(boa_context)
                                                    .property(
                                                        "err",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                args = vec![canister_result_js_value];
                                            }
                                        };
                                    },
                                `;
                            }).join('\n')}
                            _ => ()
                        };
                    }
                }
                else {
                    final_js_value = yield_result_value_js_value;
                    continue_running = false;
                }
            }

            final_js_value
        }
    `;
}

function getImplItemMethodReturnTypeName(implItemMethod: ImplItemMethod): string {
    const returnTypeAst = implItemMethod.output?.path.segments[0].arguments.angle_bracketed.args[0].type.tuple.elems[0];

    if (returnTypeAst === undefined) {
        return '';
    }
    else {
        return returnTypeAst.path.segments.map((segment: any) => segment.ident).join('::');
        // return returnTypeAst.path.segments[0].ident;
    }
}

// TODO it is a b it messy but it works
// TODO we can create custom types and code for any types that we need to
// TODO if the IntoJsValue and FromJsValue traits aren't accepted into Boa,
// TODO I might want to create my own...wait, maybe I should just create my own anyway...
// TODO if I do that then I wouldnt' need to create the custom type here...oooooh
// TODO consider if we should use candid::Nat and candid::Int or if we should just use u128 and i128 directly (I almost think it would be simpler to just do the latter)
function generateReturnValueConversion(
    jsValueName: string,
    returnTypeName: string
): string {
    return `return ${jsValueName}.azle_try_from_js_value(&mut boa_context).unwrap();`;
}