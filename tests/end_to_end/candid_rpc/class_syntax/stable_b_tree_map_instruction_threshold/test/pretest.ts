import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(
        join('examples', 'stable_b_tree_map_instruction_threshold')
    );

    execSync(
        `dfx canister uninstall-code stable_b_tree_map_instruction_threshold || true`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx deploy stable_b_tree_map_instruction_threshold`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate stable_b_tree_map_instruction_threshold`, {
        stdio: 'inherit'
    });
}

pretest();
