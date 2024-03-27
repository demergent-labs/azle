import { getCanisterConfig } from '../utils/get_canister_config';
import { unwrap } from '../utils/result';

export function getFilesToUpload(
    canisterName: string,
    srcPath?: string,
    destPath?: string
): [string, string][] {
    if (srcPath !== undefined && destPath !== undefined) {
        return [[srcPath, destPath]];
    }
    if (srcPath === undefined && destPath === undefined) {
        // If both paths are undefined, look at the dfx.json for the assets to upload
        const dfxJson = unwrap(getCanisterConfig(canisterName));
        return dfxJson.assets_large ?? [];
    }
    throw new Error(
        'The source path and destination path must be either both defined or both undefined'
    );
}
