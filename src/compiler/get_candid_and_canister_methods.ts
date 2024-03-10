import { IOType } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

import { compileRustCodeWithCandidAndCompilerInfo } from './compile_rust_code_with_candid_and_compiler_info';
import { generateCandidAndCanisterMethods } from './generate_candid_and_canister_methods';
import { CandidGen, CanisterMethods, CompilerInfo } from './utils/types';

export function getCandidAndCanisterMethods(
    candidGen: CandidGen = 'automatic',
    candidPath: string,
    compilerInfoPath: string,
    dockerContainerName: string,
    canisterName: string,
    stdioType: IOType,
    envVars: [string, string][],
    rustStagingCandidPath: string,
    rustStagingWasmPath: string,
    nativeCompilation: boolean
): {
    candid: string;
    canisterMethods: CanisterMethods;
} {
    if (candidGen === 'automatic' || candidGen === 'custom') {
        const customCandid =
            candidGen === 'custom' ? readFileSync(candidPath).toString() : '';

        const compilerInfo: CompilerInfo = {
            canister_methods: {
                candid: customCandid,
                queries: [],
                updates: [],
                callbacks: {}
            },
            env_vars: envVars
        };

        compileRustCodeWithCandidAndCompilerInfo(
            rustStagingCandidPath,
            customCandid,
            compilerInfoPath,
            compilerInfo,
            dockerContainerName,
            canisterName,
            stdioType,
            nativeCompilation
        );

        const { candid, canisterMethods } =
            generateCandidAndCanisterMethods(rustStagingWasmPath);

        return {
            candid: candidGen === 'custom' ? customCandid : candid,
            canisterMethods
        };
    }

    if (candidGen === 'http') {
        if (require.main?.path === undefined) {
            throw new Error(`require.main?.path must be defined`);
        }

        const candid = readFileSync(
            join(require.main?.path, 'server.did')
        ).toString();

        const canisterMethods: CanisterMethods = {
            candid,
            queries: [
                {
                    name: 'http_request',
                    composite: true
                }
            ],
            updates: [
                {
                    name: 'http_request_update'
                }
            ],
            init: { name: 'init' },
            post_upgrade: { name: 'postUpgrade' },
            callbacks: {}
        };

        return {
            candid,
            canisterMethods
        };
    }

    throw new Error(`Unsupported candid_gen: ${candidGen}`);
}
