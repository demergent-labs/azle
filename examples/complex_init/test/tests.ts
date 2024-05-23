import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE as _COMPLEX_SERVICE } from './dfx_generated/complex_init/complex_init.did';
// @ts-ignore
import { _SERVICE as _REC_SERVICE } from './dfx_generated/rec_init/rec_init.did';

export function get_tests(
    complex_init_canister: ActorSubclass<_COMPLEX_SERVICE>
): Test[] {
    return [
        {
            name: 'get_user',
            test: async () => {
                const result = await complex_init_canister.greetUser();

                return testEquality(result, 'Oh hello there user 1');
            }
        }
    ];
}

export function get_rec_tests(
    rec_init_canister: ActorSubclass<_REC_SERVICE>
): Test[] {
    return [
        {
            name: 'count branches',
            test: async () => {
                const result = await rec_init_canister.countBranches();

                return testEquality(result, 1n);
            }
        }
    ];
}
