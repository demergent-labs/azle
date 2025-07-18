import '#experimental/build/assert_experimental';

import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { execute } from '#commands/build/candid_and_method_meta/execute';
import { WasmData } from '#experimental/utils/types';
import { CandidAndMethodMeta, CandidGen } from '#utils/types';

import { getWasmBinary } from './wasm_binary';

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
