import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { generateWorkspaceCargoToml } from './generate_cargo_toml_files';
import { AZLE_PACKAGE_PATH } from './utils/global_paths';
import { CanisterConfig, Toml } from './utils/types';

export async function prepareRustStagingArea(
    canisterConfig: CanisterConfig,
    canisterPath: string,
    canisterJavaScript: string
): Promise<void> {
    const workspaceCargoToml: Toml = generateWorkspaceCargoToml(
        canisterConfig.opt_level ?? '0'
    );

    await writeFile(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

    await copy(
        join(AZLE_PACKAGE_PATH, 'Cargo.lock'),
        `${canisterPath}/Cargo.lock`
    );

    if (!existsSync(`${canisterPath}/canister`)) {
        await mkdir(`${canisterPath}/canister`);
    }

    await copy(
        `${AZLE_PACKAGE_PATH}/src/compiler/rust/canister`,
        `${canisterPath}/canister`
    );

    if (!existsSync(`${canisterPath}/open_value_sharing`)) {
        await mkdir(`${canisterPath}/open_value_sharing`);
    }

    await copy(
        `${AZLE_PACKAGE_PATH}/src/compiler/rust/open_value_sharing`,
        `${canisterPath}/open_value_sharing`
    );

    await writeFile(`${canisterPath}/canister/src/main.js`, canisterJavaScript);
}
