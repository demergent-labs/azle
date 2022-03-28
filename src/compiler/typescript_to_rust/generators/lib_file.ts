import { generateCanisterMethodsDeveloperDefined } from './canister_methods/developer_defined';
import { generateCanisterMethodInit } from './canister_methods/init';
import { generateCanisterMethodPostUpgrade } from './canister_methods/post_upgrade';
import { generateHead } from './head';
import { generateIcObjectFunctionCaller } from './ic_object/functions/caller';
import { generateIcObjectFunctionCanisterBalance } from './ic_object/functions/canister_balance';
import { generateIcObjectFunctionId } from './ic_object/functions/id';
import { generateIcObjectFunctionPrint } from './ic_object/functions/print';
import { generateIcObjectFunctionTime } from './ic_object/functions/time';
import { generateIcObjectFunctionTrap } from './ic_object/functions/trap';
import { modifyRustCandidTypes } from './modified_rust_candid_types';
import {
    JavaScript,
    Rust
} from '../../../types';
import { generateCallFunctions } from './call_functions';
import * as tsc from 'typescript';

export async function generateLibFile(
    js: JavaScript,
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[],
    sourceFiles: readonly tsc.SourceFile[]
): Promise<Rust> {
    const modifiedRustCandidTypes: Rust = await modifyRustCandidTypes(rustCandidTypes);

    const head: Rust = generateHead();

    const canisterMethodInit: Rust = generateCanisterMethodInit(js);
    const canisterMethodPostUpgrade: Rust = generateCanisterMethodPostUpgrade();
    const canisterMethodsDeveloperDefined: Rust = await generateCanisterMethodsDeveloperDefined(
        rustCandidTypes, // TODO you might think that we should pass in modifiedRustCandidTypes here, but the printAst function seems to have a bug that removes the , from the CallResult tuple which causes problems later in the process
        queryMethodFunctionNames,
        updateMethodFunctionNames
    );

    const icObjectFunctionCaller: Rust = generateIcObjectFunctionCaller();
    const icObjectFunctionCanisterBalance: Rust = generateIcObjectFunctionCanisterBalance();
    const icObjectFunctionId: Rust = generateIcObjectFunctionId();
    const icObjectFunctionPrint: Rust = generateIcObjectFunctionPrint();
    const icObjectFunctionTime: Rust = generateIcObjectFunctionTime();
    const icObjectFunctionTrap: Rust = generateIcObjectFunctionTrap();

    const callFunctions: Rust = generateCallFunctions(sourceFiles);

    return `
        ${head}

        ${modifiedRustCandidTypes}

        ${canisterMethodInit}
        ${canisterMethodPostUpgrade}
        ${canisterMethodsDeveloperDefined}

        ${icObjectFunctionCaller}
        ${icObjectFunctionCanisterBalance}
        ${icObjectFunctionId}
        ${icObjectFunctionPrint}
        ${icObjectFunctionTime}
        ${icObjectFunctionTrap}

        ${callFunctions}
    `;
}