import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { execute } from '#commands/compile/candid_and_method_meta/execute';
import { WasmData } from '#experimental/utils/types';
import { AZLE_ROOT } from '#utils/global_paths';
import { CandidAndMethodMeta, CandidGen, MethodMeta } from '#utils/types';

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
        await readFile(
            join(AZLE_ROOT, 'src', 'experimental', 'lib', 'server.did')
        )
    ).toString();

    const methodMeta: MethodMeta = {
        init: { name: 'init', index: 0 },
        post_upgrade: { name: 'postUpgrade', index: 1 },
        queries: [
            {
                name: 'http_request',
                index: 2,
                composite: true
            }
        ],
        updates: [
            {
                name: 'http_request_update',
                index: 3
            }
        ]
    };

    return {
        candid,
        methodMeta
    };
}
