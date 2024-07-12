import { IOType } from 'child_process';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

import { setupFileWatcher } from './file_watcher/setup_file_watcher';
import { generateWasmBinary } from './generate_wasm_binary';
import { getCandidAndCanisterMethods } from './get_candid_and_canister_methods';
import { getCanisterJavaScript } from './get_canister_javascript';
import { getNames } from './get_names';
import { handleCli } from './handle_cli';
import { getStdIoType, logSuccess, time, unwrap } from './utils';
import { green } from './utils/colors';
import { execSyncPretty } from './utils/exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from './utils/global_paths';
import { CompilerInfo } from './utils/types';

azle();

async function azle(): Promise<void> {
    // We must run this before getNames because
    // any dfx commands require the azle extension to be installed
    if (process.argv[2] === 'install-dfx-extension') {
        installDfxExtension(getStdIoType());

        return;
    }

    const commandExecuted = await handleCli();

    if (commandExecuted === true) {
        return;
    }

    const {
        stdioType,
        wasmedgeQuickJsPath,
        replicaWebServerPort,
        canisterName,
        canisterPath,
        canisterConfig,
        candidPath,
        envVars,
        rustStagingWasmPath,
        canisterId,
        reloadedJsPath,
        esmAliases,
        esmExternals
    } = await getNames();

    await time(
        `\nBuilding canister ${green(canisterName)}`,
        'default',
        async () => {
            createAzleDirectories(canisterPath);

            const canisterJavaScript = unwrap(
                await getCanisterJavaScript(
                    canisterConfig.main,
                    wasmedgeQuickJsPath,
                    esmAliases,
                    esmExternals
                )
            );

            const { candid, canisterMethods } =
                await getCandidAndCanisterMethods(
                    canisterConfig.candid_gen,
                    candidPath,
                    canisterName,
                    stdioType,
                    envVars,
                    rustStagingWasmPath,
                    canisterJavaScript,
                    canisterConfig,
                    canisterPath
                );

            const compilerInfo: CompilerInfo = {
                // The spread is because canisterMethods is a function with properties
                canister_methods: {
                    ...canisterMethods
                },
                env_vars: envVars
            };

            await generateWasmBinary(
                canisterName,
                stdioType,
                canisterJavaScript,
                compilerInfo,
                canisterConfig,
                canisterPath
            );

            // This is for the dfx.json candid property
            // This must come after generateWasmBinary because it could clear the .azle directory
            await writeFile(candidPath, candid);

            if (
                canisterConfig.build_assets !== undefined &&
                canisterConfig.build_assets !== null
            ) {
                execSyncPretty(canisterConfig.build_assets, stdioType);
            }

            setupFileWatcher(
                reloadedJsPath,
                canisterId,
                canisterConfig.main,
                wasmedgeQuickJsPath,
                esmAliases,
                esmExternals,
                canisterName,
                canisterMethods.post_upgrade?.index ?? -1
            );
        }
    );

    logSuccess(canisterName, canisterId, replicaWebServerPort);
}

async function createAzleDirectories(canisterPath: string): Promise<void> {
    await rm(canisterPath, { recursive: true, force: true });
    await mkdir(canisterPath, { recursive: true });
}

// TODO this is just temporary
// TODO until we either make azle an official extension in the DFINITY dfx extensions repo
// TODO or we have a better way for the developer to install the extension locally
function installDfxExtension(stdioType: IOType): void {
    const dfxExtensionDirectoryPath = join(AZLE_PACKAGE_PATH, 'dfx_extension');
    execSyncPretty(
        `cd ${dfxExtensionDirectoryPath} && ./install.sh`,
        stdioType
    );
}
