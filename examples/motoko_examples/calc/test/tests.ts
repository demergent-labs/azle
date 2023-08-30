import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/calc/calc.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(calcCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'add 5',
            test: async () => {
                const result = await calcCanister.add(5n);

                return {
                    Ok: result === 5n
                };
            }
        },
        {
            name: 'sub 2',
            test: async () => {
                const result = await calcCanister.sub(2n);

                return {
                    Ok: result === 3n
                };
            }
        },
        {
            name: 'mul 6',
            test: async () => {
                const result = await calcCanister.mul(6n);

                return {
                    Ok: result === 18n
                };
            }
        },
        {
            name: 'div 2',
            test: async () => {
                const result = await calcCanister.div(2n);

                return {
                    Ok: result.length === 1 && result[0] === 9n
                };
            }
        },
        {
            name: 'clearall',
            test: async () => {
                const result = await calcCanister.clearall();

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'add 0',
            test: async () => {
                const result = await calcCanister.add(0n);

                return {
                    Ok: result === 0n
                };
            }
        }
    ];
}
