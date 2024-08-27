import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CandidAndMethodMeta, CandidGen, EnvVars } from '../../../utils/types';
import { getWasmBinary } from '../wasm_binary';
import { execute } from './execute';

export async function getCandidAndMethodMeta(
    canisterName: string,
    candidGen: CandidGen | undefined,
    canisterPath: string,
    candidPath: string,
    js: string,
    ioType: IOType,
    envVars: EnvVars
): Promise<CandidAndMethodMeta> {
    if (
        candidGen === undefined ||
        candidGen === 'automatic' ||
        candidGen === 'custom'
    ) {
        return await handleAutomaticAndCustom(
            candidGen,
            candidPath,
            canisterName,
            ioType,
            js,
            envVars,
            canisterPath
        );
    }

    if (candidGen === 'http') {
        handleHttp();
    }

    throw new Error(`dfx.json: "candid_gen": "${candidGen}" is not supported`);
}

export async function handleAutomaticAndCustom(
    candidGen: CandidGen | undefined,
    candidPath: string,
    canisterName: string,
    ioType: IOType,
    js: string,
    envVars: EnvVars,
    canisterPath: string
): Promise<CandidAndMethodMeta> {
    const wasmBinary = await getWasmBinary(
        canisterName,
        ioType,
        js,
        envVars,
        canisterPath
    );

    const { candid, methodMeta } = await execute(wasmBinary);

    return {
        candid:
            candidGen === 'custom'
                ? (await readFile(candidPath)).toString()
                : candid,
        methodMeta
    };
}

function handleHttp(): never {
    throw new Error(
        `dfx.json: "candid_gen": "http" is only available in experimental mode`
    );
}
