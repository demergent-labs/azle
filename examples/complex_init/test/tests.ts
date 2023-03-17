import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/complex_init/complex_init.did';

export function get_tests(
    complex_init_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_user',
            test: async () => {
                const result = await complex_init_canister.greetUser();

                return {
                    Ok: result === 'Oh hello there user 1'
                };
            }
        }
    ];
}
