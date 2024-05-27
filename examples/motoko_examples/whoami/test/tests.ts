import { ActorSubclass } from '@dfinity/agent';
import { SignIdentity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { getCanisterId } from 'azle/dfx';
import { Test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/whoami/whoami.did';

function createIdentity(seed: number): SignIdentity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}

export const canisterId = getCanisterId('whoami');

const installationPrincipal = execSync(`dfx identity get-principal`)
    .toString()
    .trim();

export const callingIdentity = createIdentity(1);
const callingPrincipal = callingIdentity.getPrincipal().toString();

const someoneIdentity = createIdentity(2);
export const someonePrincipal = someoneIdentity.getPrincipal().toString();

export function getTests(
    whoamiCanister: ActorSubclass<_SERVICE>,
    canisterName: string
): Test[] {
    return [
        {
            name: 'installer',
            test: async () => {
                const result = await whoamiCanister.installer();

                return testEquality(result.toString(), installationPrincipal);
            }
        },
        {
            name: 'argument',
            test: async () => {
                const result = await whoamiCanister.argument();

                return testEquality(result.toString(), someonePrincipal);
            }
        },
        {
            name: 'whoami',
            test: async () => {
                const result = await whoamiCanister.whoami();

                return testEquality(result.toString(), callingPrincipal);
            }
        },
        {
            name: 'id',
            test: async () => {
                const result = await whoamiCanister.id();

                return testEquality(result.toString(), canisterId);
            }
        },
        {
            name: 'idQuick',
            test: async () => {
                const result = await whoamiCanister.idQuick();

                return testEquality(result.toString(), canisterId);
            }
        },
        {
            name: 'redeploy',
            prep: async () => {
                execSync(
                    `dfx deploy --upgrade-unchanged ${canisterName} --argument '(principal "${callingPrincipal}")'`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: 'updated argument',
            test: async () => {
                const result = await whoamiCanister.argument();

                return testEquality(result.toString(), callingPrincipal);
            }
        }
        // TODO: To make this test really robust, we would use a different identity
        // when re-deploying the canister. Then we would assert that
        // `whoamiCanister.installer()` returns the new installer's principal.
    ];
}
