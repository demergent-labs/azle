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
import {
    JavaScript,
    Rust
} from '../../../types';
import * as tsc from 'typescript';

export async function generateLibFile(
    js: JavaScript,
    rustCandidTypes: Rust,
    queryMethodFunctionNames: string[],
    updateMethodFunctionNames: string[]
): Promise<Rust> {
    // TODO we need to do a temporary hack on rustCandidTypes to fix this: https://github.com/demergent-labs/azle/issues/93
    // TODO just add serde::Serialize to the derive attribute on all structs and enums

    const head: Rust = generateHead();

    const canisterMethodInit = generateCanisterMethodInit(js);
    const canisterMethodPostUpgrade = generateCanisterMethodPostUpgrade();
    const canisterMethodsDeveloperDefined = await generateCanisterMethodsDeveloperDefined(
        rustCandidTypes,
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

        ${rustCandidTypes}

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