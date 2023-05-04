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
import {
    version as azleVersion,
    dfx_version as dfxVersion,
    rust_version as rustVersion
} from '../../package.json';
import { gzipWasmBinary } from './gzip';

azle();

function azle() {
    if (process.argv[2] === 'new') {
        generateNewAzleProject(azleVersion, dfxVersion);
        return;
    }

    const stdioType = getStdIoType();
    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);
    const wasmFilePath = join(canisterPath, `${canisterName}.wasm`);

    time(`\nBuilding canister ${green(canisterName)}\n`, 'default', () => {
        const canisterConfig = unwrap(getCanisterConfig(canisterName));
        const candidPath = canisterConfig.candid;

        printFirstBuildWarning();
        installRustDependencies(azleVersion, rustVersion);
        compileTypeScriptToRust(canisterName, canisterPath, canisterConfig);
        compileRustCode(canisterName, canisterPath, stdioType);
        gzipWasmBinary(wasmFilePath, stdioType);
        generateCandidFile(candidPath, wasmFilePath);
    });

    logSuccess(canisterPath, canisterName);
}
