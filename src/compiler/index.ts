import { join } from 'path';

import { compileRustCode } from './compile_rust_code';
import { generateCandidFile } from './generate_candid_file';
import { installRustDependencies } from './install_rust_dependencies';
import { generateNewAzleProject } from './new';
import { compileTypeScriptToRust } from './typescript_to_rust';
import {
    getCanisterConfig,
    getCanisterName,
    getStdIoType,
    logSuccess,
    printFirstBuildWarning,
    time,
    unwrap
} from './utils';
import { green } from './utils/colors';
import { GLOBAL_AZLE_CONFIG_DIR } from './utils';
import {
    version as azleVersion,
    dfx_version as dfxVersion,
    rust_version as rustVersion
} from '../../package.json';
import { gzipWasmBinary } from './gzip';
import { rmSync } from 'fs-extra';

azle();

async function azle() {
    if (process.argv[2] === 'new') {
        generateNewAzleProject(azleVersion, dfxVersion);
        return;
    }

    if (process.argv[2] === 'clean') {
        rmSync(GLOBAL_AZLE_CONFIG_DIR, {
            recursive: true,
            force: true
        });
        return;
    }

    const stdioType = getStdIoType();
    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);
    const wasmFilePath = join(canisterPath, `${canisterName}.wasm`);

    await time(
        `\nBuilding canister ${green(canisterName)}\n`,
        'default',
        async () => {
            const canisterConfig = unwrap(getCanisterConfig(canisterName));
            const candidPath = canisterConfig.candid;

            printFirstBuildWarning();
            await installRustDependencies(azleVersion, rustVersion);
            const mainJs = await compileTypeScriptToRust(
                canisterName,
                canisterPath,
                canisterConfig
            );
            await compileRustCode(canisterName, canisterPath, stdioType);
            gzipWasmBinary(wasmFilePath, stdioType);
            generateCandidFile(mainJs, candidPath);
        }
    );

    logSuccess(canisterPath, canisterName);
}
