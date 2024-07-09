import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

import { _SERVICE as _COMPLEX_SERVICE } from './dfx_generated/complex_init/complex_init.did';
// @ts-ignore
import { _SERVICE as _REC_SERVICE } from './dfx_generated/rec_init/rec_init.did';

export function getTests(
    complex_init_canister: ActorSubclass<_COMPLEX_SERVICE>
): Test {
    return () => {
        it('accepts a simple type as an argument for the init method', async () => {
            const result = await complex_init_canister.greetUser();

            expect(result).toBe('Oh hello there user 1');
        });
    };
}

export function getRecTests(
    rec_init_canister: ActorSubclass<_REC_SERVICE>
): Test {
    return () => {
        it('accepts a recursive structure as an argument for the init method', async () => {
            const result = await rec_init_canister.countBranches();

            expect(result).toBe(1n);
        });
    };
}
