import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE } from './dfx_generated/counter/counter.did';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'get',
            test: async () => {
                const result = await counterCanister.get();

                return testEquality(result, 0n);
            }
        },
        {
            name: 'set',
            test: async () => {
                const result = await counterCanister.set(10n);

                return testEquality(result, undefined);
            }
        },
        {
            name: 'inc',
            test: async () => {
                const result = await counterCanister.inc();

                return testEquality(result, undefined);
            }
        },
        {
            name: 'inc',
            test: async () => {
                const result = await counterCanister.inc();

                return testEquality(result, undefined);
            }
        },
        {
            name: 'get',
            test: async () => {
                const result = await counterCanister.get();

                return testEquality(result, 12n);
            }
        }
    ];
}
