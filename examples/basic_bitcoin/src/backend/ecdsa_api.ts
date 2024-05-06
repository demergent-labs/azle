import { serialize } from 'azle';

import { DerivationPath } from './types';

/// Returns the ECDSA public key of this canister at the given derivation path.
export async function ecdsaPublicKey(
    keyName: string,
    derivationPath: DerivationPath
): Promise<string> {
    const response = await fetch('icp://aaaaa-aa/ecdsa_public_key', {
        body: serialize({
            args: [
                {
                    canister_id: [],
                    derivation_path: derivationPath,
                    key_id: {
                        curve: { secp256k1: null },
                        name: keyName
                    }
                }
            ]
        })
    });
    const ecdsaPublicKey = await response.json();
    return Buffer.from(ecdsaPublicKey.public_key).toString('hex');
}

export async function signWithECDSA(
    keyName: string,
    derivationPath: DerivationPath,
    messageHash: Uint8Array
): Promise<Uint8Array> {
    const publicKeyResponse = await fetch(`icp://aaaaa-aa/sign_with_ecdsa`, {
        body: serialize({
            args: [
                {
                    message_hash: messageHash,
                    derivation_path: derivationPath,
                    key_id: {
                        curve: { secp256k1: null },
                        name: keyName
                    }
                }
            ],
            cycles: 10_000_000_000n
        })
    });
    const publicKeyResult = await publicKeyResponse.json();

    return publicKeyResult.signature;
}
