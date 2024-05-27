import { ActorSubclass } from '@dfinity/agent';
import { Test, test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/simple_erc20/simple_erc20.did';

export function getTests(simpleErc20Canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'empty name',
            test: async () => {
                const result = await simpleErc20Canister.name();

                return testEquality(result, '');
            }
        },
        {
            name: 'empty ticker',
            test: async () => {
                const result = await simpleErc20Canister.ticker();

                return testEquality(result, '');
            }
        },
        {
            name: 'empty totalSupply',
            test: async () => {
                const result = await simpleErc20Canister.totalSupply();

                return testEquality(result, 0n);
            }
        },
        {
            name: 'empty balance of id 0',
            test: async () => {
                const result = await simpleErc20Canister.balance('0');

                return testEquality(result, 0n);
            }
        },
        {
            name: 'initializeSupply',
            test: async () => {
                const result = await simpleErc20Canister.initializeSupply(
                    'Token',
                    '0',
                    'TOKEN',
                    1_000_000n
                );

                return testEquality(result, true);
            }
        },
        {
            name: 'initialized name',
            test: async () => {
                const result = await simpleErc20Canister.name();

                return testEquality(result, 'Token');
            }
        },
        {
            name: 'initialized ticker',
            test: async () => {
                const result = await simpleErc20Canister.ticker();

                return testEquality(result, 'TOKEN');
            }
        },
        {
            name: 'initialized totalSupply',
            test: async () => {
                const result = await simpleErc20Canister.totalSupply();

                return testEquality(result, 1_000_000n);
            }
        },
        {
            name: 'initialized balance of id 0',
            test: async () => {
                const result = await simpleErc20Canister.balance('0');

                return testEquality(result, 1_000_000n);
            }
        },
        {
            name: 'transfer',
            test: async () => {
                const result = await simpleErc20Canister.transfer(
                    '0',
                    '1',
                    100n
                );

                return test(result);
            }
        },
        {
            name: 'balance of id 0 after transfer',
            test: async () => {
                const result = await simpleErc20Canister.balance('0');

                return testEquality(result, 999_990n);
            }
        },
        {
            name: 'balance of id 1 after transfer',
            test: async () => {
                const result = await simpleErc20Canister.balance('1');

                return testEquality(result, 100n);
            }
        }
    ];
}
