import {
    addController,
    generateIdentity,
    getPrincipal,
    identityExists
} from '../../../dfx';

export const AZLE_UPLOADER_IDENTITY_NAME = '__azle__fileUploaderIdentity';

export function generateUploaderIdentity(canisterName: string): string {
    if (!identityExists(AZLE_UPLOADER_IDENTITY_NAME)) {
        generateIdentity(AZLE_UPLOADER_IDENTITY_NAME);
    }

    const principal = getPrincipal(AZLE_UPLOADER_IDENTITY_NAME);

    addController(canisterName, principal);

    return AZLE_UPLOADER_IDENTITY_NAME;
}
