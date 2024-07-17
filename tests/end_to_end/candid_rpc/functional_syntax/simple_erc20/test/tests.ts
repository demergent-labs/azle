import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/simple_erc20/simple_erc20.did';

export function getTests(simpleErc20Canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('empty name', async () => {
            const result = await simpleErc20Canister.name();

            expect(result).toBe('');
        });

        it('empty ticker', async () => {
            const result = await simpleErc20Canister.ticker();

            expect(result).toBe('');
        });

        it('empty totalSupply', async () => {
            const result = await simpleErc20Canister.totalSupply();

            expect(result).toBe(0n);
        });

        it('empty balance of id 0', async () => {
            const result = await simpleErc20Canister.balance('0');

            expect(result).toBe(0n);
        });

        it('initializeSupply', async () => {
            const result = await simpleErc20Canister.initializeSupply(
                'Token',
                '0',
                'TOKEN',
                1_000_000n
            );

            expect(result).toBe(true);
        });

        it('initialized name', async () => {
            const result = await simpleErc20Canister.name();

            expect(result).toBe('Token');
        });

        it('initialized ticker', async () => {
            const result = await simpleErc20Canister.ticker();

            expect(result).toBe('TOKEN');
        });

        it('initialized totalSupply', async () => {
            const result = await simpleErc20Canister.totalSupply();

            expect(result).toBe(1_000_000n);
        });

        it('initialized balance of id 0', async () => {
            const result = await simpleErc20Canister.balance('0');

            expect(result).toBe(1_000_000n);
        });

        it('transfer', async () => {
            const result = await simpleErc20Canister.transfer('0', '1', 100n);

            expect(result).toBe(true);
        });

        it('balance of id 0 after transfer', async () => {
            const result = await simpleErc20Canister.balance('0');

            expect(result).toBe(999_900n);
        });

        it('balance of id 1 after transfer', async () => {
            const result = await simpleErc20Canister.balance('1');

            expect(result).toBe(100n);
        });
    };
}
