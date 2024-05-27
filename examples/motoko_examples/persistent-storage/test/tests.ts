import { ActorSubclass } from '@dfinity/agent';
import { Test, test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/persistent_storage/persistent_storage.did';

export function getTests(
    persistentStorageCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'increment',
            test: async () => {
                const result = await persistentStorageCanister.increment();

                return testEquality(result, 1n);
            }
        },
        {
            name: 'reset',
            test: async () => {
                const result = await persistentStorageCanister.reset();

                return testEquality(result, 0n);
            }
        },
        {
            name: 'increment',
            test: async () => {
                const result = await persistentStorageCanister.increment();

                return testEquality(result, 1n);
            }
        },
        {
            name: 'deploy',
            prep: async () => {
                execSync(`dfx deploy --upgrade-unchanged`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'getRedeployed',
            test: async () => {
                const result = await persistentStorageCanister.getRedeployed();

                return test(result);
            }
        },
        {
            name: 'get',
            test: async () => {
                const result = await persistentStorageCanister.get();

                return testEquality(result, 1n);
            }
        }
    ];
}
