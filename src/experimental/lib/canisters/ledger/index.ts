import '#experimental/lib/experimental';

// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
// - https://github.com/dfinity/portal/blob/master/LICENSE
//
// Some documentation changed from original work.
import {
    blob,
    Canister,
    Func,
    nat,
    nat8,
    nat32,
    nat64,
    Null,
    Opt,
    Principal,
    query,
    Record,
    text,
    Tuple,
    update,
    Variant,
    Vec
} from '#experimental/lib/index';

import * as icrc from '../icrc';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Amount of tokens, measured in 10^-8 of a token.
export const Tokens = Record({
    e8s: nat64
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Tokens = typeof Tokens.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Number of nanoseconds from the UNIX epoch in UTC timezone.
export const TimeStamp = Record({
    timestamp_nanos: nat64
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TimeStamp = typeof TimeStamp.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// AccountIdentifier is a 32-byte array.
// The first 4 bytes is big-endian encoding of a CRC32 checksum of the last 28 bytes.
export const AccountIdentifier = blob;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type AccountIdentifier = blob;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Subaccount is an arbitrary 32-byte byte array.
// Ledger uses subaccounts to compute the source address, which enables one
// principal to control multiple ledger accounts.
export const SubAccount = blob;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type SubAccount = blob;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Sequence number of a block produced by the ledger.
export const BlockIndex = nat64;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type BlockIndex = nat64;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// An arbitrary number associated with a transaction.
// The caller can set it in a `transfer` call as a correlation identifier.
export const Memo = nat64;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Memo = nat64;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Arguments for the `transfer` call.
export const TransferArgs = Record({
    // Transaction memo.
    // See comments for the `Memo` type.
    memo: Memo,
    // The amount that the caller wants to transfer to the destination address.
    amount: Tokens,
    // The amount that the caller pays for the transaction.
    // Must be 10000 e8s.
    fee: Tokens,
    // The subaccount from which the caller wants to transfer funds.
    // If null, the ledger uses the default (all zeros) subaccount to compute the source address.
    // See comments for the `SubAccount` type.
    from_subaccount: Opt(SubAccount),
    // The destination account.
    // If the transfer is successful, the balance of this address increases by `amount`.
    to: AccountIdentifier,
    // The point in time when the caller created this request.
    // If null, the ledger uses current IC time as the timestamp.
    created_at_time: Opt(TimeStamp)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferArgs = typeof TransferArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const BadFee = Record({
    expected_fee: Tokens
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type BadFee = typeof BadFee.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const InsufficientFunds = Record({
    balance: Tokens
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type InsufficientFunds = typeof InsufficientFunds.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TxTooOld = Record({
    allowed_window_nanos: nat64
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TxTooOld = typeof TxTooOld.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TxDuplicate = Record({
    duplicate_of: BlockIndex
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TxDuplicate = typeof TxDuplicate.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferError = Variant({
    // The fee that the caller specified in the transfer request was not the one that ledger expects.
    // The caller can change the transfer fee to the `expected_fee` and retry the request.
    BadFee: BadFee,
    // The account specified by the caller doesn't have enough funds.
    InsufficientFunds: InsufficientFunds,
    // The request is too old.
    // The ledger only accepts requests created within 24 hours window.
    // This is a non-recoverable error.
    TxTooOld: TxTooOld,
    // The caller specified `created_at_time` that is too far in future.
    // The caller can retry the request later.
    TxCreatedInFuture: Null,
    // The ledger has already executed the request.
    // `duplicate_of` field is equal to the index of the block containing the original transaction.
    TxDuplicate: TxDuplicate
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferError = typeof TransferError.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferResult = Variant({
    Ok: nat64,
    Err: TransferError
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferResult = typeof TransferResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// Arguments for the `account_balance` call.
export const AccountBalanceArgs = Record({
    account: AccountIdentifier
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type AccountBalanceArgs = typeof AccountBalanceArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferFeeArg = Record({});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferFeeArg = typeof TransferFeeArg.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const TransferFee = Record({
    // The fee to pay to perform a transfer
    transfer_fee: Tokens
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type TransferFee = typeof TransferFee.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const GetBlocksArgs = Record({
    // The index of the first block to fetch.
    start: BlockIndex,
    // Max number of blocks to fetch.
    length: nat64
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type GetBlocksArgs = typeof GetBlocksArgs.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Mint = Record({
    to: AccountIdentifier,
    amount: Tokens
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Mint = typeof Mint.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Burn = Record({
    from: AccountIdentifier,
    amount: Tokens
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Burn = typeof Burn.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Transfer = Record({
    from: AccountIdentifier,
    to: AccountIdentifier,
    amount: Tokens,
    fee: Tokens
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Transfer = typeof Transfer.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Operation = Variant({
    Mint: Mint,
    Burn: Burn,
    Transfer: Transfer
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Operation = typeof Operation.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Transaction = Record({
    memo: Memo,
    operation: Opt(Operation),
    created_at_time: TimeStamp
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Transaction = typeof Transaction.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Block = Record({
    parent_hash: Opt(blob),
    transaction: Transaction,
    timestamp: TimeStamp
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Block = typeof Block.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// A prefix of the block range specified in the [GetBlocksArgs] request.
export const BlockRange = Record({
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
    blocks: Vec(Block)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type BlockRange = typeof BlockRange.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const BadFirstBlockIndex = Record({
    requested_index: BlockIndex,
    first_valid_index: BlockIndex
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type BadFirstBlockIndex = typeof BadFirstBlockIndex.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Other = Record({
    error_code: nat64,
    error_message: text
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Other = typeof Other.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// An error indicating that the arguments passed to [QueryArchiveFn] were invalid.
export const QueryArchiveError = Variant({
    // [GetBlocksArgs.from] argument was smaller than the first block
    // served by the canister that received the request.
    BadFirstBlockIndex: BadFirstBlockIndex,
    // Reserved for future use.
    Other: Other
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type QueryArchiveError = typeof QueryArchiveError.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const QueryArchiveResult = Variant({
    // Successfully fetched zero or more blocks.
    Ok: BlockRange,
    // The [GetBlocksArgs] request was invalid.
    Err: QueryArchiveError
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type QueryArchiveResult = typeof QueryArchiveResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// A function that is used for fetching archived ledger blocks.
export const QueryArchiveFn = Func(
    [GetBlocksArgs],
    QueryArchiveResult,
    'query'
);
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type QueryArchiveFn = typeof QueryArchiveFn.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const ArchivedBlock = Record({
    // The index of the first archived block that can be fetched using the callback.
    start: BlockIndex,
    // The number of blocks that can be fetch using the callback.
    length: nat64,
    // The function that should be called to fetch the archived blocks.
    // The range of the blocks accessible using this function is given by [from]
    // and [len] fields above.
    callback: QueryArchiveFn
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type ArchivedBlock = typeof ArchivedBlock.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
// The result of a "query_blocks" call.
//
// The structure of the result is somewhat complicated because the main ledger canister might
// not have all the blocks that the caller requested: One or more "archive" canisters might
// store some of the requested blocks.
//
// Note: as of Q4 2021 when this interface is authored, the IC doesn't support making nested
// query calls within a query call.
export const QueryBlocksResponse = Record({
    // The total number of blocks in the chain.
    // If the chain length is positive, the index of the last block is `chain_len - 1`.
    chain_length: nat64,
    // System certificate for the hash of the latest block in the chain.
    // Only present if `query_blocks` is called in a non-replicated query context.
    certificate: Opt(blob),
    // List of blocks that were available in the ledger when it processed the call.
    //
    // The blocks form a contiguous range, with the first block having index
    // [first_block_index] (see below), and the last block having index
    // [first_block_index] + len(blocks) - 1.
    //
    // The block range can be an arbitrary sub-range of the originally requested range.
    blocks: Vec(Block),
    // The index of the first block in "blocks".
    // If the blocks vector is empty, the exact value of this field is not specified.
    first_block_index: BlockIndex,
    // Encoding of instructions for fetching archived blocks whose indices fall into the
    // requested range.
    //
    // For each entry `e` in [archived_blocks], `[e.from, e.from + len)` is a sub-range
    // of the originally requested block range.
    archived_blocks: Vec(ArchivedBlock)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type QueryBlocksResponse = typeof QueryBlocksResponse.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Archive = Record({
    canister_id: Principal
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Archive = typeof Archive.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Archives = Record({
    archives: Vec(Archive)
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Archives = typeof Archives.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const SymbolResult = Record({
    symbol: text
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type SymbolResult = typeof SymbolResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const NameResult = Record({
    name: text
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type NameResult = typeof NameResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const DecimalsResult = Record({
    decimals: nat32
});
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type DecimalsResult = typeof DecimalsResult.tsType;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Address = text;
/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export type Address = text;

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle/canisters`.
 */
export const Ledger = Canister({
    // Transfers tokens from a subaccount of the caller to the destination address.
    // The source address is computed from the principal of the caller and the specified subaccount.
    // When successful, returns the index of the block containing the transaction.
    transfer: update([TransferArgs], TransferResult),
    // Returns the amount of Tokens on the specified account.
    account_balance: query([AccountBalanceArgs], Tokens),
    // Returns the current transfer_fee.
    transfer_fee: query([TransferFeeArg], TransferFee),
    // Queries blocks in the specified range.
    query_blocks: query([GetBlocksArgs], QueryBlocksResponse),
    // Returns token symbol.
    symbol: query([], SymbolResult),
    // Returns token name.
    name: query([], NameResult),
    // Returns token decimals.
    decimals: query([], DecimalsResult),
    // Returns the existing archive canisters information.
    archives: query([], Archives),
    icrc1_metadata: query([], Vec(Tuple(text, icrc.Value))),
    icrc1_name: query([], text),
    icrc1_symbol: query([], text),
    icrc1_decimals: query([], nat8),
    icrc1_fee: query([], nat),
    icrc1_total_supply: query([], nat),
    icrc1_minting_account: query([], Opt(icrc.Account)),
    icrc1_balance_of: query([icrc.Account], nat),
    icrc1_transfer: update([icrc.TransferArgs], icrc.TransferResult),
    icrc1_supported_standards: query([], Vec(icrc.SupportedStandard))
});

export {
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from './address';
