import { execSync } from 'child_process';
import { Secp256k1KeyIdentity } from '@dfinity/identity-secp256k1';
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
    identityName: string
): Promise<HttpAgent> {
    const agent = new HttpAgent({
        host: getAgentHost(),
        identity: getSecp256k1KeyIdentity(identityName)
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }

    return agent;
}

export function whoami(): string {
    return execSync(`dfx identity whoami`).toString().trim();
}

type StorageMode = 'keyring' | 'password-protected' | 'plaintext';

export function generateIdentity(name: string): Buffer {
    console.info();
    console.info(`Generating identity ${name}`);
    const storageMode = determineStorageMode();
    if (storageMode === undefined) {
        console.info(`You may be prompted to create a password for ${name}`);
        console.info();
        return execSync(`dfx identity new ${name}`, {
            stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
        });
    }
    if (storageMode === 'password-protected') {
        console.info(`You will be prompted to create a password for ${name}`);
        console.info();
    }
    return execSync(`dfx identity new ${name} --storage-mode ${storageMode}`, {
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    });
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

export function getIdentities(): string[] {
    const list = execSync(`dfx identity list`).toString().trim();
    const identities = list.split('\n');

    return identities;
}

export function identityExists(name: string): boolean {
    const identities = getIdentities();
    return identities.includes(name);
}

export function getPemKey(identityName: string): string {
    console.info();
    console.info(`Exporting PEM key for ${identityName}`);
    console.info(`You may be prompted for ${identityName}'s password`);
    console.info();
    const cmd = `dfx identity export ${identityName}`;
    const result = execSync(cmd, {
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    })
        .toString()
        .trim();
    return result;
}

export function getSecp256k1KeyIdentity(
    identityName: string
): Secp256k1KeyIdentity {
    return Secp256k1KeyIdentity.fromPem(getPemKey(identityName));
}

export function getPrincipal(identityName: string): string {
    console.info();
    console.info(`Getting principal for ${identityName}`);
    console.info(`You may be prompted for ${identityName}'s password`);
    console.info();
    const cmd = `dfx identity get-principal --identity ${identityName}`;
    return execSync(cmd, {
        stdio: ['inherit', 'pipe', 'inherit'] // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
    })
        .toString()
        .trim();
}

export function addController(
    canisterName: string,
    identityName: string,
    principal: string
) {
    const currentIdentity = whoami();
    console.info();
    console.info(`Adding ${identityName} as a controller for ${canisterName}`);
    console.info(`You may be prompted for ${currentIdentity}'s password`);
    console.info();
    const cmd = `dfx canister update-settings ${canisterName} --add-controller ${principal}`;
    return execSync(cmd, { stdio: ['inherit', 'pipe', 'inherit'] }); // TODO I would prefer it to pipe the stderr but pipe will cause this command to fail immediately
}
