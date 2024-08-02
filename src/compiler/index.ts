#!/usr/bin/env -S tsx --abort-on-uncaught-exception

import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

import { setupFileWatcher } from './file_watcher/setup_file_watcher';
import { generateWasmBinary } from './generate_wasm_binary';
import { getCandidAndCanisterMethods } from './get_candid_and_canister_methods';
import { getCanisterJavaScript } from './get_canister_javascript';
import { getNames } from './get_names';
import { handleCli } from './handle_cli';
import { logSuccess, time, unwrap } from './utils';
import { green } from './utils/colors';
import { execSyncPretty } from './utils/exec_sync_pretty';
import { CompilerInfo } from './utils/types';

azle();

async function azle(): Promise<void> {
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
        esmExternals,
        experimental
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

            await writeFile(join(canisterPath, 'main.js'), canisterJavaScript);

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
                    canisterPath,
                    experimental
                );

            // This is for the dfx.json candid property
            await writeFile(candidPath, candid);

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
                canisterPath,
                experimental
            );

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
                canisterMethods.post_upgrade?.index ?? -1,
                experimental
            );
        }
    );

    logSuccess(canisterName, canisterId, replicaWebServerPort);
}

async function createAzleDirectories(canisterPath: string): Promise<void> {
    await rm(canisterPath, { recursive: true, force: true });
    await mkdir(canisterPath, { recursive: true });
}
