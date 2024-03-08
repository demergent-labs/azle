import { green } from './colors';

export function logSuccess(
    canisterName: string,
    canisterId: string,
    replicaWebServerPort: string
): void {
    const url =
        process.env.DFX_NETWORK === 'ic'
            ? `https://${canisterId}.raw.icp0.io`
            : `http://${canisterId}.localhost:${replicaWebServerPort}`;

    console.info(
        `\n🎉 Canister ${green(canisterName)} will be available at ${green(
            url
        )}\n`
    );
}
