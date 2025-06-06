import '#experimental/build/assert_experimental';

import { HttpAgent } from '@dfinity/agent';
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import { execSync } from 'child_process';

import { getCanisterId } from '#utils/dfx';
import { getDfxRoot } from '#utils/dfx_root';

type StorageMode = 'keyring' | 'password-protected' | 'plaintext';

export function addController(
    canisterName: string,
    identityName: string,
    principal: string
): Buffer {
    const currentIdentity = whoami();
    console.info();
    console.info(`Adding ${identityName} as a controller for ${canisterName}`);
    console.info(`You may be prompted for ${currentIdentity}'s password`);
    console.info();
    const cmd = `dfx canister update-settings ${canisterName} --add-controller ${principal}`;
    return execSync(cmd, {
        cwd: getDfxRoot(),
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    });
}

export async function createAnonymousAgent(): Promise<void> {
    const agent = new HttpAgent({
        host: getAgentHost()
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }
}

/**
 * Returns an agent authenticated with the identity with the given name.
 *
 * Generates a new identity with the given name if shouldGenerateIdentity and
 * the identity doesn't already exist.
 *
 * @param identityName
 * @returns
 */
export async function createAuthenticatedAgent(
    identityName: string,
    shouldGenerateIdentity: boolean = false
): Promise<HttpAgent> {
    if (shouldGenerateIdentity && !identityExists(identityName)) {
        generateIdentity(identityName);
    }

    const agent = new HttpAgent({
        host: getAgentHost(),
        identity: getSecp256k1KeyIdentity(identityName)
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }

    return agent;
}

/**
 * Returns an agent authenticated with the identity with the given name.
 *
 * Generates a new identity with the given name if shouldGenerateIdentity and
 * the identity doesn't already exist.
 *
 * IMPORTANT: In order to be synchronous this call will not fetch the root key.
 * If you are not on mainnet you will need to fetch the root key separately.
 *
 * @param identityName
 * @returns
 */
export function createAuthenticatedAgentSync(
    identityName: string,
    shouldGenerateIdentity: boolean = false
): HttpAgent {
    if (shouldGenerateIdentity && !identityExists(identityName)) {
        generateIdentity(identityName);
    }

    const agent = new HttpAgent({
        host: getAgentHost(),
        identity: getSecp256k1KeyIdentity(identityName)
    });

    return agent;
}

export function generateIdentity(name: string): Buffer {
    console.info();
    console.info(`Generating identity ${name}`);
    const storageMode = determineStorageMode();
    if (storageMode === undefined) {
        console.info(`You may be prompted to create a password for ${name}`);
        console.info();
        return execSync(`dfx identity new ${name}`, {
            cwd: getDfxRoot(),
            stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
        });
    }
    if (storageMode === 'password-protected') {
        console.info(`You will be prompted to create a password for ${name}`);
        console.info();
    }
    return execSync(`dfx identity new ${name} --storage-mode ${storageMode}`, {
        cwd: getDfxRoot(),
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    });
}

export function getAgentHost(): string {
    return process.env.DFX_NETWORK === 'ic'
        ? `https://icp-api.io`
        : `http://127.0.0.1:${getWebServerPort()}`;
}

export function getCanisterOrigin(canisterName: string): string {
    return `http://${getCanisterId(
        canisterName
    )}.raw.localhost:${getWebServerPort()}`;
}

export function getIdentities(): string[] {
    const list = execSync(`dfx identity list`, {
        cwd: getDfxRoot(),
        encoding: 'utf-8'
    }).trim();
    const identities = list.split('\n');

    return identities;
}

export function getPemKey(identityName: string): string {
    console.info();
    console.info(`Exporting PEM key for ${identityName}`);
    console.info(`You may be prompted for ${identityName}'s password`);
    console.info();
    const cmd = `dfx identity export ${identityName}`;
    const result = execSync(cmd, {
        cwd: getDfxRoot(),
        encoding: 'utf-8',
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    }).trim();
    return result;
}

export function getPrincipal(identityName: string): string {
    console.info();
    console.info(`Getting principal for ${identityName}`);
    console.info(`You may be prompted for ${identityName}'s password`);
    console.info();
    const cmd = `dfx identity get-principal --identity ${identityName}`;
    return execSync(cmd, {
        cwd: getDfxRoot(),
        encoding: 'utf-8',
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    }).trim();
}

export function getSecp256k1KeyIdentity(
    identityName: string
): Secp256k1KeyIdentity {
    return Secp256k1KeyIdentity.fromPem(getPemKey(identityName));
}

export function getWebServerPort(): string {
    return execSync(`dfx info webserver-port`, {
        cwd: getDfxRoot(),
        encoding: 'utf-8'
    }).trim();
}

export function identityExists(name: string): boolean {
    const identities = getIdentities();
    return identities.includes(name);
}

export function whoami(): string {
    return execSync(`dfx identity whoami`, {
        cwd: getDfxRoot(),
        encoding: 'utf-8'
    }).trim();
}

export function whoamiPrincipal(): string {
    return execSync(`dfx identity get-principal`, {
        cwd: getDfxRoot(),
        encoding: 'utf-8'
    }).trim();
}

function determineStorageMode(): StorageMode | undefined {
    const mode = process.env.AZLE_IDENTITY_STORAGE_MODE;
    if (
        mode !== 'plaintext' &&
        mode !== 'keyring' &&
        mode !== 'password-protected' &&
        mode !== undefined
    ) {
        throw new Error(
            `AZLE_IDENTITY_STORAGE_MODE must be 'plaintext', 'keyring', 'password-protected'`
        );
    }
    return mode;
}
