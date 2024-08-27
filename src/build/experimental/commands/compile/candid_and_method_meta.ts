import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { handleAutomaticAndCustom } from '../../../stable/commands/compile/candid_and_method_meta';
import { AZLE_PACKAGE_PATH } from '../../../stable/utils/global_paths';
import {
    CandidAndMethodMeta,
    CandidGen,
    EnvVars,
    MethodMeta
} from '../../../stable/utils/types';

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
        return await handleHttp();
    }

    throw new Error(`dfx.json: "candid_gen": "${candidGen}" is not supported`);
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
