import { ActorSubclass } from '@dfinity/agent';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';
import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { _SERVICE as Actor } from './dfx_generated/caller/caller.did';
import { generateCanister } from './generate_canister';
import { pretest } from './pretest';

async function setupCanisters(): Promise<ActorSubclass<Actor>> {
    // Ensure directories exist
    await mkdir(dirname('src/canister/index.ts'), { recursive: true });

    const canisterCode = generateCanister('IDL.Text');
    await writeFile('src/canister/index.ts', canisterCode);

    pretest();

    return await getCanisterActor<Actor>('canister');
}

export function getTests(): Test {
    return () => {
        it('should always reply with the input in alwaysReplyQuery', async () => {
            await fc.assert(
                fc.asyncProperty(fc.string(), async (input) => {
                    const canister = await setupCanisters();
                    const result = await canister.alwaysReplyQuery(input);
                    expect(result).toBe(input);
                }),
                defaultPropTestParams
            );
        });
    };
}
