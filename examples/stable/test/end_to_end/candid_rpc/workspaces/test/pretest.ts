import { execSync } from 'child_process';

import { CANISTERS } from './canisters';

function pretest(): void {
    for (const canister of CANISTERS) {
        execSync(
            `cd ${canister.path} && dfx canister uninstall-code ${canister.name} || true`,
            {
                stdio: 'inherit'
            }
        );
    }
}

pretest();
