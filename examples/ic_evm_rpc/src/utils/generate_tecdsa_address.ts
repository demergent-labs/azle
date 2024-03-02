import { ic, serialize } from 'azle';
import { ethers } from 'ethers';

export async function generateTEcdsaAddress(
    derivationPath: Uint8Array[]
): Promise<string> {
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

    const address = ethers.computeAddress(
        ethers.hexlify(responseJson.public_key)
    );

    return address;
}
