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

export function generateIdentity(name: string) {
    execSync(`dfx identity new ${name} --storage-mode plaintext`);
}

export function useIdentity(name: string) {
    execSync(`dfx identity use ${name}`);
}

export function getIdentities(): string[] {
    const list = execSync(`dfx identity list`).toString().trim();
    const identities = list.split('\n');

    return identities;
}

export function removeIdentity(name: string) {
    execSync(`dfx identity remove ${name}`);
}

export async function getIdentity(
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
