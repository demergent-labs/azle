import { execSync } from 'child_process';

async function pretest(icrcPath: string) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

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
