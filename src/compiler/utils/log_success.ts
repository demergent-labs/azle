import { green } from './colors';

export function logSuccess(
    canisterName: string,
    canisterId: string,
    replicaWebServerPort: string
): void {
    console.info(
        `\n🎉 Canister ${green(canisterName)} available at ${green(
            `http://${canisterId}.localhost:${replicaWebServerPort}`
        )}\n`
    );
}
