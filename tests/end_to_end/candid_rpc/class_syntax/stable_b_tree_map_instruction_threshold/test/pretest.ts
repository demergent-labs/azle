import { execSync } from 'child_process';
import { join, resolve } from 'path';

async function pretest() {
    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(
        `cd ${join(
            azleDir,
            'examples',
            'stable_b_tree_map_instruction_threshold'
        )} && npm install`
    );

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(
            `cd ${join(
                azleDir,
                'examples',
                'stable_b_tree_map_instruction_threshold'
            )} && npm link azle`
        );
    }

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
