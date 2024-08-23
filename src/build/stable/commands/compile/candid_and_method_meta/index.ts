import { IOType } from 'child_process';
import { readFile } from 'fs/promises';

import { CanisterConfig } from '../../../utils/get_canister_config';
import { getWasmBinary } from '../wasm_binary';
import { execute } from './execute';

export type MethodMeta = {
    queries?: Method[];
    updates?: Method[];
    init?: Method;
    pre_upgrade?: Method;
    post_upgrade?: Method;
    heartbeat?: Method;
    inspect_message?: Method;
};

export type Method = {
    name: string;
    composite?: boolean;
    index: number;
};

export async function getCandidAndMethodMeta(
    canisterName: string,
    canisterConfig: CanisterConfig,
    canisterPath: string,
    candidPath: string,
    js: string,
    ioType: IOType
): Promise<{
    candid: string;
    methodMeta: MethodMeta;
}> {
    const candidGen = canisterConfig.custom?.candid_gen;

    if (
        candidGen === undefined ||
        candidGen === 'automatic' ||
        candidGen === 'custom'
    ) {
        const wasmBinary = await getWasmBinary(
            canisterName,
            ioType,
            js,
            canisterConfig,
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
