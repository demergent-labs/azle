import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CandidAndMethodMeta, CandidGen, WasmData } from '../../../utils/types';
import { getWasmBinary } from '../wasm_binary';
import { execute } from './execute';

export async function getCandidAndMethodMeta(
    candidGen: CandidGen | undefined,
    candidPath: string,
    js: string,
    ioType: IOType,
    wasmData: WasmData
): Promise<CandidAndMethodMeta> {
    if (
        candidGen === undefined ||
        candidGen === 'automatic' ||
        candidGen === 'custom'
    ) {
        return await handleAutomaticAndCustom(
            candidGen,
            candidPath,
            ioType,
            js,
            wasmData
        );
    }

    if (candidGen === 'http') {
        handleHttp();
    }

    throw new Error(`dfx.json: "candid_gen": "${candidGen}" is not supported`);
}

async function handleAutomaticAndCustom(
    candidGen: CandidGen | undefined,
    candidPath: string,
    ioType: IOType,
    js: string,
    wasmData: WasmData
): Promise<CandidAndMethodMeta> {
    const wasmBinary = await getWasmBinary(ioType, js, wasmData);

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
