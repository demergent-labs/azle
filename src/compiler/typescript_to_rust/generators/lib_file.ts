import { generateCanisterMethodsDeveloperDefined } from './canister_methods/developer_defined';
import { generateCanisterMethodInit } from './canister_methods/init';
import { generateHead } from './head';
import { generateIcObjectFunctionCaller } from './ic_object/functions/caller';
import { generateIcObjectFunctionCanisterBalance } from './ic_object/functions/canister_balance';
import { generateIcObjectFunctionId } from './ic_object/functions/id';
import { generateIcObjectFunctionPrint } from './ic_object/functions/print';
import { generateIcObjectFunctionTime } from './ic_object/functions/time';
import { generateIcObjectFunctionTrap } from './ic_object/functions/trap';
import { generateAzleTryFromJsValueTrait } from './azle_try_from_js_value_trait';
import { generateAzleIntoJsValueTrait } from './azle_into_js_value_trait';
import { modifyRustCandidTypes } from './modified_rust_candid_types';
import {
    CallFunctionInfo,
    JavaScript,
    Rust
} from '../../../types';
import { generateCallFunctions } from './call_functions';
import * as tsc from 'typescript';
import { generateCanisterMethodHeartbeat } from './canister_methods/heartbeat';
import { generateHandleGeneratorResultFunction } from './canister_methods/developer_defined/return_value_handler';
import { generateCanisterMethodPreUpgrade } from './canister_methods/pre_upgrade';
import { generateCanisterMethodPostUpgrade } from './canister_methods/post_upgrade';

export async function generateLibFile(
    js: JavaScript,
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[],
    sourceFiles: readonly tsc.SourceFile[]
): Promise<Rust> {
    // TODO Remove this once these issues are resolved: https://forum.dfinity.org/t/deserialize-to-candid-nat/8192/16, https://github.com/dfinity/candid/issues/331
    // TODO we also might want to just use candid::Nat, candid::Int, candid::Principal and just do the work of implementing the traits locally
    const rustCandidTypesNatAndIntReplaced: Rust = rustCandidTypes.replace(/candid::Nat/g, 'u128').replace(/candid::Int/g, 'i128');
    
    // TODO remove this once this issue is resolved: https://github.com/demergent-labs/azle/issues/93
    const rust_candid_types_semicolon_syntax_fix = rustCandidTypesNatAndIntReplaced.replace(/#\[derive\(CandidType, Deserialize\)\]\nstruct .*? \(.*?\)/g, match => `${match};`);

    const modifiedRustCandidTypes: Rust = await modifyRustCandidTypes(rust_candid_types_semicolon_syntax_fix);

    const head: Rust = generateHead();

    const canisterMethodInit: Rust = generateCanisterMethodInit(
        js,
        sourceFiles
    );
    const canisterMethodPreUpgrade: Rust = generateCanisterMethodPreUpgrade(sourceFiles);
    const canisterMethodPostUpgrade: Rust = generateCanisterMethodPostUpgrade(
        sourceFiles,
        js
    );
    const canisterMethodHeartbeat: Rust = generateCanisterMethodHeartbeat(sourceFiles);

    const callFunctionInfos: CallFunctionInfo[] = generateCallFunctions(sourceFiles);

    const canisterMethodsDeveloperDefined: Rust = await generateCanisterMethodsDeveloperDefined(
        rust_candid_types_semicolon_syntax_fix, // TODO you might think that we should pass in modifiedRustCandidTypes here, but the printAst function seems to have a bug that removes the , from the CallResult tuple which causes problems later in the process
        queryMethodFunctionNames,
        updateMethodFunctionNames
    );

    const handleGeneratorResultFunction = generateHandleGeneratorResultFunction(callFunctionInfos);

    const icObjectFunctionCaller: Rust = generateIcObjectFunctionCaller();
    const icObjectFunctionCanisterBalance: Rust = generateIcObjectFunctionCanisterBalance();
    const icObjectFunctionId: Rust = generateIcObjectFunctionId();
    const icObjectFunctionPrint: Rust = generateIcObjectFunctionPrint();
    const icObjectFunctionTime: Rust = generateIcObjectFunctionTime();
    const icObjectFunctionTrap: Rust = generateIcObjectFunctionTrap();

    const azleIntoJsValueTrait: Rust = generateAzleIntoJsValueTrait();
    const azleTryFromJsValueTrait: Rust = generateAzleTryFromJsValueTrait();

    return `
        ${head}

        ${modifiedRustCandidTypes}

        ${azleIntoJsValueTrait}
        ${azleTryFromJsValueTrait}

        ${canisterMethodInit}
        ${canisterMethodPreUpgrade}
        ${canisterMethodPostUpgrade}
        ${canisterMethodHeartbeat}
        ${canisterMethodsDeveloperDefined}

        ${handleGeneratorResultFunction}

        ${icObjectFunctionCaller}
        ${icObjectFunctionCanisterBalance}
        ${icObjectFunctionId}
        ${icObjectFunctionPrint}
        ${icObjectFunctionTime}
        ${icObjectFunctionTrap}

        ${callFunctionInfos.map((callFunctionInfo) => callFunctionInfo.text).join('\n')}
    `;
}