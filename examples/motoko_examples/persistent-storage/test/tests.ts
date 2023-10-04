import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/persistent_storage/persistent_storage.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    persistentStorageCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'increment',
            test: async () => {
                const result = await persistentStorageCanister.increment();
                return {
                    Ok: result === 1n
                };
            }
        },
        {
            name: 'reset',
            test: async () => {
                const result = await persistentStorageCanister.reset();
                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'increment',
            test: async () => {
                const result = await persistentStorageCanister.increment();
                return {
                    Ok: result === 1n
                };
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
                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'get',
            test: async () => {
                const result = await persistentStorageCanister.get();
                return {
                    Ok: result === 1n
                };
            }
        }
    ];
}
