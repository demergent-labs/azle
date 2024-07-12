import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { generateCandidAndCanisterMethods } from './generate_candid_and_canister_methods';
import { generateWasmBinary } from './generate_wasm_binary';
import { AZLE_PACKAGE_PATH } from './utils/global_paths';
import {
    CandidGen,
    CanisterConfig,
    CanisterMethods,
    CompilerInfo
} from './utils/types';

export async function getCandidAndCanisterMethods(
    candidGen: CandidGen = 'http',
    candidPath: string,
    canisterName: string,
    stdioType: IOType,
    envVars: [string, string][],
    rustStagingWasmPath: string,
    js: string,
    canisterConfig: CanisterConfig,
    canisterPath: string
): Promise<{
    candid: string;
    canisterMethods: CanisterMethods;
}> {
    if (candidGen === 'automatic' || candidGen === 'custom') {
        const customCandid =
            candidGen === 'custom'
                ? (await readFile(candidPath)).toString()
                : '';

        const compilerInfo: CompilerInfo = {
            canister_methods: {
                candid: customCandid,
                queries: [],
                updates: [],
                callbacks: {}
            },
            env_vars: envVars
        };

        await generateWasmBinary(
            canisterName,
            stdioType,
            js,
            compilerInfo,
            canisterConfig,
            canisterPath
        );

        const { candid, canisterMethods } =
            await generateCandidAndCanisterMethods(rustStagingWasmPath);

        return {
            candid: candidGen === 'custom' ? customCandid : candid,
            canisterMethods
        };
    }

    if (candidGen === 'http') {
        const candid = (
            await readFile(join(AZLE_PACKAGE_PATH, 'server.did'))
        ).toString();

        const canisterMethods: CanisterMethods = {
            candid,
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
            post_upgrade: { name: 'postUpgrade', index: 3 },
            callbacks: {}
        };

        return {
            candid,
            canisterMethods
        };
    }

    throw new Error(`Unsupported candid_gen: ${candidGen}`);
}
