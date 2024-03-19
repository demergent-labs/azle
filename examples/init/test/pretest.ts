import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code init || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy init --argument '(record { id = "0" }, variant { Fire }, principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate init`, {
        stdio: 'inherit'
    });
}

pretest();
