import { execSync } from 'child_process';

async function pretest() {
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
