import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { hashOfDirectory } from 'hash-of-directory';
import { join } from 'path';

import { getCanisterId } from '../../dfx';
import {
    getCanisterConfig,
    getCanisterName,
    getStdIoType,
    unwrap
} from './utils';
import { execSyncPretty } from './utils/exec_sync_pretty';
import {
    AZLE_PACKAGE_PATH,
    GLOBAL_AZLE_CONFIG_DIR
} from './utils/global_paths';
import { CanisterConfig } from './utils/types';

export async function getNamesBeforeCli() {
    const stdioType = getStdIoType();

    const dockerfilePath = join(AZLE_PACKAGE_PATH, 'Dockerfile');
    const dockerfileHash = await getDockerfileHash(dockerfilePath);
    const dockerImagePrefix = 'azle__image__';
    const dockerImageName = `${dockerImagePrefix}${dockerfileHash}`;
    const dockerContainerPrefix = 'azle__container__';
    const dockerContainerName = `${dockerContainerPrefix}${dockerfileHash}`;
    const wasmedgeQuickJsName = `wasmedge-quickjs_${dockerfileHash}`;

    const dockerImagePathTar = join(
        GLOBAL_AZLE_CONFIG_DIR,
        `${dockerImageName}.tar`
    );
    const dockerImagePathTarGz = join(
        GLOBAL_AZLE_CONFIG_DIR,
        `${dockerImageName}.tar.gz`
    );
    const wasmedgeQuickJsPath = join(
        GLOBAL_AZLE_CONFIG_DIR,
        wasmedgeQuickJsName
    );

    const replicaWebServerPort = execSyncPretty(`dfx info webserver-port`)
        .toString()
        .trim();

    const nativeCompilation = process.argv.includes('--native-compilation');

    return {
        stdioType,
        dockerfileHash,
        dockerImagePrefix,
        dockerImageName,
        dockerContainerPrefix,
        dockerContainerName,
        wasmedgeQuickJsName,
        dockerImagePathTar,
        dockerImagePathTarGz,
        wasmedgeQuickJsPath,
        replicaWebServerPort,
        nativeCompilation
    };
}

export function getNamesAfterCli() {
    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);

    const canisterConfig = unwrap(getCanisterConfig(canisterName));
    const candidPath = process.env.CANISTER_CANDID_PATH;

    if (candidPath === undefined) {
        throw new Error(`Azle: CANISTER_CANDID_PATH is not defined`);
    }

    const compilerInfoPath = join(
        canisterPath,
        'canister',
        'src',
        'compiler_info.json'
    );

    const envVars = getEnvVars(canisterConfig);

    const rustStagingCandidPath = join(
        canisterPath,
        'canister',
        'src',
        'candid.did'
    );

    const rustStagingWasmPath = join(canisterPath, `${canisterName}.wasm`);

    const canisterId = getCanisterId(canisterName);

    const reloadedJsPath = join(
        '.azle',
        canisterName,
        'canister',
        'src',
        'main_reloaded.js'
    );

    const esmAliases = canisterConfig.esm_aliases ?? {};
    const esmExternals = canisterConfig.esm_externals ?? [];

    return {
        canisterName,
        canisterPath,
        canisterConfig,
        candidPath,
        compilerInfoPath,
        envVars,
        rustStagingCandidPath,
        rustStagingWasmPath,
        canisterId,
        reloadedJsPath,
        esmAliases,
        esmExternals
    };
}

async function getDockerfileHash(dockerfilePath: string): Promise<string> {
    if (process.env.AZLE_DOCKERFILE_HASH !== undefined) {
        return process.env.AZLE_DOCKERFILE_HASH;
    }

    let hasher = createHash('sha256');

    const rustDirectory = join(AZLE_PACKAGE_PATH, 'src', 'compiler', 'rust');
    const rustDirectoryHash = await hashOfDirectory(rustDirectory);

    hasher.update(rustDirectoryHash);

    const dockerfile = readFileSync(dockerfilePath);

    hasher.update(dockerfile);

    return hasher.digest('hex');
}

function getEnvVars(canisterConfig: CanisterConfig): [string, string][] {
    const env = [...(canisterConfig.env ?? []), 'AZLE_AUTORELOAD'];

    return env
        .filter((envVarName) => process.env[envVarName] !== undefined)
        .map((envVarName) => {
            const envVarValue = process.env[envVarName];

            if (envVarValue === undefined) {
                throw new Error(
                    `Environment variable ${envVarName} must be undefined`
                );
            }

            return [envVarName, envVarValue];
        });
}
