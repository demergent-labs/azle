import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';
import { execSync } from 'child_process';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { SignIdentity } from '@dfinity/agent';

function createIdentity(seed: number): SignIdentity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}

export const canisterId = 'rrkah-fqaaa-aaaaa-aaaaq-cai';

const installationPrincipal = execSync(`dfx identity get-principal`)
    .toString()
    .trim();

export const callingIdentity = createIdentity(1);
const callingPrincipal = callingIdentity.getPrincipal().toString();

const someoneIdentity = createIdentity(2);
export const someonePrincipal = someoneIdentity.getPrincipal().toString();

export function get_tests(whoami_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'installer',
            test: async () => {
                const result = await whoami_canister.installer();

                return {
                    ok: result.toString() === installationPrincipal
                };
            }
        },
        {
            name: 'argument',
            test: async () => {
                const result = await whoami_canister.argument();

                return {
                    ok: result.toString() === someonePrincipal
                };
            }
        },
        {
            name: 'whoami',
            test: async () => {
                const result = await whoami_canister.whoami();

                return {
                    ok: result.toString() === callingPrincipal
                };
            }
        },
        {
            name: 'id',
            test: async () => {
                const result = await whoami_canister.id();

                return {
                    ok: result.toString() === canisterId
                };
            }
        },
        {
            name: 'id_quick',
            test: async () => {
                const result = await whoami_canister.id_quick();

                return {
                    ok: result.toString() === canisterId
                };
            }
        },
        {
            name: 'redeploy',
            prep: async () => {
                execSync(
                    `dfx deploy azle --argument '(principal "${callingPrincipal}")'`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: 'updated argument',
            test: async () => {
                const result = await whoami_canister.argument();

                return {
                    ok: result.toString() === callingPrincipal
                };
            }
        }
        // TODO: To make this test really robust, we would use a different identity
        // when re-deploying the canister. Then we would assert that
        // `whoami_canister.installer()` returns the new installer's principal.
    ];
}
