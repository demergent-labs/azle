import { execSyncPretty } from '../../stable/utils/exec_sync_pretty';

export function logSuccess(canisterName: string, canisterId: string): void {
    const replicaWebServerPort = execSyncPretty(`dfx info webserver-port`)
        .toString()
        .trim();

    const url =
        process.env.DFX_NETWORK === 'ic'
            ? `https://${canisterId}.raw.icp0.io`
            : `http://${canisterId}.localhost:${replicaWebServerPort}`;

    console.info(
        `\nCanister ${canisterName} serving HTTP requests at: ${url}\n`
    );
}
