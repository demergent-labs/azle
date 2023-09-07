// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
// - https://github.com/dfinity/portal/blob/master/LICENSE
//
// Some documentation changed from original work.

import {
    blob,
    func,
    nat,
    nat8,
    nat32,
    nat64,
    Null,
    Opt,
    Principal,
    Record,
    Service,
    query,
    update,
    text,
    Tuple,
    Variant,
    Vec,
    candid,
    principal
} from '../../src/lib_new';
import {
    ICRC1Account,
    ICRC1SupportedStandard,
    ICRC1TransferArgs,
    ICRC1TransferResult,
    ICRC1Value
} from '../icrc';

// Amount of tokens, measured in 10^-8 of a token.
export class Tokens extends Record {
    @candid(nat64)
    e8s: nat64;
}

// Number of nanoseconds from the UNIX epoch in UTC timezone.
export class TimeStamp extends Record {
    @candid(nat64)
    timestamp_nanos: nat64;
}

// AccountIdentifier is a 32-byte array.
// The first 4 bytes is big-endian encoding of a CRC32 checksum of the last 28 bytes.
export type AccountIdentifier = blob;
export const AccountIdentifier = blob;

// Subaccount is an arbitrary 32-byte byte array.
// Ledger uses subaccounts to compute the source address, which enables one
// principal to control multiple ledger accounts.
export type SubAccount = blob;
export const SubAccount = blob;

// Sequence number of a block produced by the ledger.
export type BlockIndex = nat64;
export const BlockIndex = nat64;

// An arbitrary number associated with a transaction.
// The caller can set it in a `transfer` call as a correlation identifier.
export type Memo = nat64;
export const Memo = nat64;

// Arguments for the `transfer` call.
export class TransferArgs extends Record {
    // Transaction memo.
    // See comments for the `Memo` type.
    @candid(Memo)
    memo: Memo;
    // The amount that the caller wants to transfer to the destination address.
    @candid(Tokens)
    amount: Tokens;
    // The amount that the caller pays for the transaction.
    // Must be 10000 e8s.
    @candid(Tokens)
    fee: Tokens;
    // The subaccount from which the caller wants to transfer funds.
    // If null, the ledger uses the default (all zeros) subaccount to compute the source address.
    // See comments for the `SubAccount` type.
    @candid(Opt(SubAccount))
    from_subaccount: Opt<SubAccount>;
    // The destination account.
    // If the transfer is successful, the balance of this address increases by `amount`.
    @candid(AccountIdentifier)
    to: AccountIdentifier;
    // The point in time when the caller created this request.
    // If null, the ledger uses current IC time as the timestamp.
    @candid(Opt(TimeStamp))
    created_at_time: Opt<TimeStamp>;
}

class BadFee extends Record {
    @candid(Tokens)
    expected_fee: Tokens;
}
class InsufficientFunds extends Record {
    @candid(Tokens)
    balance: Tokens;
}
class TxTooOld extends Record {
    @candid(nat64)
    allowed_window_nanos: nat64;
}
class TxDuplicate extends Record {
    @candid(BlockIndex)
    duplicate_of: BlockIndex;
}
export class TransferError extends Variant {
    // The fee that the caller specified in the transfer request was not the one that ledger expects.
    // The caller can change the transfer fee to the `expected_fee` and retry the request.
    @candid(BadFee)
    BadFee: BadFee;
    // The account specified by the caller doesn't have enough funds.
    @candid(InsufficientFunds)
    InsufficientFunds: InsufficientFunds;
    // The request is too old.
    // The ledger only accepts requests created within 24 hours window.
    // This is a non-recoverable error.
    @candid(TxTooOld)
    TxTooOld: TxTooOld;
    // The caller specified `created_at_time` that is too far in future.
    // The caller can retry the request later.
    @candid(Null)
    TxCreatedInFuture: Null;
    // The ledger has already executed the request.
    // `duplicate_of` field is equal to the index of the block containing the original transaction.
    @candid(TxDuplicate)
    TxDuplicate: TxDuplicate;
}

export class TransferResult extends Variant {
    @candid(nat64)
    Ok: nat64;
    @candid(TransferError)
    Err: TransferError;
}

