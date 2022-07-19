import { generateIcObject } from '../ic_object';
import { CallFunctionInfo, Rust } from '../../../../types';
import * as tsc from 'typescript';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/canister_methods';
import { getFunctionName } from '../../../typescript_to_candid/ast_utilities/miscellaneous';
import {
    getParamName,
    getRustTypeNameFromTypeNode
} from '../../ast_utilities/miscellaneous';

export function generateCanisterMethodInit(
    sourceFiles: readonly tsc.SourceFile[],
    callFunctionInfos: CallFunctionInfo[]
): Rust {
    const icObject: Rust = generateIcObject([], callFunctionInfos);

    // TODO this code is now copied in post_upgrade
    const initFunctionDeclarations =
        getCanisterMethodFunctionDeclarationsFromSourceFiles(sourceFiles, [
            'Init'
        ]);

    if (initFunctionDeclarations.length > 1) {
        throw new Error(`Only one init function can be defined`);
    }

    const initFunctionDeclaration: tsc.FunctionDeclaration | undefined =
        initFunctionDeclarations[0];

    const userDefinedInitFunctionName = getDeveloperDefinedInitFunctionName(
        initFunctionDeclaration
    );
    const userDefinedInitFunctionParams = [
        { paramName: 'boa_context', paramType: '&mut boa_engine::Context' },
        ...getUserDefinedInitFunctionParams(
            sourceFiles,
            initFunctionDeclaration
        )
    ];

    const developerDefinedInitFunctionCall: Rust =
        generateDeveloperDefinedInitFunctionCall(
            userDefinedInitFunctionName,
            userDefinedInitFunctionParams
        );
    const developerDefinedInitFunction: Rust =
        generateDeveloperDefinedInitFunction(
            userDefinedInitFunctionName,
            userDefinedInitFunctionParams
        );

    return /* rust */ `
        #[ic_cdk_macros::init]
        fn init(${userDefinedInitFunctionParams
            .filter((param) => param.paramName !== 'boa_context')
            .map((param) => `${param.paramName}: ${param.paramType}`)
            .join(', ')}) {
            unsafe {
                BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
                let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

                ${icObject}

                boa_context.register_global_property(
                    "ic",
                    ic,
                    boa_engine::property::Attribute::all()
                );

                boa_context.eval(format!(
                    "let exports = {{}}; {compiled_js}",
                    compiled_js = MAIN_JS
                )).unwrap();

                ${developerDefinedInitFunctionCall}
            }
        }

        ${developerDefinedInitFunction}
    `;
}

export function getDeveloperDefinedInitFunctionName(
    initFunctionDeclaration: tsc.FunctionDeclaration | undefined
): string {
    if (initFunctionDeclaration === undefined) {
        return '';
    }

    return getFunctionName(initFunctionDeclaration);
}

export function generateDeveloperDefinedInitFunctionCall(
    userDefinedInitFunctionName: string,
    userDefinedInitFunctionParams: {
        paramName: string;
        paramType: string;
    }[]
): Rust {
    if (userDefinedInitFunctionName === '') {
        return '';
    }

    return `_azle_${userDefinedInitFunctionName}(${userDefinedInitFunctionParams
        .map((param) => param.paramName)
        .join(', ')});`;
}

// TODO this is almost copied verbatim from call_functions/call_function_params.ts
export function getUserDefinedInitFunctionParams(
    sourceFiles: readonly tsc.SourceFile[],
    functionDeclaration: tsc.FunctionDeclaration | undefined
): {
    paramName: string;
    paramType: string;
}[] {
    if (functionDeclaration === undefined) {
        return [];
    }

    return functionDeclaration.parameters.map((parameterDeclaration) => {
        const paramName = getParamName(parameterDeclaration);

        if (parameterDeclaration.type === undefined) {
            throw new Error(`Parameter must have a type`);
        }

        const paramType = getRustTypeNameFromTypeNode(
            sourceFiles,
            parameterDeclaration.type
        );

        return {
            paramName,
            paramType
        };
    });
}

// TODO I am not sure why I am making this an entirely separate function, could probably just put it in the init function
function generateDeveloperDefinedInitFunction(
    userDefinedInitFunctionName: string,
    userDefinedInitFunctionParams: {
        paramName: string;
        paramType: string;
    }[]
): Rust {
    return /* rust */ `
        fn _azle_${userDefinedInitFunctionName}(${userDefinedInitFunctionParams
        .map((param) => `${param.paramName}: ${param.paramType}`)
        .join(', ')}) {
            let exports_js_value = boa_context.eval("exports").unwrap();
            let exports_js_object = exports_js_value.as_object().unwrap();

            let ${userDefinedInitFunctionName}_js_value = exports_js_object.get("${userDefinedInitFunctionName}", boa_context).unwrap();
            let ${userDefinedInitFunctionName}_js_object = ${userDefinedInitFunctionName}_js_value.as_object().unwrap();

            let return_value = ${userDefinedInitFunctionName}_js_object.call(
                &boa_engine::JsValue::Null,
                &[
                    ${userDefinedInitFunctionParams
                        .filter((param) => param.paramName !== 'boa_context')
                        .map((param) => {
                            return `${param.paramName}.azle_into_js_value(boa_context)`;
                        })
                        .join(',')}
                ],
                boa_context
            ).unwrap();
        }
    `;
}

// TODO new unsafe way
// #[ic_cdk_macros::init]
// fn init() {
//     unsafe {
//         BOA_CONTEXT_OPTION = Some(boa_engine::Context::default());
//         let mut boa_context = BOA_CONTEXT_OPTION.as_mut().unwrap();

//         ${icObject}

//         boa_context.register_global_property(
//             "ic",
//             ic,
//             boa_engine::property::Attribute::all()
//         );

//         boa_context.eval(format!(
//             "let exports = {{}}; {compiled_js}",
//             compiled_js = r#"${js}"#
//         )).unwrap();
//     }
// }

// TODO the old safe way of doing it
// #[ic_cdk_macros::init]
// fn init() {
//     BOA_CONTEXT.with(|boa_context_ref_cell| {
//         let mut boa_context = boa_context_ref_cell.borrow_mut();

//         ${icObject}

//         boa_context.register_global_property(
//             "ic",
//             ic,
//             boa_engine::property::Attribute::all()
//         );

//         boa_context.eval(format!(
//             "let exports = {{}}; {compiled_js}",
//             compiled_js = r#"${js}"#
//         )).unwrap();
//     });
// }
