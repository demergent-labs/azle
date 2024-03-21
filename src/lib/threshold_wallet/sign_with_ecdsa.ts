import { serialize } from '../';

import { ThresholdKeyInfo } from './wallet';

export async function signWithEcdsa(
    thresholdKeyInfo: ThresholdKeyInfo,
    messageHash: Uint8Array
): Promise<Uint8Array> {
    const publicKeyResponse = await fetch(`icp://aaaaa-aa/sign_with_ecdsa`, {
        body: serialize({
            args: [
                {
                    message_hash: messageHash,
                    derivation_path: thresholdKeyInfo.derivationPath,
                    key_id: {
                        curve: {
                            [thresholdKeyInfo.keyId?.curve ?? 'secp256k1']: null
                        },
                        name: thresholdKeyInfo.keyId?.name ?? 'dfx_test_key'
                    }
                }
            ]
        })
    });

    return (await publicKeyResponse.json()).signature;
}
