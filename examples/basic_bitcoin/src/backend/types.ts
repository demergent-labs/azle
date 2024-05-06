import { nat64 } from 'azle';

export type SendRequest = {
    destinationAddress: string;
    amountInSatoshi: nat64;
};

// TODO decide if we are going to use this or not
export type ThresholdKeyInfo = {
    derivationPath: DerivationPath;
    keyId?: {
        curve: 'secp256k1';
        name: 'dfx_test_key' | 'test_key_1' | 'key_1';
    };
};

export type BitcoinTxid = string;
export type DerivationPath = Uint8Array[];
