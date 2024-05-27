import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../src/declarations/minimal_dapp/minimal_dapp.did';

export function getTests(counterCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'init get count',
            test: async () => {
                const result = await counterCanister.getCount();

                return testEquality(result, 0n);
            }
        },
        {
            name: 'first increment',
            test: async () => {
                const result = await counterCanister.count();

                return testEquality(result, 1n);
            }
        },
        {
            name: 'second increment',
            test: async () => {
                const result = await counterCanister.count();

                return testEquality(result, 2n);
            }
        },
        {
            name: 'get count',
            test: async () => {
                const result = await counterCanister.getCount();

                return testEquality(result, 2n);
            }
        },
        {
            name: 'reset',
            test: async () => {
                const result = await counterCanister.reset();

                return testEquality(result, 0n);
            }
        },
        {
            name: 'get count after reset',
            test: async () => {
                const result = await counterCanister.getCount();

                return testEquality(result, 0n);
            }
        },
        {
            name: 'increment after reset',
            test: async () => {
                const result = await counterCanister.count();

                return testEquality(result, 1n);
            }
        },
        {
            name: 'get count after first increment after reset',
            test: async () => {
                const result = await counterCanister.getCount();

                return testEquality(result, 1n);
            }
        }
    ];
}
