import { ethers } from 'ethers';

import { Principal } from '../';
import { calculateRsvForTEcdsa } from './calculate_rsv_for_tecdsa';
import { ecdsaPublicKey } from './ecdsa_public_key';
import { signWithEcdsa } from './sign_with_ecdsa';

import './register_get_url';

export type ThresholdKeyInfo = {
    derivationPath: Uint8Array[];
    canisterId?: Principal | string;
    keyId?: {
        curve: 'secp256k1';
        name: 'dfx_test_key' | 'test_key_1' | 'key_1';
    };
};

export class ThresholdWallet extends ethers.AbstractSigner {
    thresholdKeyInfo: ThresholdKeyInfo;
    address: string | null = null;

    constructor(
        thresholdKeyInfo: ThresholdKeyInfo,
        provider: ethers.Provider | null = null
    ) {
        super(provider);

        this.thresholdKeyInfo = thresholdKeyInfo;
    }

    connect(provider: ethers.Provider | null): ThresholdWallet {
        return new ThresholdWallet(this.thresholdKeyInfo, provider);
    }

    async getAddress(): Promise<string> {
        if (this.address === null) {
            this.address = ethers.computeAddress(
                ethers.hexlify(await ecdsaPublicKey(this.thresholdKeyInfo))
            );
        }

        return this.address;
    }

    async signTransaction(
        txRequest: ethers.TransactionRequest
    ): Promise<string> {
        // TODO Hopefully we can remove the explicit any after this is resolved: https://github.com/ethers-io/ethers.js/issues/4659
        let tx = ethers.Transaction.from(txRequest as any);

        const unsignedSerializedTx = tx.unsignedSerialized;
        const unsignedSerializedTxHash = ethers.keccak256(unsignedSerializedTx);

        const signedSerializedTxHash = await signWithEcdsa(
            this.thresholdKeyInfo,
            ethers.getBytes(unsignedSerializedTxHash)
        );

        if (this.provider === null) {
            throw new Error(`ThresholdWallet: provider must not be null`);
        }

        const network = await this.provider.getNetwork();
        const chainId = Number(network.chainId);

        const { r, s, v } = calculateRsvForTEcdsa(
            chainId,
            await this.getAddress(),
            unsignedSerializedTxHash,
            signedSerializedTxHash
        );

        tx.signature = {
            r,
            s,
            v
        };

        const rawTransaction = tx.serialized;

        return rawTransaction;
    }

    // TODO implement?
    async signMessage(message: string | Uint8Array): Promise<string> {
        throw new Error(`ThresholdWallet: signMessage is not implemented`);
    }

    // TODO implement?
    async signTypedData(
        domain: ethers.TypedDataDomain,
        types: Record<string, ethers.TypedDataField[]>,
        value: Record<string, any>
    ): Promise<string> {
        throw new Error(`ThresholdWallet: signTypedData is not implemented`);
    }
}
