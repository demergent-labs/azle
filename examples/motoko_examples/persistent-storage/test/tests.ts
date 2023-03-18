import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
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
        // TODO: upgrade to DFX v0.10.x
        // {
        //     name: 'deploy (upgrade)',
        //     prep: async () => {
        //         execSync(`dfx deploy --upgrade-unchanged`, {
        //             stdio: 'inherit'
        //         });
        //     }
        // },
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
