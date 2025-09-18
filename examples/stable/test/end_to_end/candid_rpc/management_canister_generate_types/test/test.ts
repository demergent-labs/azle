import { getTests } from '@azle/management_canister/test/tests';
import { getCanisterId } from 'azle/_internal/dfx';
import { expect, it, runTests } from 'azle/_internal/test';
import { readFileSync } from 'fs';

import { createActor } from './dfx_generated/management_canister';

const canisterName = 'management_canister';
const managementCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(() => {
    // TODO the as any can be removed once we get rid of the experimental APIs
    // TODO and move the tests into management_canister
    // TODO The error comes from generating the IDL types with the experimental canister APIs
    // TODO which I assume are out of date or incompatible with the newest version of dfx 0.25.0
    getTests(managementCanister as any)();

    it('should have generated a src/idl/management.ts file identical to azle/canisters/management/idl/index.ts', async () => {
        const generatedContent = readFileSync('src/idl/management.ts', 'utf-8');

        const referenceContent = readFileSync(
            '../../../../../../src/stable/lib/canisters/management/idl/index.ts',
            'utf-8'
        );

        expect(generatedContent).toBe(referenceContent);
    });
});
