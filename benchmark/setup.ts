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

    const arg_flag = argument === undefined ? '' : `--argument ${argument}`;

    execSync(`dfx deploy azle ${arg_flag}`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy motoko ${arg_flag}`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy rust ${arg_flag}`, {
        stdio: 'inherit'
    });
}
