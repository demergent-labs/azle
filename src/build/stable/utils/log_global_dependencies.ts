import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { execSyncPretty } from './exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from './global_paths';

export async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = getWasiVersion();
    const nodeVersion = getNodeVersion();
    const rustVersion = getRustVersion();
    const dfxVersion = getDfxVersion();

    const globalDependencies = {
        wasi2ic: wasiVersion,
        node: nodeVersion,
        rustc: rustVersion,
        dfx: dfxVersion
    };

    const packageJsonPath = join(AZLE_PACKAGE_PATH, 'package.json');

    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    await writeFile(
        packageJsonPath,
        JSON.stringify(
            { ...packageJson, azle: { globalDependencies } },
            null,
            4
        )
    );
}

function getWasiVersion(): string {
    return getCargoVersion('wasi2ic');
}

function getNodeVersion(): string {
    const nodeOutput = execSyncPretty('node --version').toString().trim();
    const match = nodeOutput.match(/^v(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number (e.g., "16.13.0")
    } else {
        throw new Error('Could not parse node version');
    }
}

function getRustVersion(): string {
    const rustcOutput = execSyncPretty('rustc --version').toString().trim();
    const match = rustcOutput.match(/^rustc\s+(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number
    } else {
        throw new Error('Could not parse rustc version');
    }
}

function getCargoVersion(packageName: string): string {
    const cargoOutput = execSyncPretty('cargo install --list').toString();

    // Regular expression to capture both with and without a repository link
    const regex = new RegExp(
        `${packageName}\\s+v(\\d+\\.\\d+\\.\\d+)(?:\\s+\\((https?:\\/\\/.+?)\\))?`
    );
    const match = cargoOutput.match(regex);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        if (match.length > 2 && typeof match[2] === 'string') {
            return match[2]; // Return the repository link if available
        } else {
            return match[1]; // Return the version number if no link is found
        }
    } else {
        throw new Error(`Could not parse ${packageName} version`);
    }
}

function getDfxVersion(): string {
    const dfxOutput = execSyncPretty('dfx --version').toString().trim();

    const match = dfxOutput.match(/dfx (\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Return the version number
    } else {
        throw new Error('Could not parse the dfx version');
    }
}
