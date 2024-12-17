import { execSync } from 'child_process';

execSync(`dfx canister uninstall-code cert-var || true`, {
    stdio: 'inherit'
});

execSync(`dfx deploy`, {
    stdio: 'inherit'
});

execSync(`dfx generate`, {
    stdio: 'inherit'
});
