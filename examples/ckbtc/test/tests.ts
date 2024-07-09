import { ActorSubclass } from '@dfinity/agent';
import { Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { getCanisterId } from 'azle/dfx';
import { expect, it, please, Test, wait } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore
import { createActor } from '../wallet/frontend/dfx_generated/wallet_backend';
// @ts-ignore
import { _SERVICE } from '../wallet/frontend/dfx_generated/wallet_backend/wallet_backend.did';

type Config = {
    identity: Identity;
    canister: ActorSubclass<_SERVICE>;
    caller: string;
    depositAddress: string;
};

let db: Config[] = [];

export function getTests(): Test {
    return () => {
        please('create Identities', async () => {
            db = [createConfig(1), createConfig(2)];

            console.info(`0 | ${db[0].caller}`);
            console.info(`1 | ${db[1].caller}\n`);
        });

        it('gets balance for first identity', async () => {
            return testGetBalance(0, 0n);
        });

        it('gets balance for second identity', async () => {
            return testGetBalance(1, 0n);
        });

        it('gets deposit address for second address', async () => {
            let config = db[0];

            config.depositAddress = await config.canister.getDepositAddress();

            expect(config.depositAddress).toHaveLength(44);
        });

        it('gets deposit address for second address', async () => {
            let config = db[1];

            config.depositAddress = await config.canister.getDepositAddress();

            expect(config.depositAddress).toHaveLength(44);
        });

        please('mint BTC', async () => {
            execSync(`npm run mint --address=${db[0].depositAddress}`);
        });

        wait('for transactions to settle', 60_000);

        it('updates balance for first identity', async () => {
            const config = db[0];

            const updateBalanceResult = await config.canister.updateBalance();

            expect(updateBalanceResult).not.toHaveProperty('Err');
        });

        it('fails to update balance for second identity without new utxos', async () => {
            const config = db[1];

            const updateBalanceResult = await config.canister.updateBalance();

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
            return testGetBalance(0, 4_999_999_000n);
        });

        it('gets balance for second identity', async () => {
            return testGetBalance(1, 0n);
        });

        it('transfers 1_000_000_000n from first canister to second canister', async () => {
            const config = db[0];

            const transferResult = await config.canister.transfer(
                db[1].caller,
                1_000_000_000n
            );

            expect(transferResult).not.toHaveProperty('Err');
            expect(transferResult).toStrictEqual({ Ok: 1n });
        });

        it('gets balance for first identity after transfer', async () => {
            return testGetBalance(0, 3_999_999_000n);
        });

        it('gets balance for second identity after transfer', async () => {
            return testGetBalance(1, 1_000_000_000n);
        });
    };
}

function createIdentity(seed: number): Identity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}

function createConfig(id: number): Config {
    const walletBackendCanisterId = getCanisterId('wallet_backend');

    const identity = createIdentity(id);
    const canister = createActor(walletBackendCanisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            identity: identity
        }
    });
    const caller = identity.getPrincipal().toText();

    return { identity, canister, caller, depositAddress: '' };
}

async function testGetBalance(
    account: number,
    expectedBalance: bigint
): Promise<void> {
    const config = db[account];
    const balance = await config.canister.getBalance();
    expect(balance).toBe(expectedBalance);
}
