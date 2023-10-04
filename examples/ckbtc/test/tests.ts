import { execSync } from 'child_process';
import { ActorSubclass } from '@dfinity/agent';
import { AzleResult, Test } from 'azle/test';
import { Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { getCanisterId } from 'azle/test';

import { _SERVICE } from '../wallet/frontend/dfx_generated/wallet_backend/wallet_backend.did';
import { createActor } from '../wallet/frontend/dfx_generated/wallet_backend';

type Config = {
    identity: Identity;
    canister: ActorSubclass<_SERVICE>;
    caller: string;
    depositAddress: string;
};

let db: Config[] = [];

export function getTests(): Test[] {
    return [
        {
            name: 'Create Identities',
            prep: async () => {
                db = [createConfig(1), createConfig(2)];

                console.log(`0 | ${db[0].caller}`);
                console.log(`1 | ${db[1].caller}\n`);
            }
        },
        {
            name: 'getBalance',
            test: async () => {
                return testGetBalance(0, 0n);
            }
        },
        {
            name: 'getBalance',
            test: async () => {
                return testGetBalance(1, 0n);
            }
        },
        {
            name: 'getDepositAddress',
            test: async () => {
                let config = db[0];

                config.depositAddress =
                    await config.canister.getDepositAddress();

                return { Ok: config.depositAddress.length === 44 };
            }
        },
        {
            name: 'getDepositAddress',
            test: async () => {
                let config = db[1];

                config.depositAddress =
                    await config.canister.getDepositAddress();

                return { Ok: config.depositAddress.length === 44 };
            }
        },
        {
            name: 'mint BTC',
            prep: async () => {
                execSync(`npm run mint --address=${db[0].depositAddress}`);
            }
        },
        {
            name: 'wait for transactions to settle',
            wait: 60_000
        },
        {
            name: 'updateBalance',
            test: async () => {
                const config = db[0];

                const updateBalanceResult =
                    await config.canister.updateBalance();

                if ('Err' in updateBalanceResult) {
                    return { Err: Object.keys(updateBalanceResult.Err)[0] };
                }

                const okValue = updateBalanceResult.Ok;

                return { Ok: true };
            }
        },
        {
            name: 'updateBalance',
            test: async () => {
                const config = db[1];

                const updateBalanceResult =
                    await config.canister.updateBalance();

                if ('Err' in updateBalanceResult) {
                    const errorType = Object.keys(updateBalanceResult.Err)[0];

                    return { Ok: errorType === 'NoNewUtxos' };
                }
                return {
                    Err: `Expected principal ${config.caller} to not have new UTXOs`
                };
            }
        },
        {
            name: 'getBalance',
            test: async () => {
                return testGetBalance(0, 4_999_999_000n);
            }
        },
        {
            name: 'getBalance',
            test: async () => {
                return testGetBalance(1, 0n);
            }
        },
        {
            name: 'transfer',
            test: async () => {
                const config = db[0];

                const tranferResult = await config.canister.transfer(
                    db[1].caller,
                    1_000_000_000n
                );

                if ('Err' in tranferResult) {
                    return { Err: Object.keys(tranferResult.Err)[0] };
                }

                const transferIndex = tranferResult.Ok;
                return { Ok: transferIndex === 1n };
            }
        },
        {
            name: 'getBalance',
            test: async () => {
                return testGetBalance(0, 3_999_999_000n);
            }
        },
        {
            name: 'getBalance',
            test: async () => {
                return testGetBalance(1, 1_000_000_000n);
            }
        }
    ];
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
): Promise<AzleResult<boolean, string>> {
    const config = db[account];
    const balance = await config.canister.getBalance();
    return { Ok: balance === expectedBalance };
}
