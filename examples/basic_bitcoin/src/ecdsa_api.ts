import { blob, ic, match, Opt, Vec } from 'azle';
import { managementCanister } from 'azle/canisters/management';

/// Returns the ECDSA public key of this canister at the given derivation path.
export async function ecdsaPublicKey(
    keyName: string,
    derivationPath: Vec<blob>
): Promise<blob> {
    // Retrieve the public key of this canister at the given derivation path
    // from the ECDSA API.
    const res = await managementCanister
        .ecdsa_public_key({
            canister_id: Opt.None,
            derivation_path: derivationPath,
            key_id: {
                curve: {
                    secp256k1: null
                },
                name: keyName
            }
        })
        .call();

    return match(res, {
        Ok: (ok) => ok.public_key,
        Err: (err) => ic.trap(err)
    });
}

export async function signWithECDSA(
    keyName: string,
    derivationPath: Vec<blob>,
    messageHash: blob
): Promise<blob> {
    const res = await managementCanister
        .sign_with_ecdsa({
            message_hash: messageHash,
            derivation_path: derivationPath,
            key_id: {
                curve: {
                    secp256k1: null
                },
                name: keyName
            }
        })
        .cycles(10_000_000_000n)
        .call();

    return match(res, {
        Ok: (ok) => ok.signature,
        Err: (err) => ic.trap(err)
    });
}
