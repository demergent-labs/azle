import { existsSync } from 'fs';
import { mkdir, rm, writeFile } from 'fs/promises';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { generateWorkspaceCargoToml } from '../../../../stable/commands/compile/wasm_binary/generate_cargo_toml_files';
import { AZLE_PACKAGE_PATH } from '../../../../stable/utils/global_paths';

export async function prepareRustStagingArea(
    canisterPath: string
): Promise<void> {
    await rm(canisterPath, { recursive: true, force: true });
    await mkdir(canisterPath, { recursive: true });

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
