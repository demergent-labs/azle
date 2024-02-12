import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { join } from 'path';

import { generateWorkspaceCargoToml } from './generate_cargo_toml_files';
import { JSCanisterConfig, Toml } from './utils/types';

export function prepareRustStagingArea(
    canisterConfig: JSCanisterConfig,
    canisterPath: string,
    canisterJavaScript: string
) {
    const workspaceCargoToml: Toml = generateWorkspaceCargoToml(
        canisterConfig.opt_level ?? '0'
    );

    rmSync(canisterPath, { recursive: true, force: true });
    mkdirSync(canisterPath, { recursive: true });

    writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

    // TODO not sure what to do about the cargo.lock
    // writeFileSync(`${canisterPath}/Cargo.lock`, workspaceCargoLock);

    if (!existsSync(`${canisterPath}/canister`)) {
        mkdirSync(`${canisterPath}/canister`);
    }

    copySync(`${__dirname}/rust/canister`, `${canisterPath}/canister`);

    if (!existsSync(`${canisterPath}/canister_methods`)) {
        mkdirSync(`${canisterPath}/canister_methods`);
    }

    copySync(
        `${__dirname}/rust/canister_methods`,
        `${canisterPath}/canister_methods`
    );

    writeFileSync(`${canisterPath}/canister/src/main.js`, canisterJavaScript);

    if (
        canisterConfig.build_assets !== undefined &&
        canisterConfig.build_assets !== null
    ) {
        execSync(canisterConfig.build_assets);
    }

    for (const [src, dest] of canisterConfig.assets ?? []) {
        copySync(src, join(canisterPath, 'canister', 'src', 'assets', dest));
    }
}
