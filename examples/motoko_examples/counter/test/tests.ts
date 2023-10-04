import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/counter/counter.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'get',
            test: async () => {
                const result = await counterCanister.get();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'set',
            test: async () => {
                const result = await counterCanister.set(10n);

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'inc',
            test: async () => {
                const result = await counterCanister.inc();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'inc',
            test: async () => {
                const result = await counterCanister.inc();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'get',
            test: async () => {
                const result = await counterCanister.get();

                return {
                    Ok: result === 12n
                };
            }
        }
    ];
}
