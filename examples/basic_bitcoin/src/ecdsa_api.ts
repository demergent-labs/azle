import { serialize } from 'azle';

// The fee for the `sign_with_ecdsa` endpoint using the test key.
const SIGN_WITH_ECDSA_COST_CYCLES: bigint = 10_000_000_000n;

/// Returns the ECDSA public key of this canister at the given derivation path.
export async function ecdsaPublicKey(
    keyName: string,
    derivationPath: Uint8Array[]
): Promise<Uint8Array> {
    // Retrieve the public key of this canister at the given derivation path
    // from the ECDSA API.
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
    const res = await response.json();

    return res.public_key;
}

export async function signWithECDSA(
    keyName: string,
    derivationPath: Uint8Array[],
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
            cycles: SIGN_WITH_ECDSA_COST_CYCLES
        })
    });
    const res = await publicKeyResponse.json();

    return res.signature;
}