// Arguments for the `account_balance` call.
export class AccountBalanceArgs extends Record {
    @candid(AccountIdentifier)
    account: AccountIdentifier;
}

export class TransferFeeArg extends Record {}

export class TransferFee extends Record {
    // The fee to pay to perform a transfer
    @candid(Tokens)
    transfer_fee: Tokens;
}

export class GetBlocksArgs extends Record {
    // The index of the first block to fetch.
    @candid(BlockIndex)
    start: BlockIndex;
    // Max number of blocks to fetch.
    @candid(nat64)
    length: nat64;
}

class Mint extends Record {
    @candid(AccountIdentifier)
    to: AccountIdentifier;

    @candid(Tokens)
    amount: Tokens;
}
class Burn extends Record {
    @candid(AccountIdentifier)
    from: AccountIdentifier;

    @candid(Tokens)
    amount: Tokens;
}
class Transfer extends Record {
    @candid(AccountIdentifier)
    from: AccountIdentifier;

    @candid(AccountIdentifier)
    to: AccountIdentifier;

    @candid(Tokens)
    amount: Tokens;

    @candid(Tokens)
    fee: Tokens;
}
export class Operation extends Variant {
    @candid(Mint)
    Mint: Mint;

    @candid(Burn)
    Burn: Burn;

    @candid(Transfer)
    Transfer: Transfer;
}

export class Transaction extends Record {
    @candid(Memo)
    memo: Memo;

    @candid(Opt(Operation))
    operation: Opt<Operation>;

    @candid(TimeStamp)
    created_at_time: TimeStamp;
}

export class Block extends Record {
    @candid(Opt(blob))
    parent_hash: Opt<blob>;

    @candid(Transaction)
    transaction: Transaction;

    @candid(TimeStamp)
    timestamp: TimeStamp;
}

// A prefix of the block range specified in the [GetBlocksArgs] request.
export class BlockRange extends Record {
    // A prefix of the requested block range.
    // The index of the first block is equal to [GetBlocksArgs.from].
    //
    // Note that the number of blocks might be less than the requested
    // [GetBlocksArgs.len] for various reasons, for example:
    //
    // 1. The query might have hit the replica with an outdated state
    //    that doesn't have the full block range yet.
    // 2. The requested range is too large to fit into a single reply.
    //
    // NOTE: the list of blocks can be empty if:
    // 1. [GetBlocksArgs.len] was zero.
    // 2. [GetBlocksArgs.from] was larger than the last block known to the canister.
    @candid(Vec(Block))
    blocks: Vec<Block>;
}

class BadFirstBlockIndex extends Record {
    @candid(BlockIndex)
    requested_index: BlockIndex;

    @candid(BlockIndex)
    first_valid_index: BlockIndex;
}
class Other extends Record {
    @candid(nat64)
    error_code: nat64;
    @candid(text)
    error_message: text;
}
// An error indicating that the arguments passed to [QueryArchiveFn] were invalid.
export class QueryArchiveError extends Variant {
    // [GetBlocksArgs.from] argument was smaller than the first block
    // served by the canister that received the request.
    @candid(BadFirstBlockIndex)
    BadFirstBlockIndex: BadFirstBlockIndex;

    // Reserved for future use.
    @candid(Other)
    Other: Other;
}

export class QueryArchiveResult extends Variant {
    // Successfully fetched zero or more blocks.
    @candid(BlockRange)
    Ok: BlockRange;
    // The [GetBlocksArgs] request was invalid.
    @candid(QueryArchiveError)
    Err: QueryArchiveError;
}

// A function that is used for fetching archived ledger blocks.
@func([GetBlocksArgs], QueryArchiveResult, 'query')
class QueryArchiveFn {}

class ArchivedBlock extends Record {
    // The index of the first archived block that can be fetched using the callback.
    @candid(BlockIndex)
    start: BlockIndex;

    // The number of blocks that can be fetch using the callback.
    @candid(nat64)
    length: nat64;

