import { generateCanisterMethodsDeveloperDefined } from './canister_methods/developer_defined';
import { generateCanisterMethodInit } from './canister_methods/init';
import { generateCanisterMethodPostUpgrade } from './canister_methods/post_upgrade';
import { generateHead } from './head';
import { generateIcObjectFunctionCaller } from './ic_object/functions/caller';
import { generateIcObjectFunctionCanisterBalance } from './ic_object/functions/canister_balance';
import { generateIcObjectFunctionId } from './ic_object/functions/id';
import { generateIcObjectFunctionPrint } from './ic_object/functions/print';
import { generateIcObjectFunctionRawRand } from './ic_object/functions/raw_rand';
import { generateIcObjectFunctionTime } from './ic_object/functions/time';
import { generateIcObjectFunctionTrap } from './ic_object/functions/trap';
import { modifyRustCandidTypes } from './modified_rust_candid_types';
import {
    JavaScript,
    Rust
} from '../../../types';

export async function generateLibFile(
    js: JavaScript,
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Promise<Rust> {
    const modifiedRustCandidTypes: Rust = await modifyRustCandidTypes(rustCandidTypes);

    const head: Rust = generateHead();

    const canisterMethodInit = generateCanisterMethodInit(js);
    const canisterMethodPostUpgrade = generateCanisterMethodPostUpgrade();
    const canisterMethodsDeveloperDefined = await generateCanisterMethodsDeveloperDefined(
        rustCandidTypes, // TODO you might think that we should pass in modifiedRustCandidTypes here, but the printAst function seems to have a bug that removes the , from the CallResult tuple which causes problems later in the process
        queryMethodFunctionNames,
        updateMethodFunctionNames
    );

    const icObjectFunctionCaller = generateIcObjectFunctionCaller();
    const icObjectFunctionCanisterBalance = generateIcObjectFunctionCanisterBalance();
    const icObjectFunctionId = generateIcObjectFunctionId();
    const icObjectFunctionPrint = generateIcObjectFunctionPrint();
    const icObjectFunctionRawRand = generateIcObjectFunctionRawRand();
    const icObjectFunctionTime = generateIcObjectFunctionTime();
    const icObjectFunctionTrap = generateIcObjectFunctionTrap();

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
        ${icObjectFunctionRawRand}
        ${icObjectFunctionTime}
        ${icObjectFunctionTrap}
    `;
}