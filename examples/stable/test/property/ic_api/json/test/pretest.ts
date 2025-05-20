import { execSync } from 'child_process';

execSync(`dfx canister uninstall-code canister || true`, {
    stdio: 'inherit'
});

execSync(`dfx deploy`, {
    stdio: 'inherit'
});

execSync(`dfx generate`, {
    stdio: 'inherit'
});
