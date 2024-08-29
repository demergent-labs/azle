import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../../utils/global_paths';
import { generateWorkspaceCargoToml } from './generate_cargo_toml_files';

export async function prepareRustStagingArea(
    canisterPath: string
): Promise<void> {
    const workspaceCargoToml = generateWorkspaceCargoToml();

    await writeFile(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

    await copy(
        join(AZLE_PACKAGE_PATH, 'Cargo.lock'),
        `${canisterPath}/Cargo.lock`
    );

    if (!existsSync(`${canisterPath}/canister`)) {
        await mkdir(`${canisterPath}/canister`);
    }

    await copy(
        `${AZLE_PACKAGE_PATH}/src/build/rust/canister`,
        `${canisterPath}/canister`
    );

    if (!existsSync(`${canisterPath}/open_value_sharing`)) {
        await mkdir(`${canisterPath}/open_value_sharing`);
    }

    await copy(
        `${AZLE_PACKAGE_PATH}/src/build/rust/open_value_sharing`,
        `${canisterPath}/open_value_sharing`
    );
}
