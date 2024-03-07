import { serialize } from 'azle';

export async function ecdsaPublicKey(
    derivationPath: Uint8Array[]
): Promise<Uint8Array> {
    const response = await fetch('icp://aaaaa-aa/ecdsa_public_key', {
        body: serialize({
            args: [
                {
                    canister_id: [],
                    derivation_path: derivationPath,
                    key_id: {
                        curve: { secp256k1: null },
                        name: 'dfx_test_key'
                    }
                }
            ]
        })
    });
    const responseJson = await response.json();

    return responseJson.public_key;
}
