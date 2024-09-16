import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { execSyncPretty } from './exec_sync_pretty';
import { AZLE_PACKAGE_PATH } from './global_paths';

export async function logGlobalDependencies(): Promise<void> {
    const wasiVersion = await getWasiVersion();
    const nodeVersion = await getNodeVersion();
    const rustVersion = await getRustVersion();

    const globalDependencies = {
        wasi2ic: wasiVersion,
        node: nodeVersion,
        rustc: rustVersion
    };

    const packageJsonPath = join(AZLE_PACKAGE_PATH, 'package.json');

    const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);

    await writeFile(
        packageJsonPath,
        JSON.stringify({ ...packageJson, globalDependencies }, null, 4)
    );
}

async function getWasiVersion(): Promise<string> {
    return await getCargoVersion('wasi2ic');
}

async function getNodeVersion(): Promise<string> {
    const nodeOutput = execSyncPretty('node --version').toString().trim();
    const match = nodeOutput.match(/^v(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number (e.g., "16.13.0")
    } else {
        throw new Error('Could not parse node version');
    }
}

async function getRustVersion(): Promise<string> {
    const rustcOutput = execSyncPretty('rustc --version').toString().trim();
    const match = rustcOutput.match(/^rustc\s+(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number
    } else {
        throw new Error('Could not parse rustc version');
    }
}

async function getCargoVersion(packageName: string): Promise<string> {
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
