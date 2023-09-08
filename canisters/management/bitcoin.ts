// TODO I am thinking we should use the same names as ic-btc-types

import {
    blob,
    candid,
    nat32,
    nat64,
    Null,
    Opt,
    Record,
    text,
    Variant,
    Vec
} from '../../src/lib_new';

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

export class BitcoinNetwork extends Variant {
    @candid(Null)
    Mainnet?: Null;

    @candid(Null)
    Regtest?: Null;

    @candid(Null)
    Testnet?: Null;
}

export class Outpoint extends Record {
    @candid(blob)
    txid: blob;

    @candid(nat32)
    vout: nat32;
}

export class Utxo extends Record {
    @candid(nat32)
    height: nat32;

    @candid(Outpoint)
    outpoint: Outpoint;

    @candid(Satoshi)
    value: Satoshi;
}

export class UtxosFilter extends Variant {
    @candid(nat32)
    MinConfirmations?: nat32;

    @candid(Page)
    Page?: Page;
}

export class GetBalanceArgs extends Record {
    @candid(BitcoinAddress)
    address: BitcoinAddress;

    @candid(Opt(nat32))
    min_confirmations: Opt<nat32>;

    @candid(BitcoinNetwork)
    network: BitcoinNetwork;
}

export class GetCurrentFeePercentilesArgs extends Record {
    @candid(BitcoinNetwork)
    network: BitcoinNetwork;
}

export class GetUtxosArgs extends Record {
    @candid(BitcoinAddress)
    address: BitcoinAddress;

    @candid(Opt(UtxosFilter))
    filter: Opt<UtxosFilter>;

    @candid(BitcoinNetwork)
    network: BitcoinNetwork;
}

export class GetUtxosResult extends Record {
    @candid(Opt(Page))
    next_page: Opt<Page>;

    @candid(BlockHash)
    tip_block_hash: BlockHash;

    @candid(nat32)
    tip_height: nat32;

    @candid(Vec(Utxo))
    utxos: Vec<Utxo>;
}

export class SendTransactionArgs extends Record {
    @candid(blob)
    transaction: blob;

    @candid(BitcoinNetwork)
    network: BitcoinNetwork;
}

export class SendTransactionError extends Variant {
    @candid(Null)
    MalformedTransaction?: Null;

    @candid(Null)
    QueueFull?: Null;
}
