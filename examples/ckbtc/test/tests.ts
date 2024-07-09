import { ActorSubclass } from '@dfinity/agent';
import { expect, it, please, Test, wait } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from '../wallet/frontend/dfx_generated/wallet_backend/wallet_backend.did';
import { Config } from './test';

let firstDepositAddress: string;

export function getTests(configs: Config[]): Test {
    return () => {
        it('gets balance for first identity', async () => {
            await testGetBalance(configs[0].canister, 0n);
        });

        it('gets balance for second identity', async () => {
            await testGetBalance(configs[1].canister, 0n);
        });

        it('gets deposit address for first address', async () => {
            firstDepositAddress = await configs[0].canister.getDepositAddress();

            expect(firstDepositAddress).toHaveLength(44);
        });

        it('gets deposit address for second address', async () => {
            const depositAddress =
                await configs[1].canister.getDepositAddress();

            expect(depositAddress).toHaveLength(44);
        });

        please('mint BTC', async () => {
            execSync(`npm run mint --address=${firstDepositAddress}`);
        });

        wait('for transactions to settle', 60_000);

        it('updates balance for first identity', async () => {
            const updateBalanceResult =
                await configs[0].canister.updateBalance();

            expect(updateBalanceResult).not.toHaveProperty('Err');
            expect(updateBalanceResult).toHaveProperty('Ok');
        });

        it('fails to update balance for second identity without new utxos', async () => {
            const updateBalanceResult =
                await configs[1].canister.updateBalance();

            expect(updateBalanceResult).toStrictEqual({
                Err: {
                    NoNewUtxos: {
                        required_confirmations: 1,
                        current_confirmations: []
                    }
                }
            });
        });

        it('gets balance for first identity', async () => {
            await testGetBalance(configs[0].canister, 4_999_999_000n);
        });

        it('gets balance for second identity', async () => {
            await testGetBalance(configs[1].canister, 0n);
        });

        it('transfers 1_000_000_000n from first canister to second canister', async () => {
            const transferResult = await configs[0].canister.transfer(
                configs[1].caller,
                1_000_000_000n
            );

            expect(transferResult).not.toHaveProperty('Err');
            expect(transferResult).toStrictEqual({ Ok: 1n });
        });

        it('gets balance for first identity after transfer', async () => {
            await testGetBalance(configs[0].canister, 3_999_999_000n);
        });

        it('gets balance for second identity after transfer', async () => {
            await testGetBalance(configs[1].canister, 1_000_000_000n);
        });
    };
}

async function testGetBalance(
    canister: ActorSubclass<_SERVICE>,
    expectedBalance: bigint
): Promise<void> {
    const balance = await canister.getBalance();
    expect(balance).toBe(expectedBalance);
}
