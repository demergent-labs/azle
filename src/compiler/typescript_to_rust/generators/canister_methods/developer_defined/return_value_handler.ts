import { ImplItemMethod } from '../../../ast_utilities/types';
import {
    CallFunctionInfo,
    CanisterMethodFunctionInfo,
    Rust
} from '../../../../../types';

// TODO I think I should hold off on anything crazy for now, just tell people to use float64 until further notice
// TODO follow this issue https://github.com/boa-dev/boa/issues/1961 and this issue https://github.com/boa-dev/boa/issues/1962
// TODO worst case I might need to create my own conversion from boa's JsValue to the Rust equivalent
// TODO this would give me complete control over every conversion, and number conversions are what I require complete control of
// TODO I need that control to possibly convert from a BigInt
// TODO get this to work for Option...if necessary...probably is necessary to do some kind of recursion
export function generateReturnValueHandler(
    implItemMethod: ImplItemMethod,
    canisterMethodFunctionInfo: CanisterMethodFunctionInfo
): Rust {
    const returnTypeName = getImplItemMethodReturnTypeName(implItemMethod);

    return `
        if
            _azle_return_value.is_object() == false ||
            _azle_return_value.as_object().unwrap().is_generator() == false
        {
            ${
                returnTypeName === ''
                    ? canisterMethodFunctionInfo.manual
                        ? `return ic_cdk::api::call::ManualReply::empty();`
                        : `return;`
                    : `${generateReturnValueConversion(
                          '_azle_return_value',
                          returnTypeName,
                          canisterMethodFunctionInfo
                      )}`
            }
        }

        let _azle_final_js_value = handle_generator_result(
            &mut boa_context,
            &_azle_return_value
        ).await;

        ${
            returnTypeName === ''
                ? ''
                : `
            // if _azle_final_js_value.is_undefined() {

            // }
            // else {
                // serde_json::from_value(_azle_final_js_value.to_json(&mut boa_context).unwrap()).unwrap()
                ${generateReturnValueConversion(
                    '_azle_final_js_value',
                    returnTypeName,
                    canisterMethodFunctionInfo
                )}
            // }
        `
        }
    `;

    // return `
    //     if
    //         _azle_return_value.is_object() &&
    //         _azle_return_value.as_object().unwrap().is_generator()
    //     {
    //         let _azle_generator_object = _azle_return_value.as_object().unwrap();

    //         let _azle_next_js_value = _azle_generator_object.get("next", &mut boa_context).unwrap();
    //         let _azle_next_js_object = _azle_next_js_value.as_object().unwrap();

    //         let _azle_final_js_value = azle_run_generator(
    //             &[],
    //             _azle_next_js_object,
    //             &mut boa_context,
    //             &_azle_return_value
    //         ).await;

    //         return serde_json::from_value(_azle_final_js_value.to_json(&mut boa_context).unwrap()).unwrap();
    //     }

    //     serde_json::from_value(_azle_return_value.to_json(&mut boa_context).unwrap()).unwrap()
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

    // return `serde_json::from_value(_azle_return_value.to_json(&mut boa_context).unwrap()).unwrap()`;
}

