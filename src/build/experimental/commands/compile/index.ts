import { IOType } from 'child_process';
import { rm } from 'fs/promises';

import { writeGeneratedFiles } from '../../../stable/commands/compile';
import { execSyncPretty } from '../../../stable/utils/exec_sync_pretty';
import { CanisterConfig } from '../../../stable/utils/types';
import { logSuccess } from '../../utils/log_success';
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

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterConfig.custom?.candid_gen,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    const wasmBinary = await getWasmBinary(
        ioType,
        javaScript,
        wasmData,
        methodMeta
    );

    await writeGeneratedFiles(
        canisterPath,
        candidPath,
        wasmBinaryPath,
        candid,
        javaScript,
        wasmBinary
    );

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
        execSyncPretty(canisterConfig.custom.build_assets, ioType);
    }
}
