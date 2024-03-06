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

    const recoveredAddressV0 = ethers.recoverAddress(digest, {
        r,
        s,
        v: v0
    });

    const v =
        address.toLowerCase() === recoveredAddressV0.toLowerCase() ? v0 : v1;

    return {
        r,
        s,
        v
    };
}
