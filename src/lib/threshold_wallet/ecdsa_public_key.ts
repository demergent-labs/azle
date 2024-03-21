import { Principal, serialize } from '../';

import { ThresholdKeyInfo } from './wallet';

export async function ecdsaPublicKey(
    thresholdKeyInfo: ThresholdKeyInfo
): Promise<Uint8Array> {
    const response = await fetch('icp://aaaaa-aa/ecdsa_public_key', {
        body: serialize({
            args: [
                {
                    derivation_path: thresholdKeyInfo.derivationPath,
                    canister_id:
                        thresholdKeyInfo.canisterId === undefined
                            ? []
                            : [Principal.from(thresholdKeyInfo.canisterId)],
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
    const responseJson = await response.json();

    return responseJson.public_key;
}