// TODO Now that we are using the async_recursion crate we can probably rewrite this entirely recursively (get rid of the mutations)
export function generateHandleGeneratorResultFunction(
    callFunctionInfos: CallFunctionInfo[]
): Rust {
    return /* rust */ `
        #[async_recursion::async_recursion(?Send)]
        async fn handle_generator_result(
            _azle_boa_context: &mut boa_engine::Context,
            _azle_return_value: &boa_engine::JsValue
        ) -> boa_engine::JsValue {
            let _azle_generator_object = _azle_return_value.as_object().unwrap();

            let _azle_next_js_value = _azle_generator_object.get("next", _azle_boa_context).unwrap();
            let _azle_next_js_object = _azle_next_js_value.as_object().unwrap();

            let mut _azle_continue_running = true;
            let mut _azle_args: Vec<boa_engine::JsValue> = vec![];

            // let mut _azle_final_js_value = boa_engine::JsValue::Undefined; // TODO this will probably break down below
            let mut _azle_final_js_value = boa_engine::JsValue::from("hello"); // TODO this will probably break down below

            while _azle_continue_running == true {
                let yield_result_js_value = _azle_next_js_object.call(&_azle_return_value, &_azle_args[..], _azle_boa_context).unwrap();
                let yield_result_js_object = yield_result_js_value.as_object().unwrap();

                let yield_result_done_js_value = yield_result_js_object.get("done", _azle_boa_context).unwrap();
                let yield_result_done_bool = yield_result_done_js_value.as_boolean().unwrap();

                let yield_result_value_js_value = yield_result_js_object.get("value", _azle_boa_context).unwrap();

                if yield_result_done_bool == false {
                    let yield_result_value_js_object = yield_result_value_js_value.as_object().unwrap();

                    if yield_result_value_js_object.is_generator() {
                        let recursed_generator_js_value = handle_generator_result(
                            _azle_boa_context,
                            &yield_result_value_js_value
                        ).await;

                        _azle_args = vec![recursed_generator_js_value];

                        continue;
                    }

                    let name_js_value = yield_result_value_js_object.get("name", _azle_boa_context).unwrap();
                    let name_string = name_js_value.as_string().unwrap();

                    if name_string == "rawRand" {
                        let call_result: Result<(Vec<u8>,()), _> = ic_cdk::api::call::call(
                            ic_cdk::export::Principal::management_canister(),
                            "raw_rand",
                            ()
                        ).await;

                        match call_result {
                            Ok(value) => {
                                let js_value = value.0.azle_into_js_value(_azle_boa_context);

                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                    .property(
                                        "ok",
                                        js_value,
                                        boa_engine::property::Attribute::all()
                                    )
                                    .build();

                                let canister_result_js_value = canister_result_js_object.into();

                                _azle_args = vec![canister_result_js_value];
                            },
                            Err(err) => {
                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                    .property(
                                        "err",
                                        js_value,
                                        boa_engine::property::Attribute::all()
                                    )
                                    .build();

                                let canister_result_js_value = canister_result_js_object.into();

                                _azle_args = vec![canister_result_js_value];
                            }
                        };
                    }

                    // TODO call_raw and call_raw128 code are nearly identical
                    if name_string == "call_raw" {
                        let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                        let call_args_js_object = call_args_js_value.as_object().unwrap();

                        let canister_id_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                        let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                        let method_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                        let method_string = method_js_value.as_string().unwrap().to_string();

                        // TODO use azle_try_from_js_value more often
                        let args_raw_js_value = call_args_js_object.get("2", _azle_boa_context).unwrap();
                        let args_raw_vec: Vec<u8> = args_raw_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                        let payment_js_value = call_args_js_object.get("3", _azle_boa_context).unwrap();
                        let payment: u64 = payment_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                        let call_result: Result<Vec<u8>, _> = ic_cdk::api::call::call_raw(
                            canister_id_principal,
                            &method_string,
                            &args_raw_vec,
                            payment
                        ).await;

                        match call_result {
                            Ok(value) => {
                                let js_value = value.azle_into_js_value(_azle_boa_context);

                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                    .property(
                                        "ok",
                                        js_value,
                                        boa_engine::property::Attribute::all()
                                    )
                                    .build();

                                let canister_result_js_value = canister_result_js_object.into();

                                _azle_args = vec![canister_result_js_value];
                            },
                            Err(err) => {
                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                    .property(
                                        "err",
                                        js_value,
                                        boa_engine::property::Attribute::all()
                                    )
                                    .build();

                                let canister_result_js_value = canister_result_js_object.into();

                                _azle_args = vec![canister_result_js_value];
                            }
                        };
                    }

                    // TODO call_raw and call_raw128 code are nearly identical
                    if name_string == "call_raw128" {
                        let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                        let call_args_js_object = call_args_js_value.as_object().unwrap();

                        let canister_id_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                        let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                        let method_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                        let method_string = method_js_value.as_string().unwrap().to_string();

                        // TODO use azle_try_from_js_value more often
                        let args_raw_js_value = call_args_js_object.get("2", _azle_boa_context).unwrap();
                        let args_raw_vec: Vec<u8> = args_raw_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                        let payment_js_value = call_args_js_object.get("3", _azle_boa_context).unwrap();
                        let payment: u128 = payment_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                        let call_result: Result<Vec<u8>, _> = ic_cdk::api::call::call_raw128(
                            canister_id_principal,
                            &method_string,
                            &args_raw_vec,
                            payment
                        ).await;

                        match call_result {
                            Ok(value) => {
                                let js_value = value.azle_into_js_value(_azle_boa_context);

                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                    .property(
                                        "ok",
                                        js_value,
                                        boa_engine::property::Attribute::all()
                                    )
                                    .build();

                                let canister_result_js_value = canister_result_js_object.into();

                                _azle_args = vec![canister_result_js_value];
                            },
                            Err(err) => {
                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                    .property(
                                        "err",
                                        js_value,
                                        boa_engine::property::Attribute::all()
                                    )
                                    .build();

                                let canister_result_js_value = canister_result_js_object.into();

                                _azle_args = vec![canister_result_js_value];
                            }
                        };
                    }

                    if name_string == "call" {
                        let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                        let call_args_js_object = call_args_js_value.as_object().unwrap();

                        let call_function_name_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                        let call_function_name_string = call_function_name_js_value.as_string().unwrap().to_string();

                        match &call_function_name_string[..] {
                            ${callFunctionInfos
                                .map((callFunctionInfo) => {
                                    return /* rust */ `
                                    "${callFunctionInfo.call.functionName}" => {
                                        let canister_id_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                                        let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                                        ${callFunctionInfo.call.params
                                            .map((param, index) => {
                                                return `
                                                let ${
                                                    param.paramName
                                                }_js_value = call_args_js_object.get("${
                                                    index + 2
                                                }", _azle_boa_context).unwrap();
                                                let ${param.paramName}: ${
                                                    param.paramType
                                                } = ${
                                                    param.paramName
                                                }_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();
                                            `;
                                            })
                                            .join('\n')}

                                        let call_result = ${
                                            callFunctionInfo.call.functionName
                                        }(
                                            canister_id_principal,
                                            ${callFunctionInfo.call.params
                                                .map((param) => {
                                                    return param.paramName;
                                                })
                                                .join(',\n')}
                                        ).await;

                                        match call_result {
                                            Ok(value) => {
                                                let js_value = value.0.azle_into_js_value(_azle_boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                                    .property(
                                                        "ok",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                _azle_args = vec![canister_result_js_value];
                                            },
                                            Err(err) => {
                                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                                    .property(
                                                        "err",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                _azle_args = vec![canister_result_js_value];
                                            }
                                        };
                                    },
                                `;
                                })
                                .join('\n')}
                            _ => ()
                        };
                    }

                    if name_string == "call_with_payment" {
                        let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                        let call_args_js_object = call_args_js_value.as_object().unwrap();

                        let call_function_name_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                        let call_function_name_string = call_function_name_js_value.as_string().unwrap().to_string();

                        match &call_function_name_string[..] {
                            ${callFunctionInfos
                                .map((callFunctionInfo) => {
                                    return /* rust */ `
                                    "${
                                        callFunctionInfo.call_with_payment
                                            .functionName
                                    }" => {
                                        let canister_id_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                                        let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                                        ${callFunctionInfo.call_with_payment.params
                                            .map((param, index) => {
                                                return `
                                                let ${
                                                    param.paramName
                                                }_js_value = call_args_js_object.get("${
                                                    index + 2
                                                }", _azle_boa_context).unwrap();
                                                let ${param.paramName}: ${
                                                    param.paramType
                                                } = ${
                                                    param.paramName
                                                }_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();
                                            `;
                                            })
                                            .join('\n')}

                                        let cycles_js_value = call_args_js_object.get("${
                                            callFunctionInfo.call_with_payment
                                                .params.length + 2
                                        }", _azle_boa_context).unwrap();
                                        let cycles: u64 = cycles_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                                        let call_result = ${
                                            callFunctionInfo.call_with_payment
                                                .functionName
                                        }(
                                            canister_id_principal,
                                            ${callFunctionInfo.call_with_payment.params
                                                .map((param) => {
                                                    return param.paramName;
                                                })
                                                .join(',\n')}${
                                        callFunctionInfo.call_with_payment
                                            .params.length > 0
                                            ? ','
                                            : ''
                                    }
                                            cycles
                                        ).await;

                                        match call_result {
                                            Ok(value) => {
                                                let js_value = value.0.azle_into_js_value(_azle_boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                                    .property(
                                                        "ok",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                _azle_args = vec![canister_result_js_value];
                                            },
                                            Err(err) => {
                                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                                    .property(
                                                        "err",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                _azle_args = vec![canister_result_js_value];
                                            }
                                        };
                                    },
                                `;
                                })
                                .join('\n')}
                            _ => ()
                        };
                    }

                    if name_string == "call_with_payment128" {
                        let call_args_js_value = yield_result_value_js_object.get("args", _azle_boa_context).unwrap();
                        let call_args_js_object = call_args_js_value.as_object().unwrap();

                        let call_function_name_js_value = call_args_js_object.get("0", _azle_boa_context).unwrap();
                        let call_function_name_string = call_function_name_js_value.as_string().unwrap().to_string();

                        match &call_function_name_string[..] {
                            ${callFunctionInfos
                                .map((callFunctionInfo) => {
                                    return /* rust */ `
                                    "${
                                        callFunctionInfo.call_with_payment128
                                            .functionName
                                    }" => {
                                        let canister_id_js_value = call_args_js_object.get("1", _azle_boa_context).unwrap();
                                        let canister_id_principal: ic_cdk::export::Principal = canister_id_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                                        ${callFunctionInfo.call_with_payment128.params
                                            .map((param, index) => {
                                                return `
                                                let ${
                                                    param.paramName
                                                }_js_value = call_args_js_object.get("${
                                                    index + 2
                                                }", _azle_boa_context).unwrap();
                                                let ${param.paramName}: ${
                                                    param.paramType
                                                } = ${
                                                    param.paramName
                                                }_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();
                                            `;
                                            })
                                            .join('\n')}

                                        let cycles_js_value = call_args_js_object.get("${
                                            callFunctionInfo
                                                .call_with_payment128.params
                                                .length + 2
                                        }", _azle_boa_context).unwrap();
                                        let cycles: u128 = cycles_js_value.azle_try_from_js_value(_azle_boa_context).unwrap();

                                        let call_result = ${
                                            callFunctionInfo
                                                .call_with_payment128
                                                .functionName
                                        }(
                                            canister_id_principal,
                                            ${callFunctionInfo.call_with_payment128.params
                                                .map((param) => {
                                                    return param.paramName;
                                                })
                                                .join(',\n')}${
                                        callFunctionInfo.call_with_payment128
                                            .params.length > 0
                                            ? ','
                                            : ''
                                    }
                                                cycles
                                        ).await;

                                        match call_result {
                                            Ok(value) => {
                                                let js_value = value.0.azle_into_js_value(_azle_boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                                    .property(
                                                        "ok",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                _azle_args = vec![canister_result_js_value];
                                            },
                                            Err(err) => {
                                                let js_value = format!("Rejection code {rejection_code}, {error_message}", rejection_code = (err.0 as i32).to_string(), error_message = err.1).azle_into_js_value(_azle_boa_context);

                                                let canister_result_js_object = boa_engine::object::ObjectInitializer::new(_azle_boa_context)
                                                    .property(
                                                        "err",
                                                        js_value,
                                                        boa_engine::property::Attribute::all()
                                                    )
                                                    .build();

                                                let canister_result_js_value = canister_result_js_object.into();

                                                _azle_args = vec![canister_result_js_value];
                                            }
                                        };
                                    },
                                `;
                                })
                                .join('\n')}
                            _ => ()
                        };
                    }
                }
                else {
                    _azle_final_js_value = yield_result_value_js_value;
                    _azle_continue_running = false;
                }
            }

            _azle_final_js_value
        }
    `;
}

function getImplItemMethodReturnTypeName(
    implItemMethod: ImplItemMethod
): string {
    const returnTypeAst =
        implItemMethod.output?.path.segments[0].arguments.angle_bracketed
            .args[0].type.tuple.elems[0];

    if (returnTypeAst === undefined) {
        return '';
    } else {
        if (returnTypeAst.tuple?.elems?.length === 0) {
            return '()';
        }

        if (returnTypeAst.path === undefined) {
            return '';
        }

        return returnTypeAst.path.segments
            .map((segment: any) => segment.ident)
            .join('::');
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
    returnTypeName: string,
    canisterMethodFunctionInfo: CanisterMethodFunctionInfo
): string {
    if (canisterMethodFunctionInfo.manual === true) {
        return `return ic_cdk::api::call::ManualReply::empty();`;
    } else {
        return `return ${jsValueName}.azle_try_from_js_value(&mut boa_context).unwrap();`;
    }
}
