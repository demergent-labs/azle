import { IOType } from 'child_process';
import { rm } from 'fs/promises';
import { outputFile } from 'fs-extra';
import { join } from 'path';

import { logSuccess } from '#experimental/utils/log_success';
import { execSyncPretty } from '#utils/exec_sync_pretty';
import { CanisterConfig } from '#utils/types';

import { getCandidAndMethodMeta } from './candid_and_method_meta';
import { setupFileWatcher } from './file_watcher/setup_file_watcher';
import { getContext } from './get_context';
import { compile as compileJavaScript } from './javascript';
import { getWasmBinary } from './wasm_binary';

export async function runCommand(
    canisterName: string,
    canisterConfig: CanisterConfig,
    ioType: IOType
): Promise<void> {
    const {
        canisterId,
        canisterPath,
        candidPath,
        esmAliases,
        esmExternals,
        main,
        reloadedJsPath,
        wasmBinaryPath,
        wasmData
    } = await getContext(canisterName, canisterConfig);

    await rm(canisterPath, { recursive: true, force: true });

    const javaScript = await compileJavaScript(main, esmAliases, esmExternals);

    await outputFile(join(canisterPath, 'main.js'), javaScript);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterConfig.custom?.candid_gen,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    await outputFile(candidPath, candid);

    const wasmBinary = await getWasmBinary(
        ioType,
        javaScript,
        wasmData,
        methodMeta
    );

    await outputFile(wasmBinaryPath, wasmBinary);

    buildAssets(canisterConfig, ioType);

    setupFileWatcher(
        reloadedJsPath,
        canisterId,
        main,
        esmAliases,
        esmExternals,
        canisterName,
        methodMeta.post_upgrade?.index ?? -1
    );

    if (canisterConfig.custom?.candid_gen === 'http') {
        logSuccess(canisterName, canisterId);
    }
}

function buildAssets(canisterConfig: CanisterConfig, ioType: IOType): void {
    if (
        canisterConfig.custom?.build_assets !== undefined &&
        canisterConfig.custom?.build_assets !== null
    ) {
        execSyncPretty(canisterConfig.custom.build_assets, {
            stdio: ioType
        });
    }
}
