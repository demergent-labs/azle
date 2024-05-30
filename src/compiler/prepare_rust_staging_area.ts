import { IOType } from 'child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra';
import { join } from 'path';

import { generateWorkspaceCargoToml } from './generate_cargo_toml_files';
import { getConsumer } from './get_consumer_config';
import { execSyncPretty } from './utils/exec_sync_pretty';
import { CanisterConfig, Toml } from './utils/types';

export async function prepareRustStagingArea(
    canisterConfig: CanisterConfig,
    canisterPath: string,
    canisterJavaScript: string,
    stdioType: IOType
) {
    const workspaceCargoToml: Toml = generateWorkspaceCargoToml(
        canisterConfig.opt_level ?? '0'
    );

    rmSync(canisterPath, { recursive: true, force: true });
    mkdirSync(canisterPath, { recursive: true });

    writeFileSync(`${canisterPath}/Cargo.toml`, workspaceCargoToml);

    copySync(
        join(__dirname, '..', '..', 'Cargo.lock'),
        `${canisterPath}/Cargo.lock`
    );

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

    if (!existsSync(`${canisterPath}/open_value_sharing`)) {
        mkdirSync(`${canisterPath}/open_value_sharing`);
    }

    copySync(
        `${__dirname}/rust/open_value_sharing`,
        `${canisterPath}/open_value_sharing`
    );

    writeFileSync(`${canisterPath}/canister/src/main.js`, canisterJavaScript);

    if (
        canisterConfig.build_assets !== undefined &&
        canisterConfig.build_assets !== null
    ) {
        execSyncPretty(canisterConfig.build_assets, stdioType);
    }

    for (const [src, dest] of canisterConfig.assets ?? []) {
        copySync(src, join(canisterPath, 'canister', 'src', 'assets', dest));
    }

    const consumer = await getConsumer(canisterConfig);

    writeFileSync(
        join(canisterPath, 'canister', 'src', 'assets', 'consumer.json'),
        JSON.stringify(consumer)
    );
}
