import {
    JavaScript,
    Rust
} from '../../../../types';
import * as tsc from 'typescript';
import { getCanisterMethodFunctionDeclarationsFromSourceFiles } from '../../../typescript_to_candid/ast_utilities/canister_methods';
import { getUserDefinedInitFunctionParams } from './init';
import { generateIcObject } from '../ic_object';
import { getStableStorageVariableInfos } from './pre_upgrade';
import { getFunctionName } from '../../../typescript_to_candid/ast_utilities/miscellaneous';

export function generateCanisterMethodPostUpgrade(
    sourceFiles: readonly tsc.SourceFile[],
    js: JavaScript,
): Rust {
    const stableStorageVariableInfos = getStableStorageVariableInfos(sourceFiles);

    const icObject: Rust = generateIcObject(stableStorageVariableInfos);

    const initFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        ['Init']
    );

    if (initFunctionDeclarations.length > 1) {
        throw new Error(`Only one init function can be defined`);
    }

    const initFunctionDeclaration: tsc.FunctionDeclaration | undefined = initFunctionDeclarations[0];

    const userDefinedInitFunctionParams = [
        { paramName: 'boa_context', paramType: '&mut boa_engine::Context' },
        ...getUserDefinedInitFunctionParams(initFunctionDeclaration)
    ];

    const postUpgradeFunctionDeclarations = getCanisterMethodFunctionDeclarationsFromSourceFiles(
        sourceFiles,
        ['PostUpgrade']
    );

    if (postUpgradeFunctionDeclarations.length > 1) {
        throw new Error(`Only one PostUpgrade function can be defined`);
    }

    const postUpgradeFunctionDeclaration: tsc.FunctionDeclaration | undefined = postUpgradeFunctionDeclarations[0];

    const developerDefinedPostUpgradeFunctionName = getDeveloperDefinedPostUpgradeFunctionName(postUpgradeFunctionDeclaration);

    return `
        #[ic_cdk_macros::post_upgrade]
        fn post_upgrade(${userDefinedInitFunctionParams.filter((param) => param.paramName !== 'boa_context').map((param) => `${param.paramName}: ${param.paramType}`).join(', ')}) {
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
                    compiled_js = r#"${js}"#
                )).unwrap();

                ${postUpgradeFunctionDeclaration === undefined ? '' : `
                    let exports_js_value = boa_context.eval("exports").unwrap();
                    let exports_js_object = exports_js_value.as_object().unwrap();
        
                    let ${developerDefinedPostUpgradeFunctionName}_js_value = exports_js_object.get("${developerDefinedPostUpgradeFunctionName}", boa_context).unwrap();
                    let ${developerDefinedPostUpgradeFunctionName}_js_object = ${developerDefinedPostUpgradeFunctionName}_js_value.as_object().unwrap();
                    
                    let return_value = ${developerDefinedPostUpgradeFunctionName}_js_object.call(
                        &boa_engine::JsValue::Null,
                        &[
                            ${userDefinedInitFunctionParams.filter((param) => param.paramName !== 'boa_context').map((param) => {
                                return `${param.paramName}.azle_into_js_value(boa_context)`;
                            }).join(',')}
                        ],
                        boa_context
                    ).unwrap();
                `}
            }
        }
    `;
}

function getDeveloperDefinedPostUpgradeFunctionName(initFunctionDeclaration: tsc.FunctionDeclaration | undefined): string {
    if (initFunctionDeclaration === undefined) {
        return '';
    }

    return getFunctionName(initFunctionDeclaration);
}