import { IOType } from 'child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
// @ts-ignore
import { copySync } from 'fs-extra/esm';
import { join } from 'path';

import { generateWorkspaceCargoToml } from './generate_cargo_toml_files';
import { execSyncPretty } from './utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from './utils/global_paths';
import { CanisterConfig, Toml } from './utils/types';

export async function prepareRustStagingArea(
    canisterConfig: CanisterConfig,
    canisterPath: string,
    canisterJavaScript: string,
    stdioType: IOType
): Promise<void> {
    const workspaceCargoToml: Toml = generateWorkspaceCargoToml(
        canisterConfig.opt_level ?? '0'
    );

    rmSync(canisterPath, { recursive: true, force: true });
    mkdirSync(canisterPath, { recursive: true });

    writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

    copySync(
        join(AZLE_PACKAGE_PATH, 'Cargo.lock'),
        `${canisterPath}/Cargo.lock`
    );

    if (!existsSync(`${canisterPath}/canister`)) {
        mkdirSync(`${canisterPath}/canister`);
    }

    copySync(
        `${AZLE_PACKAGE_PATH}/src/compiler/rust/canister`,
        `${canisterPath}/canister`
    );

    if (!existsSync(`${canisterPath}/canister_methods`)) {
        mkdirSync(`${canisterPath}/canister_methods`);
    }

    copySync(
        `${AZLE_PACKAGE_PATH}/src/compiler/rust/canister_methods`,
        `${canisterPath}/canister_methods`
    );

    if (!existsSync(`${canisterPath}/open_value_sharing`)) {
        mkdirSync(`${canisterPath}/open_value_sharing`);
    }

    copySync(
        `${AZLE_PACKAGE_PATH}/src/compiler/rust/open_value_sharing`,
        `${canisterPath}/open_value_sharing`
    );

    writeFileSync(`${canisterPath}/canister/src/main.js`, canisterJavaScript);

    if (
        canisterConfig.build_assets !== undefined &&
        canisterConfig.build_assets !== null
    ) {
        execSyncPretty(canisterConfig.build_assets, stdioType);
    }
}