    // The function that should be called to fetch the archived blocks.
    // The range of the blocks accessible using this function is given by [from]
    // and [len] fields above.
    @candid(QueryArchiveFn)
    callback: QueryArchiveFn;
}
// The result of a "query_blocks" call.
//
// The structure of the result is somewhat complicated because the main ledger canister might
// not have all the blocks that the caller requested: One or more "archive" canisters might
// store some of the requested blocks.
//
// Note: as of Q4 2021 when this interface is authored, the IC doesn't support making nested
// query calls within a query call.
export class QueryBlocksResponse extends Record {
    // The total number of blocks in the chain.
    // If the chain length is positive, the index of the last block is `chain_len - 1`.
    @candid(nat64)
    chain_length: nat64;

    // System certificate for the hash of the latest block in the chain.
    // Only present if `query_blocks` is called in a non-replicated query context.
    @candid(Opt(blob))
    certificate: Opt<blob>;

    // List of blocks that were available in the ledger when it processed the call.
    //
    // The blocks form a contiguous range, with the first block having index
    // [first_block_index] (see below), and the last block having index
    // [first_block_index] + len(blocks) - 1.
    //
    // The block range can be an arbitrary sub-range of the originally requested range.
    @candid(Vec(Block))
    blocks: Vec<Block>;

    // The index of the first block in "blocks".
    // If the blocks vector is empty, the exact value of this field is not specified.
    @candid(BlockIndex)
    first_block_index: BlockIndex;

    // Encoding of instructions for fetching archived blocks whose indices fall into the
    // requested range.
    //
    // For each entry `e` in [archived_blocks], `[e.from, e.from + len)` is a sub-range
    // of the originally requested block range.
    @candid(Vec(ArchivedBlock))
    archived_blocks: Vec<ArchivedBlock>;
}

export class Archive extends Record {
    @candid(principal)
    canister_id: Principal;
}

export class Archives extends Record {
    @candid(Vec(Archive))
    archives: Vec<Archive>;
}

export class SymbolResult extends Record {
    @candid(text)
    symbol: text;
}

export class NameResult extends Record {
    @candid(text)
    name: text;
}

export class DecimalsResult extends Record {
    @candid(nat32)
    decimals: nat32;
}

export type Address = text;
export const Address = text;

export class Ledger extends Service {
    // Transfers tokens from a subaccount of the caller to the destination address.
    // The source address is computed from the principal of the caller and the specified subaccount.
    // When successful, returns the index of the block containing the transaction.
    @update([TransferArgs], TransferResult)
    transfer: (transfer_args: TransferArgs) => TransferResult;

    // Returns the amount of Tokens on the specified account.
    @query([AccountBalanceArgs], Tokens)
    account_balance: (accountBalanceArgs: AccountBalanceArgs) => Tokens;

    // Returns the current transfer_fee.
    @query([TransferFeeArg], TransferFee)
    transfer_fee: (transfer_fee_arg: TransferFeeArg) => TransferFee;

    // Queries blocks in the specified range.
    @query([GetBlocksArgs], QueryBlocksResponse)
    query_blocks: (get_blocks_args: GetBlocksArgs) => QueryBlocksResponse;

    // Returns token symbol.
    @query([], SymbolResult)
    symbol: () => SymbolResult;

    // Returns token name.
    @query([], NameResult)
    name: () => NameResult;

    // Returns token decimals.
    @query([], DecimalsResult)
    decimals: () => DecimalsResult;

    // Returns the existing archive canisters information.
    @query([], Archives)
    archives: () => Archives;

    @query([], Vec(Tuple(text, ICRC1Value)))
    icrc1_metadata: () => [text, ICRC1Value][];

    @query([], text)
    icrc1_name: () => text;

    @query([], text)
    icrc1_symbol: () => text;

    @query([], nat8)
    icrc1_decimals: () => nat8;

    @query([], nat)
    icrc1_fee: () => nat;

    @query([], nat)
    icrc1_total_supply: () => nat;

    @query([], Opt(ICRC1Account))
    icrc1_minting_account: () => Opt<ICRC1Account>;

    @query([ICRC1Account], nat)
    icrc1_balance_of: (account: ICRC1Account) => nat;

    @update([ICRC1TransferArgs], ICRC1TransferResult)
    icrc1_transfer: (transferArgs: ICRC1TransferArgs) => ICRC1TransferResult;

    @query([], Vec(ICRC1SupportedStandard))
    icrc1_supported_standards: () => Vec<ICRC1SupportedStandard>;
}

export {
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from './address';
