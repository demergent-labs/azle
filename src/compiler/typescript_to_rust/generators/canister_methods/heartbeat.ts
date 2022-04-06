import { Rust } from '../../../../types';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/canister_methods';
import * as tsc from 'typescript';
import { getFunctionName } from '../../../typescript_to_candid/ast_utilities/miscellaneous';

// TODO heartbeat might be fundamentally unsafe
// TODO because it can be called at any time...
// TODO this might cause some big problems for people
export function generateCanisterMethodHeartbeat(sourceFiles: readonly tsc.SourceFile[]): Rust {
    const heartbeatFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        ['Heartbeat']
    );

    if (heartbeatFunctionDeclarations.length > 1) {
        throw new Error(`Only one heartbeat function can be defined`);
    }

    const heartbeatFunctionDeclaration: tsc.FunctionDeclaration | undefined = heartbeatFunctionDeclarations[0];

    if (heartbeatFunctionDeclaration === undefined) {
        return '';
    }

    const heartbeatFunctionName = getFunctionName(heartbeatFunctionDeclaration);

    // TODO study deeply what is going on here...I wonder if init and heartbeat might be writing over each other
    // TODO I probably did not need to do all of the weird pyramid stuff, unless the shared mutable state is actually an issue
    // TODO I am hoping that it isn't though, as I hope that each update call is executed independently
    // TODO we will have to see though
    return `
        #[ic_cdk_macros::heartbeat]
        fn _azle_${heartbeatFunctionName}() {
            unsafe {
                ic_cdk::block_on(async {
                    let boa_context_option = BOA_CONTEXT_OPTION.as_mut();

                    if let Some(boa_context) = boa_context_option {
                        let exports_js_value_result = boa_context.eval("exports");

                        if let Ok(exports_js_value) = exports_js_value_result {
                            let exports_js_object_option = exports_js_value.as_object();
        
                            if let Some(exports_js_object) = exports_js_object_option {
                                let ${heartbeatFunctionName}_js_value_result = exports_js_object.get("${heartbeatFunctionName}", boa_context);
                                
                                if let Ok(${heartbeatFunctionName}_js_value) = ${heartbeatFunctionName}_js_value_result {
                                    let ${heartbeatFunctionName}_js_object_option = ${heartbeatFunctionName}_js_value.as_object();
                            
                                    if let Some(${heartbeatFunctionName}_js_object) = ${heartbeatFunctionName}_js_object_option {
                                        let return_value_result = ${heartbeatFunctionName}_js_object.call(
                                            &boa_engine::JsValue::Null,
                                            &[],
                                            boa_context
                                        );

                                        if let Ok(return_value) = return_value_result {
                                            if
                                                return_value.is_object() == true &&
                                                return_value.as_object().unwrap().is_generator() == true
                                            {
                                                handle_generator_result(
                                                    boa_context,
                                                    &return_value
                                                ).await;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    `;
}