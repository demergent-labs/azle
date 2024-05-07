import { nat64 } from 'azle';

export type SendRequest = {
    destinationAddress: string;
    amountInSatoshi: nat64;
};

export type BitcoinTxid = string;
export type DerivationPath = Uint8Array[];
