import { IOType } from 'child_process';

import {
    createHiddenAzleDirectories,
    writeGeneratedFiles
} from '../../../stable/commands/compile';
import { execSyncPretty } from '../../../stable/utils/exec_sync_pretty';
import { CanisterConfig } from '../../../stable/utils/types';
import { getCandidAndMethodMeta } from './candid_and_method_meta';
import { getContext } from './get_context';
import { compile as compileJavaScript } from './javascript';
import { getWasmBinary } from './wasm_binary';

export async function runCommand(
    canisterName: string,
    canisterConfig: CanisterConfig,
    ioType: IOType
): Promise<void> {
    const {
        canisterPath,
        candidPath,
        esmAliases,
        esmExternals,
        main,
        wasmBinaryPath,
        wasmData,
        wasmedgeQuickJsPath
    } = await getContext(canisterName, canisterConfig);

    await createHiddenAzleDirectories(canisterPath);

    const javaScript = await compileJavaScript(
        main,
        wasmedgeQuickJsPath,
        esmAliases,
        esmExternals
    );

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterName,
        canisterConfig.custom?.candid_gen,
        canisterPath,
        candidPath,
        javaScript,
        ioType,
        wasmData
    );

    const wasmBinary = await getWasmBinary(
        canisterName,
        ioType,
        javaScript,
        wasmData,
        canisterPath,
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
}

function buildAssets(canisterConfig: CanisterConfig, ioType: IOType): void {
    if (
        canisterConfig.custom?.build_assets !== undefined &&
        canisterConfig.custom?.build_assets !== null
    ) {
        execSyncPretty(canisterConfig.custom.build_assets, ioType);
    }
}
