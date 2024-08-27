import { IOType } from 'child_process';

import {
    createHiddenAzleDirectories,
    writeGeneratedFiles
} from '../../../stable/commands/compile';
import { getWasmBinary } from '../../../stable/commands/compile/wasm_binary';
import { CanisterConfig } from '../../../stable/utils/types';
import { getCandidAndMethodMeta } from './candid_and_method_meta';
import { getContext } from './get_context';
import { compile as compileJavaScript } from './javascript';

export async function runCommand(
    canisterName: string,
    canisterConfig: CanisterConfig,
    ioType: IOType
): Promise<void> {
    const {
        canisterPath,
        candidPath,
        envVars,
        esmAliases,
        esmExternals,
        main,
        wasmBinaryPath,
        wasmedgeQuickJsPath
    } = getContext(canisterName, canisterConfig);

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
        envVars
    );

    const wasmBinary = await getWasmBinary(
        canisterName,
        ioType,
        javaScript,
        envVars,
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
}
