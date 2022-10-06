import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(calc_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'add 5',
            test: async () => {
                const result = await calc_canister.add(5n);

                return {
                    ok: result === 5n
                };
            }
        },
        {
            name: 'sub 2',
            test: async () => {
                const result = await calc_canister.sub(2n);

                return {
                    ok: result === 3n
                };
            }
        },
        {
            name: 'mul 6',
            test: async () => {
                const result = await calc_canister.mul(6n);

                return {
                    ok: result === 18n
                };
            }
        },
        {
            name: 'div 2',
            test: async () => {
                const result = await calc_canister.div(2n);

                return {
                    ok: result.length === 1 && result[0] === 9n
                };
            }
        },
        {
            name: 'clearall',
            test: async () => {
                const result = await calc_canister.clearall();

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'add 0',
            test: async () => {
                const result = await calc_canister.add(0n);

                return {
                    ok: result === 0n
                };
            }
        }
    ];
}
