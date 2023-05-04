import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';
import {
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_RUST_DIR,
    GLOBAL_AZLE_TARGET_DIR,
    time
} from './utils';

export function installRustDependencies(
    azleVersion: string,
    rustVersion: string
) {
    if (isWasm32TargetInstalled()) {
        return;
    }

    time('[0/2] 🏗️  Preparing prerequisites...', 'inline', () => {
        const installRustDependenciesPath = resolve(
            __dirname,
            '../../install_rust_dependencies.sh'
        );

        execSync(
            `"${installRustDependenciesPath}" ${azleVersion} ${rustVersion}`,
            {
                stdio: 'inherit'
            }
        );
    });
}

function isWasm32TargetInstalled(): boolean {
    if (existsSync(`${GLOBAL_AZLE_BIN_DIR}/rustup`)) {
        try {
            const stdout = execSync(
                `${GLOBAL_AZLE_BIN_DIR}/rustup target list`,
                {
                    encoding: 'utf-8',
                    env: {
                        ...process.env,
                        CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                        CARGO_HOME: GLOBAL_AZLE_RUST_DIR,
                        RUSTUP_HOME: GLOBAL_AZLE_RUST_DIR
                    }
                }
            );
            return stdout.includes('wasm32-unknown-unknown (installed)');
        } catch (error) {
            console.error(`execSync error: ${error}`);
            return false;
        }
    } else {
        return false;
    }
}
