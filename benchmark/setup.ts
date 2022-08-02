import { execSync } from 'child_process';

export async function run_setup(argument?: string) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister create azle`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create motoko`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister create rust`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code azle || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code motoko || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code rust || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx build azle`, {
        stdio: 'inherit'
    });

    const argFlag = argument === undefined ? '' : `--argument ${argument}`;

    execSync(
        `dfx canister install azle ${argFlag} --wasm target/wasm32-unknown-unknown/release/azle.wasm.gz`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx deploy motoko ${argFlag}`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy rust ${argFlag}`, {
        stdio: 'inherit'
    });
}
