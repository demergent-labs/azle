import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/compiler_errors/compiler_errors.did';

export function get_tests(
    compiler_errors_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'blank test',
            test: async () => {
                return {
                    ok: true
                };
            }
        }
    ];
}
