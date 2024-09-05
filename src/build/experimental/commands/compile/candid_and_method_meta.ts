import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { execute } from '../../../stable/commands/compile/candid_and_method_meta/execute';
import { AZLE_PACKAGE_PATH } from '../../../stable/utils/global_paths';
import {
    CandidAndMethodMeta,
    CandidGen,
    MethodMeta
} from '../../../stable/utils/types';
import { WasmData } from '../../utils/types';
import { getWasmBinary } from './wasm_binary';

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
        return await handleHttp();
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

async function handleHttp(): Promise<CandidAndMethodMeta> {
    const candid = (
        await readFile(join(AZLE_PACKAGE_PATH, 'server.did'))
    ).toString();

    const methodMeta: MethodMeta = {
        queries: [
            {
                name: 'http_request',
                index: 0,
                composite: true
            }
        ],
        updates: [
            {
                name: 'http_request_update',
                index: 1
            }
        ],
        init: { name: 'init', index: 2 },
        post_upgrade: { name: 'postUpgrade', index: 3 }
    };

    return {
        candid,
        methodMeta
    };
}
