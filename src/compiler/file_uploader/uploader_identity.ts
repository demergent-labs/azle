import {
    addController,
    generateIdentity,
    getPrincipal,
    identityExists
} from '../../../dfx';

export const AZLE_UPLOADER_IDENTITY_NAME =
    process.env.AZLE_UPLOADER_IDENTITY_NAME ?? '_azle_file_uploader_identity';

export function generateUploaderIdentity(canisterName: string): string {
    if (!identityExists(AZLE_UPLOADER_IDENTITY_NAME)) {
        generateIdentity(AZLE_UPLOADER_IDENTITY_NAME);
    }

    const principal = getPrincipal(AZLE_UPLOADER_IDENTITY_NAME);

    addController(canisterName, AZLE_UPLOADER_IDENTITY_NAME, principal);

    return AZLE_UPLOADER_IDENTITY_NAME;
}
