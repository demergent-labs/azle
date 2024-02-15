import { execSync } from 'child_process';

import { green } from './colors';

export function logSuccess(
    canisterName: string,
    replicaWebServerPort: string
): void {
    const canisterId = execSync(`dfx canister id ${canisterName}`)
        .toString()
        .trim();

    console.info(
        `\n🎉 Canister ${green(canisterName)} available at ${green(
            `http://${canisterId}.localhost:${replicaWebServerPort}`
        )}\n`
    );
}
