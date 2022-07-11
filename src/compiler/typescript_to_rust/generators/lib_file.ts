import { generateAzleIntoJsValueTrait } from './azle_into_js_value_trait';
import { generateAzleTryFromJsValueTrait } from './azle_try_from_js_value_trait';
import { generateCallFunctions } from './call_functions';
import { generateSystemCanisterMethods } from './canister_methods';
import { generateCanisterMethodsDeveloperDefined } from './canister_methods/developer_defined';
import { generateHandleGeneratorResultFunction } from './canister_methods/developer_defined/return_value_handler';
import { generateHead } from './head';
import { generateIcObjectFunctions } from './ic_object/functions';
import { modifyRustCandidTypes } from './modified_rust_candid_types';
import { bundle_and_transpile_ts } from '../../typescript_to_javascript';
import {
    CallFunctionInfo,
    CanisterMethodFunctionInfo,
    JavaScript,
    Rust
} from '../../../types';
import * as tsc from 'typescript';
import { generate_func_structs_and_impls } from './funcs';

export async function generateLibFile(
    js: JavaScript,
    rustCandidTypes: Rust,
    canisterMethodFunctionInfos: CanisterMethodFunctionInfo[],
    sourceFiles: readonly tsc.SourceFile[]
): Promise<Rust> {
    // TODO Remove this once these issues are resolved: https://forum.dfinity.org/t/deserialize-to-candid-nat/8192/16, https://github.com/dfinity/candid/issues/331
    // TODO we also might want to just use candid::Nat, candid::Int, candid::Principal and just do the work of implementing the traits locally
    const rustCandidTypesNatAndIntReplaced: Rust = rustCandidTypes
        .replace(/candid::Nat/g, 'u128')
        .replace(/candid::Int/g, 'i128');

    const { func_structs_and_impls, func_names } =
        generate_func_structs_and_impls(sourceFiles);

    // TODO we need to remove the func types, remove the structs and type aliases
    const modifiedRustCandidTypes: Rust = await modifyRustCandidTypes(
        rustCandidTypesNatAndIntReplaced,
        func_names
    );

    const principal_js: JavaScript = bundle_and_transpile_ts(
        `export { Principal } from '@dfinity/principal';`
    );
    const head: Rust = generateHead(js, principal_js);

    const callFunctionInfos: CallFunctionInfo[] =
        generateCallFunctions(sourceFiles);

    const systemCanisterMethods: Rust = generateSystemCanisterMethods(
        sourceFiles,
        callFunctionInfos
    );

    const canisterMethodsDeveloperDefined: Rust =
        await generateCanisterMethodsDeveloperDefined(
            rustCandidTypesNatAndIntReplaced, // TODO you might think that we should pass in modifiedRustCandidTypes here, but the printAst function seems to have a bug that removes the , from the CallResult tuple which causes problems later in the process
            canisterMethodFunctionInfos
        );

    const handleGeneratorResultFunction =
        generateHandleGeneratorResultFunction(callFunctionInfos);

    const icObjectFunctions: Rust = generateIcObjectFunctions(
        sourceFiles,
        canisterMethodFunctionInfos
    );

    const azleIntoJsValueTrait: Rust = generateAzleIntoJsValueTrait();
    const azleTryFromJsValueTrait: Rust = generateAzleTryFromJsValueTrait();

    return /* rust */ `
        ${head}

        ${modifiedRustCandidTypes}

        ${func_structs_and_impls}

        ${azleIntoJsValueTrait}
        ${azleTryFromJsValueTrait}

        ${systemCanisterMethods}

        ${canisterMethodsDeveloperDefined}

        ${handleGeneratorResultFunction}

        ${icObjectFunctions}

        ${callFunctionInfos
            .map(
                (callFunctionInfo) => `
                ${callFunctionInfo.call.rust}

                ${callFunctionInfo.call_with_payment.rust}

                ${callFunctionInfo.call_with_payment128.rust}

                ${callFunctionInfo.notify.rust}

                ${callFunctionInfo.notify_with_payment128.rust}
            `
            )
            .join('\n')}

        fn get_top_level_call_frame(call_frame: &boa_engine::vm::call_frame::CallFrame) -> boa_engine::vm::call_frame::CallFrame {
            if let Some(prev_call_frame) = &call_frame.prev {
                return get_top_level_call_frame(&prev_call_frame);
            }
            else {
                return call_frame.clone();
            }
        }
    `;
}
