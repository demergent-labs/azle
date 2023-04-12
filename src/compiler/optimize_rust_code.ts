import { execSync, IOType } from 'child_process';

import {
    GLOBAL_AZLE_BIN_DIR,
    GLOBAL_AZLE_CONFIG_DIR,
    GLOBAL_AZLE_TARGET_DIR,
    time
} from './utils';
import { version } from '../../package.json';

export function optimizeRustCode(
    wasmFilePath: string,
    candidPath: string,
    stdio: IOType
) {
    time(`[3/3] 🚀 Optimizing Wasm binary...`, 'inline', () => {
        // optimization, binary is too big to deploy without this
        execSync(
            `${GLOBAL_AZLE_BIN_DIR}/ic-cdk-optimizer ${wasmFilePath} -o ${wasmFilePath}`,
            {
                stdio,
                env: {
                    ...process.env,
                    CARGO_TARGET_DIR: GLOBAL_AZLE_TARGET_DIR,
                    CARGO_HOME: GLOBAL_AZLE_CONFIG_DIR,
                    RUSTUP_HOME: GLOBAL_AZLE_CONFIG_DIR
                }
            }
        );

        addCandidToWasmMetaData(candidPath, wasmFilePath);

        execSync(`gzip -f -k ${wasmFilePath}`, { stdio });
    });
}

function addCandidToWasmMetaData(
    candidPath: string,
    wasmFilePath: string
): void {
    execSync(
        `${GLOBAL_AZLE_BIN_DIR}/ic-wasm ${wasmFilePath} -o ${wasmFilePath} metadata candid:service -f ${candidPath} -v public`
    );

    execSync(
        `${GLOBAL_AZLE_BIN_DIR}/ic-wasm ${wasmFilePath} -o ${wasmFilePath} metadata cdk -d "azle ${version}" -v public`
    );
}
