import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/hello/hello.did';

export function getTests(hello_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'greet',
            test: async () => {
                const result = await hello_canister.greet('everyone');

                return testEquality(result, 'Hello, everyone!');
            }
        },
        {
            name: 'greet nobody',
            test: async () => {
                const result = await hello_canister.greet('');

                return testEquality(result, 'Hello, !');
            }
        }
    ];
}
