import { join } from 'path';

import { compileRustCode } from './compile_rust_code';
import { generateCandidFile } from './generate_candid_file';
import { installRustDependencies } from './install_rust_dependencies';
import { generateNewAzleProject } from './new';
import { optimizeRustCode } from './optimize_rust_code';
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

azle();

function azle() {
    if (process.argv[2] === 'new') {
        generateNewAzleProject(azleVersion, dfxVersion);
        return;
    }

    installRustDependencies(azleVersion, rustVersion);

    const stdioType = getStdIoType();
    const canisterName = unwrap(getCanisterName(process.argv));
    const canisterPath = join('.azle', canisterName);
    const wasmFilePath = join(canisterPath, `${canisterName}.wasm`);

    time(`\nBuilding canister ${green(canisterName)}`, 'default', () => {
        const canisterConfig = unwrap(getCanisterConfig(canisterName));
        const candidPath = canisterConfig.candid;

        printFirstBuildWarning();
        compileTypeScriptToRust(
            canisterName,
            canisterPath,
            canisterConfig.root,
            canisterConfig.ts
        );
        compileRustCode(canisterName, canisterPath, stdioType);
        generateCandidFile(candidPath, wasmFilePath);
        optimizeRustCode(wasmFilePath, stdioType);
    });

    logSuccess(canisterPath, canisterName);
}
