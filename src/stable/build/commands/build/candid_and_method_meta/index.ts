import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CandidAndMethodMeta, CandidGen, WasmData } from '#utils/types';

import { getWasmBinary } from '../wasm_binary';
import { execute } from './execute';

export async function getCandidAndMethodMeta(
    candidGen: CandidGen | undefined,
    candidPath: string,
    js: string,
    ioType: IOType,
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
