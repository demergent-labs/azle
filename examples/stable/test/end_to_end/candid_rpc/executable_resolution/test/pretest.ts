import { execSync } from 'child_process';

import { CANISTERS } from './canisters';

function pretest(): void {
    for (const canister of CANISTERS) {
        execSync(`dfx canister uninstall-code ${canister.name} || true`, {
            stdio: 'inherit',
            cwd: canister.dfxRoot
        });
    }
}

pretest();
