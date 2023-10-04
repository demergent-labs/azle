// TODO I am thinking we should use the same names as ic-btc-types

import {
    blob,
    nat32,
    nat64,
    Null,
    Opt,
    Record,
    text,
    Variant,
    Vec
} from '../../src/lib';

export type BitcoinAddress = text;
export const BitcoinAddress = text;
export type BlockHash = blob;
export const BlockHash = blob;
export type Page = blob;
export const Page = blob;
export type MillisatoshiPerByte = nat64;
export const MillisatoshiPerByte = nat64;
export type Satoshi = nat64;
export const Satoshi = nat64;

export const BitcoinNetwork = Variant({
    Mainnet: Null,
    Regtest: Null,
    Testnet: Null
});

export const Outpoint = Record({
    txid: blob,
    vout: nat32
});

export const Utxo = Record({
    height: nat32,
    outpoint: Outpoint,
    value: Satoshi
});

export const UtxosFilter = Variant({
    MinConfirmations: nat32,
    Page: Page
});

export const GetBalanceArgs = Record({
    address: BitcoinAddress,
    min_confirmations: Opt(nat32),
    network: BitcoinNetwork
});

export const GetCurrentFeePercentilesArgs = Record({
    network: BitcoinNetwork
});

export const GetUtxosArgs = Record({
    address: BitcoinAddress,
    filter: Opt(UtxosFilter),
    network: BitcoinNetwork
});

export const GetUtxosResult = Record({
    next_page: Opt(Page),
    tip_block_hash: BlockHash,
    tip_height: nat32,
    utxos: Vec(Utxo)
});

export const SendTransactionArgs = Record({
    transaction: blob,
    network: BitcoinNetwork
});

export const SendTransactionError = Variant({
    MalformedTransaction: Null,
    QueueFull: Null
});
