import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE } from './dfx_generated/calc/calc.did';

export function getTests(calcCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'add 5',
            test: async () => {
                const result = await calcCanister.add(5n);

                return testEquality(result, 5n);
            }
        },
        {
            name: 'sub 2',
            test: async () => {
                const result = await calcCanister.sub(2n);

                return testEquality(result, 3n);
            }
        },
        {
            name: 'mul 6',
            test: async () => {
                const result = await calcCanister.mul(6n);

                return testEquality(result, 18n);
            }
        },
        {
            name: 'div 2',
            test: async () => {
                const result = await calcCanister.div(2n);

                return testEquality(result, [9n]);
            }
        },
        {
            name: 'clearall',
            test: async () => {
                const result = await calcCanister.clearall();

                return testEquality(result, undefined);
            }
        },
        {
            name: 'add 0',
            test: async () => {
                const result = await calcCanister.add(0n);

                return testEquality(result, 0n);
            }
        }
    ];
}
