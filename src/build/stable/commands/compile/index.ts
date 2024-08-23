// TODO go through everything and make functions only accept what they need
// TODO move all types to utils/types
// TODO move everything into the appropriate location

import { IOType } from 'child_process';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

import { CanisterConfig } from '../../utils/get_canister_config';
import { getCandidAndMethodMeta } from './candid_and_method_meta';
import { compile as compileJavaScript } from './javascript';
import { getWasmBinary } from './wasm_binary';

type Context = {
    main: string;
    canisterPath: string;
    candidPath: string;
    ioType: IOType;
    wasmBinaryPath: string;
};

export async function runCommand(
    canisterName: string,
    canisterConfig: CanisterConfig
): Promise<void> {
    const { main, canisterPath, candidPath, ioType, wasmBinaryPath } =
        getContext(canisterName, canisterConfig);

    await rm(canisterPath, { recursive: true, force: true });
    await mkdir(canisterPath, { recursive: true });

    const javaScript = await compileJavaScript(main);

    const { candid, methodMeta } = await getCandidAndMethodMeta(
        canisterName,
        canisterConfig,
        canisterPath,
        candidPath,
        javaScript,
        ioType
    );

    const wasmBinary = await getWasmBinary(
        canisterName,
        ioType,
        javaScript,
        canisterConfig,
        canisterPath,
        methodMeta
    );

    await writeFile(candidPath, candid);
    await writeFile(join(canisterPath, 'main.js'), javaScript);
    await writeFile(wasmBinaryPath, wasmBinary);
}

function getContext(
    canisterName: string,
    canisterConfig: CanisterConfig
): Context {
    const main = canisterConfig?.main;

    if (main === undefined) {
        throw new Error(
            `Your dfx.json canister configuration object must have a "main" property pointing to your canister's entrypoint .ts or .js file`
        );
    }

    const canisterPath = join('.azle', canisterName);

    const candidPath = process.env.CANISTER_CANDID_PATH;

    if (candidPath === undefined) {
        throw new Error(`Azle: CANISTER_CANDID_PATH is not defined`);
    }

    const ioType = process.env.AZLE_VERBOSE === 'true' ? 'inherit' : 'pipe';

    const wasmBinaryPath = join(canisterPath, `${canisterName}.wasm`);

    return {
        main,
        canisterPath,
        candidPath,
        ioType,
        wasmBinaryPath
    };
}
