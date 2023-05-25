import { nat64, Record } from 'azle';

export type SendRequest = Record<{
    destinationAddress: string;
    amountInSatoshi: nat64;
}>;
