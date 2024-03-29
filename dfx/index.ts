import { execSync } from 'child_process';
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
import { readFile } from 'fs/promises';
import { homedir } from 'os';
import { join } from 'path';
import { HttpAgent } from '@dfinity/agent';

export function getCanisterId(canisterName: string): string {
    return execSync(
        `dfx canister --network ${
            process.env.DFX_NETWORK ?? 'local'
        } id ${canisterName}`
    )
        .toString()
        .trim();
}

export function getWebServerPort(): string {
    return execSync(`dfx info webserver-port`).toString().trim();
}

export function getCanisterOrigin(canisterName: string): string {
    return `http://${getCanisterId(
        canisterName
    )}.localhost:${getWebServerPort()}`;
}

export function getAgentHost(): string {
    return process.env.DFX_NETWORK === 'ic'
        ? `https://icp-api.io`
        : `http://127.0.0.1:${getWebServerPort()}`;
}

export async function createAnonymousAgent() {
    const agent = new HttpAgent({
        host: getAgentHost()
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }
}

export async function createAuthenticatedAgent(
    identityName?: string
): Promise<HttpAgent> {
    const agent = new HttpAgent({
        host: getAgentHost(),
        identity: getIdentity(identityName)
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }

    return agent;
}

export function getIdentityName(): string {
    return execSync(`dfx identity whoami`).toString().trim();
}

type StorageMode = 'keyring' | 'password-protected' | 'plaintext';

export function generateIdentity(
    name: string,
    storageModeCool?: StorageMode
): Buffer {
    console.info();
    console.info(`Generating identity ${name}`);
    const storageMode = determineStorageMode(storageModeCool);
    if (storageMode === undefined) {
        console.info(`You may be prompted to create a password for ${name}`);
        console.info();
        return execSync(`dfx identity new ${name}`, {
            stdio: ['inherit', 'pipe', 'inherit']
        });
    }
    if (storageMode === 'password-protected') {
        console.info(`You will be prompted to create a password for ${name}`);
        console.info();
    }
    return execSync(`dfx identity new ${name} --storage-mode ${storageMode}`, {
        stdio: ['inherit', 'pipe', 'inherit'] // TODO add todo here and aboe
    });
}

function determineStorageMode(
    storageMode?: StorageMode
): StorageMode | undefined {
    if (process.env.AZLE_PLAINTEXT_IDENTITY === 'true') {
        return 'plaintext';
    }
    return storageMode;
}

export function useIdentity(name: string) {
    execSync(`dfx identity use ${name}`);
}

export function getIdentities(): string[] {
    const list = execSync(`dfx identity list`).toString().trim();
    const identities = list.split('\n');

    return identities;
}

export function identityExists(name: string): boolean {
    const identities = getIdentities();
    return identities.includes(name);
}

export function removeIdentity(name: string) {
    execSync(`dfx identity remove ${name}`);
}

export async function getIdentityFromPemFile(
    identityName: string = getIdentityName()
): Promise<Secp256k1KeyIdentity> {
    const identityPath = join(
        homedir(),
        '.config',
        'dfx',
        'identity',
        identityName,
        'identity.pem'
    );
    return Secp256k1KeyIdentity.fromPem(await readFile(identityPath, 'utf-8'));
}

export function getPemKey(identityName: string = getIdentityName()): string {
    console.info();
    console.info(`Exporting PEM key for ${identityName}`);
    console.info(`You may be prompted for ${identityName}'s password`);
    console.info();
    const cmd = `dfx identity export ${identityName}`;
    const result = execSync(cmd, {
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but it will fail immediately if you do that
    })
        .toString()
        .trim();
    return result;
}

export function getIdentity(identityName?: string): Secp256k1KeyIdentity {
    return Secp256k1KeyIdentity.fromPem(getPemKey(identityName));
}

export function getPrincipal(identityName: string = getIdentityName()): string {
    console.info();
    console.info(`Getting principal for ${identityName}`);
    console.info(`You may be prompted for ${identityName}'s password`);
    console.info();
    const cmd = `dfx identity get-principal --identity ${identityName}`;
    return execSync(cmd, {
        stdio: ['inherit', 'pipe', 'inherit'] // TODO add todo
    })
        .toString()
        .trim();
}

export function addController(
    canisterName: string,
    identityName: string,
    principal: string
) {
    const currentIdentity = getIdentityName();
    console.info();
    console.info(`Adding ${identityName} as a controller for ${canisterName}`);
    console.info(`You may be prompted for ${currentIdentity}'s password`);
    console.info();
    const cmd = `dfx canister update-settings ${canisterName} --add-controller ${principal}`;
    return execSync(cmd, { stdio: ['inherit', 'pipe', 'inherit'] }); // TODO I would prefer it to pipe the stderr but it will fail immediately if you do that
}
