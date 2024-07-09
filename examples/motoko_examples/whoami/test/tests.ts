import { ActorSubclass, SignIdentity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/dfx';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/whoami/whoami.did';

function createIdentity(seed: number): SignIdentity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}

export const canisterId = getCanisterId('whoami');
const canisterPrincipal = Principal.fromText(canisterId);

const installationPrincipal = Principal.fromText(
    execSync(`dfx identity get-principal`).toString().trim()
);

export const callingIdentity = createIdentity(1);
const callingPrincipal = callingIdentity.getPrincipal();

const someoneIdentity = createIdentity(2);
export const someonePrincipal = someoneIdentity.getPrincipal();

export function getTests(
    whoamiCanister: ActorSubclass<_SERVICE>,
    canisterName: string
): Test {
    return () => {
        it('gets the principal of the canister that installed this canister', async () => {
            const result = await whoamiCanister.installer();

            expect(result).toEqual(installationPrincipal);
        });

        it('gets the principal that was provided as an init argument', async () => {
            const result = await whoamiCanister.argument();

            expect(result).toEqual(someonePrincipal);
        });

        it('gets the principal of the caller of this method', async () => {
            const result = await whoamiCanister.whoami();

            expect(result).toEqual(callingPrincipal);
        });

        it('gets the principal of this canister via cross canister call', async () => {
            const result = await whoamiCanister.id();

            expect(result).toEqual(canisterPrincipal);
        });

        it('gets the principal of this canister via ic object', async () => {
            const result = await whoamiCanister.idQuick();

            expect(result).toEqual(canisterPrincipal);
        });

        please('redeploy the canister', async () => {
            execSync(
                `dfx deploy --upgrade-unchanged ${canisterName} --argument '(principal "${callingPrincipal}")'`,
                {
                    stdio: 'inherit'
                }
            );
        });

        it('gets the principal that was provided as a postUpgrade argument', async () => {
            const result = await whoamiCanister.argument();

            expect(result).toEqual(callingPrincipal);
        });
        // TODO: To make this test really robust, we would use a different identity
        // when re-deploying the canister. Then we would assert that
        // `whoamiCanister.installer()` returns the new installer's principal.
    };
}
