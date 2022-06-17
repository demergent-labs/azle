import { Rust } from '../../../../types';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/canister_methods';
import { getFunctionName } from '../../../typescript_to_candid/ast_utilities/miscellaneous';

import * as tsc from 'typescript';

export function generateCanisterMethodInspectMessage(
    sourceFiles: readonly tsc.SourceFile[]
): Rust {
    const inspectMessageFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'InspectMessage'
        ]);

    if (inspectMessageFunctionDeclarations.length > 1) {
        throw new Error(`Only one InspectMessage function can be defined`);
    }

    const inspectMessageFunctionDeclaration:
        | tsc.FunctionDeclaration
        | undefined = inspectMessageFunctionDeclarations[0];

    if (inspectMessageFunctionDeclaration === undefined) {
        return '';
    }

    const inspectMessageFunctionName = getFunctionName(
        inspectMessageFunctionDeclaration
    );

    return /* rust */ `
        #[ic_cdk_macros::inspect_message]
        fn _azle_${inspectMessageFunctionName}() {
            unsafe {
                let boa_context_option = BOA_CONTEXT_OPTION.as_mut();

                if let Some(boa_context) = boa_context_option {
                    let exports_js_value_result = boa_context.eval("exports");

                    if let Ok(exports_js_value) = exports_js_value_result {
                        let exports_js_object_option = exports_js_value.as_object();

                        if let Some(exports_js_object) = exports_js_object_option {
                            let ${inspectMessageFunctionName}_js_value_result =
                                exports_js_object.get("${inspectMessageFunctionName}", boa_context);

                            if let Ok(${inspectMessageFunctionName}_js_value) =
                                ${inspectMessageFunctionName}_js_value_result
                            {
                                let ${inspectMessageFunctionName}_js_object_option =
                                    ${inspectMessageFunctionName}_js_value.as_object();

                                if let Some(${inspectMessageFunctionName}_js_object) =
                                    ${inspectMessageFunctionName}_js_object_option
                                {
                                    let return_value = ${inspectMessageFunctionName}_js_object
                                        .call(&boa_engine::JsValue::Null, &[], boa_context).unwrap();
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
}
