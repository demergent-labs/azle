import { execSync } from 'child_process';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { SignIdentity } from '@dfinity/agent';

const someoneIdentity = createIdentity(2);
export const someonePrincipal = someoneIdentity.getPrincipal().toString();

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy azle --argument '(principal "${someonePrincipal}")'`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate azle`, {
        stdio: 'inherit'
    });
}

pretest();

function createIdentity(seed: number): SignIdentity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}
