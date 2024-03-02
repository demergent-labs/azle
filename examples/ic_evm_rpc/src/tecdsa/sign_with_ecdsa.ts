import { serialize } from 'azle';

export async function signWithEcdsa(
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
                        name: 'dfx_test_key'
                    }
                }
            ],
            cycles: 10_000_000_000n
        })
    });

    return (await publicKeyResponse.json()).signature;
}
