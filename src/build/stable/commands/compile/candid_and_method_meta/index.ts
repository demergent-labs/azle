import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CandidGen, EnvVars, MethodMeta } from '../../../utils/types';
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
): Promise<{
    candid: string;
    methodMeta: MethodMeta;
}> {
    if (
        candidGen === undefined ||
        candidGen === 'automatic' ||
        candidGen === 'custom'
    ) {
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

    if (candidGen === 'http') {
        throw new Error(
            `dfx.json: "candid_gen": "http" is only available in experimental mode`
        );
    }

    throw new Error(`dfx.json: "candid_gen": "${candidGen}" is not supported`);
}
