import { ethers } from 'ethers';

import { chainId } from '../globals';

export function calculateRsvForTEcdsa(
    address: string,
    digest: string,
    signature: Uint8Array
): { r: string; s: string; v: number } {
    const r = ethers.hexlify(signature.slice(0, 32));
    const s = ethers.hexlify(signature.slice(32, 64));

    const vPartial = chainId * 2 + 35;
    const v0 = vPartial;
    const v1 = vPartial + 1;

    const rsv0 = {
        r,
        s,
        v: v0
    };

    if (
        address.toLowerCase() ===
        ethers.recoverAddress(digest, rsv0).toLowerCase()
    ) {
        return rsv0;
    }

    const rsv1 = {
        r,
        s,
        v: v1
    };

    if (
        address.toLowerCase() ===
        ethers.recoverAddress(digest, rsv1).toLowerCase()
    ) {
        return rsv1;
    }

    throw new Error(`v could not be calculated correctly`);
}
