import '#experimental/build/assert_experimental';

import { IOType } from 'child_process';
import { mkdir, rm, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { logSuccess } from '#experimental/utils/log_success';
import { CanisterConfig } from '#experimental/utils/types';
import { execSyncPretty } from '#utils/exec_sync_pretty';

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

    const mainJsPath = join(canisterPath, 'main.js');
    await mkdir(dirname(mainJsPath), { recursive: true });
    await writeFile(mainJsPath, javaScript);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterConfig.custom?.candid_gen,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    await mkdir(dirname(candidPath), { recursive: true });
    await writeFile(candidPath, candid);

    const wasmBinary = await getWasmBinary(
        ioType,
        javaScript,
        wasmData,
        methodMeta
    );

    await mkdir(dirname(wasmBinaryPath), { recursive: true });
    await writeFile(wasmBinaryPath, wasmBinary);

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
