import { getCanisterConfig } from '../../../../stable/utils/get_canister_config';

export async function getFilesToUpload(
    canisterName: string,
    srcPath?: string,
    destPath?: string
): Promise<[string, string][]> {
    if (srcPath !== undefined && destPath !== undefined) {
        return [[srcPath, destPath]];
    }
    if (srcPath === undefined && destPath === undefined) {
        // If both paths are undefined, look at the dfx.json for the assets to upload
        const dfxJson = await getCanisterConfig(canisterName);
        return dfxJson.custom?.assets ?? [];
    }
    throw new Error(
        'The source path and destination path must be either both defined or both undefined'
    );
}
