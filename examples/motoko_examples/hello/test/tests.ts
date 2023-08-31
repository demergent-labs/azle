import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/hello/hello.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(hello_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'greet',
            test: async () => {
                const result = await hello_canister.greet('everyone');

                return {
                    Ok: result === 'Hello, everyone!'
                };
            }
        },
        {
            name: 'greet nobody',
            test: async () => {
                const result = await hello_canister.greet('');

                return {
                    Ok: result === 'Hello, !'
                };
            }
        }
    ];
}
