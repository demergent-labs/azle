import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/simple_erc20/simple_erc20.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    simple_erc20_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'empty name',
            test: async () => {
                const result = await simple_erc20_canister.name();

                return {
                    ok: result === ''
                };
            }
        },
        {
            name: 'empty ticker',
            test: async () => {
                const result = await simple_erc20_canister.ticker();

                return {
                    ok: result === ''
                };
            }
        },
        {
            name: 'empty total_supply',
            test: async () => {
                const result = await simple_erc20_canister.total_supply();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'empty balance of id 0',
            test: async () => {
                const result = await simple_erc20_canister.balance('0');

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'initialize_supply',
            test: async () => {
                const result = await simple_erc20_canister.initialize_supply(
                    'Token',
                    '0',
                    'TOKEN',
                    1_000_000n
                );

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'initialized name',
            test: async () => {
                const result = await simple_erc20_canister.name();

                return {
                    ok: result === 'Token'
                };
            }
        },
        {
            name: 'initialized ticker',
            test: async () => {
                const result = await simple_erc20_canister.ticker();

                return {
                    ok: result === 'TOKEN'
                };
            }
        },
        {
            name: 'initialized total_supply',
            test: async () => {
                const result = await simple_erc20_canister.total_supply();

                return {
                    ok: result === 1_000_000n
                };
            }
        },
        {
            name: 'initialized balance of id 0',
            test: async () => {
                const result = await simple_erc20_canister.balance('0');

                return {
                    ok: result === 1_000_000n
                };
            }
        },
        {
            name: 'transfer',
            test: async () => {
                const result = await simple_erc20_canister.transfer(
                    '0',
                    '1',
                    100n
                );

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'balance of id 0 after transfer',
            test: async () => {
                const result = await simple_erc20_canister.balance('0');

                return {
                    ok: result === 999_900n
                };
            }
        },
        {
            name: 'balance of id 1 after transfer',
            test: async () => {
                const result = await simple_erc20_canister.balance('1');

                return {
                    ok: result === 100n
                };
            }
        }
    ];
}
