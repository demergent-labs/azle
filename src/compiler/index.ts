import { mkdirSync, writeFileSync } from 'fs';

import { compileRustCodeWithCandidAndCompilerInfo } from './compile_rust_code_with_candid_and_compiler_info';
import { setupFileWatcher } from './file_watcher/setup_file_watcher';
import { getCandidAndCanisterMethods } from './get_candid_and_canister_methods';
import { getCanisterJavaScript } from './get_canister_javascript';
import { getNamesBeforeCli, getNamesAfterCli } from './get_names';
import { handleCli } from './handle_cli';
import { prepareDockerImage } from './prepare_docker_image';
import { prepareRustStagingArea } from './prepare_rust_staging_area';
import { logSuccess, time, unwrap } from './utils';
import { green } from './utils/colors';
import { GLOBAL_AZLE_CONFIG_DIR } from './utils/global_paths';
import { CompilerInfo } from './utils/types';
import { logAutoreloadWarning } from './log_auto_reload_warning';

azle();

async function azle() {
    const {
        stdioType,
        dockerfileHash,
        dockerContainerPrefix,
        dockerImagePrefix,
        dockerImageName,
        dockerImagePathTar,
        dockerImagePathTarGz,
        dockerContainerName,
        wasmedgeQuickJsPath,
        replicaWebServerPort,
        nativeCompilation
    } = await getNamesBeforeCli();

    const commandExecuted = handleCli(
        stdioType,
        dockerfileHash,
        dockerContainerPrefix,
        dockerImagePrefix
    );

    if (commandExecuted === true) {
        return;
    }

    const {
        canisterName,
        canisterPath,
        canisterConfig,
        candidPath,
        compilerInfoPath,
        envVars,
        rustStagingCandidPath,
        rustStagingWasmPath,
        canisterId,
        reloadedJsPath
    } = getNamesAfterCli();

    setupFileWatcher(
        reloadedJsPath,
        canisterId,
        canisterConfig.main,
        wasmedgeQuickJsPath,
        replicaWebServerPort
    );

    await time(
        `\nBuilding canister ${green(canisterName)}`,
        'default',
        async () => {
            createAzleDirectories();

            if (nativeCompilation === false) {
                prepareDockerImage(
                    stdioType,
                    dockerImageName,
                    dockerImagePathTar,
                    dockerImagePathTarGz,
                    dockerContainerName,
                    wasmedgeQuickJsPath
                );
            }

            const canisterJavaScript = unwrap(
                getCanisterJavaScript(canisterConfig.main, wasmedgeQuickJsPath)
            );

            prepareRustStagingArea(
                canisterConfig,
                canisterPath,
                canisterJavaScript
            );

            const { candid, canisterMethods } = getCandidAndCanisterMethods(
                canisterConfig.candid_gen,
                candidPath,
                compilerInfoPath,
                dockerContainerName,
                canisterName,
                stdioType,
                envVars,
                rustStagingCandidPath,
                rustStagingWasmPath,
                nativeCompilation
            );

            // This is for the dfx.json candid property
            writeFileSync(candidPath, candid);

            const compilerInfo: CompilerInfo = {
                // The spread is because canisterMethods is a function with properties
                canister_methods: {
                    ...canisterMethods
                },
                env_vars: envVars
            };

            compileRustCodeWithCandidAndCompilerInfo(
                rustStagingCandidPath,
                candid,
                compilerInfoPath,
                compilerInfo,
                dockerContainerName,
                canisterName,
                stdioType,
                nativeCompilation
            );
        }
    );

    logSuccess(canisterName, canisterId, replicaWebServerPort);

    logAutoreloadWarning();
}

function createAzleDirectories() {
    mkdirSync(GLOBAL_AZLE_CONFIG_DIR, { recursive: true });
    mkdirSync('.azle', { recursive: true });
}
