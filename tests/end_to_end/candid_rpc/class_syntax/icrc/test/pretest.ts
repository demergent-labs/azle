import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(icrcPath: string): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_syntax', 'icrc')
    );

    execSync(`dfx canister uninstall-code proxy || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code icrc || true`, {
        stdio: 'inherit'
    });

    execSync(
        `rm -rf ${icrcPath} && cd canisters && git clone https://github.com/dfinity/ICRC-1 && cd ICRC-1 && rm -rf .git`,
        {
            stdio: 'inherit'
        }
    );

    execSync(
        `dfx deploy --argument "($(cat params.did | tr -s '\n' ' '))" icrc --specified-id rrkah-fqaaa-aaaaa-aaaaq-cai`,
        {
            stdio: 'inherit'
        }
    );

    execSync(
        `ICRC_PRINCIPAL=rrkah-fqaaa-aaaaa-aaaaq-cai dfx deploy proxy --specified-id r7inp-6aaaa-aaaaa-aaabq-cai`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate proxy`, {
        stdio: 'inherit'
    });
}

pretest('canisters/ICRC-1');
