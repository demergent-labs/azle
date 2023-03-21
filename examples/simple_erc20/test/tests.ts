import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/simple_erc20/simple_erc20.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(simpleErc20Canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'empty name',
            test: async () => {
                const result = await simpleErc20Canister.name();

                return {
                    Ok: result === ''
                };
            }
        },
        {
            name: 'empty ticker',
            test: async () => {
                const result = await simpleErc20Canister.ticker();

                return {
                    Ok: result === ''
                };
            }
        },
        {
            name: 'empty totalSupply',
            test: async () => {
                const result = await simpleErc20Canister.totalSupply();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'empty balance of id 0',
            test: async () => {
                const result = await simpleErc20Canister.balance('0');

                return {
                    Ok: result === 0n
                };
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

                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'initialized name',
            test: async () => {
                const result = await simpleErc20Canister.name();

                return {
                    Ok: result === 'Token'
                };
            }
        },
        {
            name: 'initialized ticker',
            test: async () => {
                const result = await simpleErc20Canister.ticker();

                return {
                    Ok: result === 'TOKEN'
                };
            }
        },
        {
            name: 'initialized totalSupply',
            test: async () => {
                const result = await simpleErc20Canister.totalSupply();

                return {
                    Ok: result === 1_000_000n
                };
            }
        },
        {
            name: 'initialized balance of id 0',
            test: async () => {
                const result = await simpleErc20Canister.balance('0');

                return {
                    Ok: result === 1_000_000n
                };
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

                return {
                    Ok: result === true
                };
            }
        },
        {
            name: 'balance of id 0 after transfer',
            test: async () => {
                const result = await simpleErc20Canister.balance('0');

                return {
                    Ok: result === 999_900n
                };
            }
        },
        {
            name: 'balance of id 1 after transfer',
            test: async () => {
                const result = await simpleErc20Canister.balance('1');

                return {
                    Ok: result === 100n
                };
            }
        }
    ];
}
