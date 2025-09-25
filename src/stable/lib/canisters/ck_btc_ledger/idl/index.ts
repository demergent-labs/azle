import { ActorMethod } from '@icp-sdk/core/agent';
import { IDL } from '@icp-sdk/core/candid';
import { Principal } from '@icp-sdk/core/principal';

export interface Account {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
}
export interface Allowance {
    allowance: bigint;
    expires_at: [] | [bigint];
}
export interface AllowanceArgs {
    account: Account;
    spender: Account;
}
export interface Approve {
    fee: [] | [bigint];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    expected_allowance: [] | [bigint];
    expires_at: [] | [bigint];
    spender: Account;
}
export interface ApproveArgs {
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    expected_allowance: [] | [bigint];
    expires_at: [] | [bigint];
    spender: Account;
}
export type ApproveError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { AllowanceChanged: { current_allowance: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { Expired: { ledger_time: bigint } }
    | { InsufficientFunds: { balance: bigint } };
export interface ArchiveInfo {
    block_range_end: bigint;
    canister_id: Principal;
    block_range_start: bigint;
}
export interface ArchiveOptions {
    num_blocks_to_archive: bigint;
    max_transactions_per_response: [] | [bigint];
    trigger_threshold: bigint;
    more_controller_ids: [] | [Array<Principal>];
    max_message_size_bytes: [] | [bigint];
    cycles_for_archive_creation: [] | [bigint];
    node_max_memory_size_bytes: [] | [bigint];
    controller_id: Principal;
}
export interface ArchivedBlocks {
    args: Array<GetBlocksRequest>;
    callback: [Principal, string];
}
export interface ArchivedRange {
    callback: [Principal, string];
    start: bigint;
    length: bigint;
}
export interface ArchivedRange_1 {
    callback: [Principal, string];
    start: bigint;
    length: bigint;
}
export interface BlockRange {
    blocks: Array<Value>;
}
export interface BlockWithId {
    id: bigint;
    block: ICRC3Value;
}
export interface Burn {
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    spender: [] | [Account];
}
export interface ChangeArchiveOptions {
    num_blocks_to_archive: [] | [bigint];
    max_transactions_per_response: [] | [bigint];
    trigger_threshold: [] | [bigint];
    more_controller_ids: [] | [Array<Principal>];
    max_message_size_bytes: [] | [bigint];
    cycles_for_archive_creation: [] | [bigint];
    node_max_memory_size_bytes: [] | [bigint];
    controller_id: [] | [Principal];
}
export type ChangeFeeCollector = { SetTo: Account } | { Unset: null };
export interface ConsentInfo {
    metadata: ConsentMessageMetadata;
    consent_message: ConsentMessage;
}
export type ConsentMessage =
    | {
          LineDisplayMessage: { pages: Array<LineDisplayPage> };
      }
    | { GenericDisplayMessage: string };
export interface ConsentMessageMetadata {
    utc_offset_minutes: [] | [number];
    language: string;
}
export interface ConsentMessageRequest {
    arg: Uint8Array | number[];
    method: string;
    user_preferences: ConsentMessageSpec;
}
export interface ConsentMessageSpec {
    metadata: ConsentMessageMetadata;
    device_spec: [] | [DisplayMessageType];
}
export interface DataCertificate {
    certificate: [] | [Uint8Array | number[]];
    hash_tree: Uint8Array | number[];
}
export type DisplayMessageType =
    | { GenericDisplay: null }
    | {
          LineDisplay: {
              characters_per_line: number;
              lines_per_page: number;
          };
      };
export interface ErrorInfo {
    description: string;
}
export interface FeatureFlags {
    icrc2: boolean;
}
export interface GetArchivesArgs {
    from: [] | [Principal];
}
export interface GetBlocksRequest {
    start: bigint;
    length: bigint;
}
export interface GetBlocksResponse {
    certificate: [] | [Uint8Array | number[]];
    first_index: bigint;
    blocks: Array<Value>;
    chain_length: bigint;
    archived_blocks: Array<ArchivedRange>;
}
export interface GetBlocksResult {
    log_length: bigint;
    blocks: Array<BlockWithId>;
    archived_blocks: Array<ArchivedBlocks>;
}
export interface GetTransactionsResponse {
    first_index: bigint;
    log_length: bigint;
    transactions: Array<Transaction>;
    archived_transactions: Array<ArchivedRange_1>;
}
export interface ICRC3ArchiveInfo {
    end: bigint;
    canister_id: Principal;
    start: bigint;
}
export interface ICRC3DataCertificate {
    certificate: Uint8Array | number[];
    hash_tree: Uint8Array | number[];
}
export type ICRC3Value =
    | { Int: bigint }
    | { Map: Array<[string, ICRC3Value]> }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string }
    | { Array: Array<ICRC3Value> };
export type Icrc21Error =
    | {
          GenericError: { description: string; error_code: bigint };
      }
    | { InsufficientPayment: ErrorInfo }
    | { UnsupportedCanisterCall: ErrorInfo }
    | { ConsentMessageUnavailable: ErrorInfo };
export interface InitArgs {
    decimals: [] | [number];
    token_symbol: string;
    transfer_fee: bigint;
    metadata: Array<[string, MetadataValue]>;
    minting_account: Account;
    initial_balances: Array<[Account, bigint]>;
    fee_collector_account: [] | [Account];
    archive_options: ArchiveOptions;
    max_memo_length: [] | [number];
    token_name: string;
    feature_flags: [] | [FeatureFlags];
}
export type LedgerArgument =
    | { Upgrade: [] | [UpgradeArgs] }
    | { Init: InitArgs };
export interface LineDisplayPage {
    lines: Array<string>;
}
export type MetadataValue =
    | { Int: bigint }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string };
export interface Mint {
    to: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type Result = { Ok: bigint } | { Err: TransferError };
export type Result_1 = { Ok: ConsentInfo } | { Err: Icrc21Error };
export type Result_2 = { Ok: bigint } | { Err: ApproveError };
export type Result_3 = { Ok: bigint } | { Err: TransferFromError };
export interface StandardRecord {
    url: string;
    name: string;
}
export interface SupportedBlockType {
    url: string;
    block_type: string;
}
export interface Transaction {
    burn: [] | [Burn];
    kind: string;
    mint: [] | [Mint];
    approve: [] | [Approve];
    timestamp: bigint;
    transfer: [] | [Transfer];
}
export interface TransactionRange {
    transactions: Array<Transaction>;
}
export interface Transfer {
    to: Account;
    fee: [] | [bigint];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    spender: [] | [Account];
}
export interface TransferArg {
    to: Account;
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type TransferError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface TransferFromArgs {
    to: Account;
    fee: [] | [bigint];
    spender_subaccount: [] | [Uint8Array | number[]];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type TransferFromError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { InsufficientAllowance: { allowance: bigint } }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface UpgradeArgs {
    change_archive_options: [] | [ChangeArchiveOptions];
    token_symbol: [] | [string];
    transfer_fee: [] | [bigint];
    metadata: [] | [Array<[string, MetadataValue]>];
    change_fee_collector: [] | [ChangeFeeCollector];
    max_memo_length: [] | [number];
    token_name: [] | [string];
    feature_flags: [] | [FeatureFlags];
}
export type Value =
    | { Int: bigint }
    | { Map: Array<[string, Value]> }
    | { Nat: bigint }
    | { Nat64: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string }
    | { Array: Vec };
export type Vec = Array<
    | { Int: bigint }
    | { Map: Array<[string, Value]> }
    | { Nat: bigint }
    | { Nat64: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string }
    | { Array: Vec }
>;
export interface _SERVICE {
    archives: ActorMethod<[], Array<ArchiveInfo>>;
    get_blocks: ActorMethod<[GetBlocksRequest], GetBlocksResponse>;
    get_data_certificate: ActorMethod<[], DataCertificate>;
    get_transactions: ActorMethod<[GetBlocksRequest], GetTransactionsResponse>;
    icrc10_supported_standards: ActorMethod<[], Array<StandardRecord>>;
    icrc1_balance_of: ActorMethod<[Account], bigint>;
    icrc1_decimals: ActorMethod<[], number>;
    icrc1_fee: ActorMethod<[], bigint>;
    icrc1_metadata: ActorMethod<[], Array<[string, MetadataValue]>>;
    icrc1_minting_account: ActorMethod<[], [] | [Account]>;
    icrc1_name: ActorMethod<[], string>;
    icrc1_supported_standards: ActorMethod<[], Array<StandardRecord>>;
    icrc1_symbol: ActorMethod<[], string>;
    icrc1_total_supply: ActorMethod<[], bigint>;
    icrc1_transfer: ActorMethod<[TransferArg], Result>;
    icrc21_canister_call_consent_message: ActorMethod<
        [ConsentMessageRequest],
        Result_1
    >;
    icrc2_allowance: ActorMethod<[AllowanceArgs], Allowance>;
    icrc2_approve: ActorMethod<[ApproveArgs], Result_2>;
    icrc2_transfer_from: ActorMethod<[TransferFromArgs], Result_3>;
    icrc3_get_archives: ActorMethod<[GetArchivesArgs], Array<ICRC3ArchiveInfo>>;
    icrc3_get_blocks: ActorMethod<[Array<GetBlocksRequest>], GetBlocksResult>;
    icrc3_get_tip_certificate: ActorMethod<[], [] | [ICRC3DataCertificate]>;
    icrc3_supported_block_types: ActorMethod<[], Array<SupportedBlockType>>;
    is_ledger_ready: ActorMethod<[], boolean>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const GetBlocksResult = IDL.Rec();
export const ICRC3Value = IDL.Rec();
export const Value = IDL.Rec();
export const Vec = IDL.Rec();
export const ChangeArchiveOptions = IDL.Record({
    num_blocks_to_archive: IDL.Opt(IDL.Nat64),
    max_transactions_per_response: IDL.Opt(IDL.Nat64),
    trigger_threshold: IDL.Opt(IDL.Nat64),
    more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
    node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
    controller_id: IDL.Opt(IDL.Principal)
});
export const MetadataValue = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text
});
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const ChangeFeeCollector = IDL.Variant({
    SetTo: Account,
    Unset: IDL.Null
});
export const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
export const UpgradeArgs = IDL.Record({
    change_archive_options: IDL.Opt(ChangeArchiveOptions),
    token_symbol: IDL.Opt(IDL.Text),
    transfer_fee: IDL.Opt(IDL.Nat),
    metadata: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))),
    change_fee_collector: IDL.Opt(ChangeFeeCollector),
    max_memo_length: IDL.Opt(IDL.Nat16),
    token_name: IDL.Opt(IDL.Text),
    feature_flags: IDL.Opt(FeatureFlags)
});
export const ArchiveOptions = IDL.Record({
    num_blocks_to_archive: IDL.Nat64,
    max_transactions_per_response: IDL.Opt(IDL.Nat64),
    trigger_threshold: IDL.Nat64,
    more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
    node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
    controller_id: IDL.Principal
});
export const InitArgs = IDL.Record({
    decimals: IDL.Opt(IDL.Nat8),
    token_symbol: IDL.Text,
    transfer_fee: IDL.Nat,
    metadata: IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue)),
    minting_account: Account,
    initial_balances: IDL.Vec(IDL.Tuple(Account, IDL.Nat)),
    fee_collector_account: IDL.Opt(Account),
    archive_options: ArchiveOptions,
    max_memo_length: IDL.Opt(IDL.Nat16),
    token_name: IDL.Text,
    feature_flags: IDL.Opt(FeatureFlags)
});
export const LedgerArgument = IDL.Variant({
    Upgrade: IDL.Opt(UpgradeArgs),
    Init: InitArgs
});
export const ArchiveInfo = IDL.Record({
    block_range_end: IDL.Nat,
    canister_id: IDL.Principal,
    block_range_start: IDL.Nat
});
export const GetBlocksRequest = IDL.Record({
    start: IDL.Nat,
    length: IDL.Nat
});
Vec.fill(
    IDL.Vec(
        IDL.Variant({
            Int: IDL.Int,
            Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
            Nat: IDL.Nat,
            Nat64: IDL.Nat64,
            Blob: IDL.Vec(IDL.Nat8),
            Text: IDL.Text,
            Array: Vec
        })
    )
);
Value.fill(
    IDL.Variant({
        Int: IDL.Int,
        Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
        Nat: IDL.Nat,
        Nat64: IDL.Nat64,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text,
        Array: Vec
    })
);
export const BlockRange = IDL.Record({ blocks: IDL.Vec(Value) });
export const ArchivedRange = IDL.Record({
    callback: IDL.Func([GetBlocksRequest], [BlockRange], ['query']),
    start: IDL.Nat,
    length: IDL.Nat
});
export const GetBlocksResponse = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    first_index: IDL.Nat,
    blocks: IDL.Vec(Value),
    chain_length: IDL.Nat64,
    archived_blocks: IDL.Vec(ArchivedRange)
});
export const DataCertificate = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    hash_tree: IDL.Vec(IDL.Nat8)
});
export const Burn = IDL.Record({
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    spender: IDL.Opt(Account)
});
export const Mint = IDL.Record({
    to: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const Approve = IDL.Record({
    fee: IDL.Opt(IDL.Nat),
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    expected_allowance: IDL.Opt(IDL.Nat),
    expires_at: IDL.Opt(IDL.Nat64),
    spender: Account
});
export const Transfer = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    spender: IDL.Opt(Account)
});
export const Transaction = IDL.Record({
    burn: IDL.Opt(Burn),
    kind: IDL.Text,
    mint: IDL.Opt(Mint),
    approve: IDL.Opt(Approve),
    timestamp: IDL.Nat64,
    transfer: IDL.Opt(Transfer)
});
export const TransactionRange = IDL.Record({
    transactions: IDL.Vec(Transaction)
});
export const ArchivedRange_1 = IDL.Record({
    callback: IDL.Func([GetBlocksRequest], [TransactionRange], ['query']),
    start: IDL.Nat,
    length: IDL.Nat
});
export const GetTransactionsResponse = IDL.Record({
    first_index: IDL.Nat,
    log_length: IDL.Nat,
    transactions: IDL.Vec(Transaction),
    archived_transactions: IDL.Vec(ArchivedRange_1)
});
export const StandardRecord = IDL.Record({
    url: IDL.Text,
    name: IDL.Text
});
export const TransferArg = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const TransferError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const Result = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
export const ConsentMessageMetadata = IDL.Record({
    utc_offset_minutes: IDL.Opt(IDL.Int16),
    language: IDL.Text
});
export const DisplayMessageType = IDL.Variant({
    GenericDisplay: IDL.Null,
    LineDisplay: IDL.Record({
        characters_per_line: IDL.Nat16,
        lines_per_page: IDL.Nat16
    })
});
export const ConsentMessageSpec = IDL.Record({
    metadata: ConsentMessageMetadata,
    device_spec: IDL.Opt(DisplayMessageType)
});
export const ConsentMessageRequest = IDL.Record({
    arg: IDL.Vec(IDL.Nat8),
    method: IDL.Text,
    user_preferences: ConsentMessageSpec
});
export const LineDisplayPage = IDL.Record({ lines: IDL.Vec(IDL.Text) });
export const ConsentMessage = IDL.Variant({
    LineDisplayMessage: IDL.Record({ pages: IDL.Vec(LineDisplayPage) }),
    GenericDisplayMessage: IDL.Text
});
export const ConsentInfo = IDL.Record({
    metadata: ConsentMessageMetadata,
    consent_message: ConsentMessage
});
export const ErrorInfo = IDL.Record({ description: IDL.Text });
export const Icrc21Error = IDL.Variant({
    GenericError: IDL.Record({
        description: IDL.Text,
        error_code: IDL.Nat
    }),
    InsufficientPayment: ErrorInfo,
    UnsupportedCanisterCall: ErrorInfo,
    ConsentMessageUnavailable: ErrorInfo
});
export const Result_1 = IDL.Variant({
    Ok: ConsentInfo,
    Err: Icrc21Error
});
export const AllowanceArgs = IDL.Record({
    account: Account,
    spender: Account
});
export const Allowance = IDL.Record({
    allowance: IDL.Nat,
    expires_at: IDL.Opt(IDL.Nat64)
});
export const ApproveArgs = IDL.Record({
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    expected_allowance: IDL.Opt(IDL.Nat),
    expires_at: IDL.Opt(IDL.Nat64),
    spender: Account
});
export const ApproveError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    AllowanceChanged: IDL.Record({ current_allowance: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const Result_2 = IDL.Variant({ Ok: IDL.Nat, Err: ApproveError });
export const TransferFromArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const Result_3 = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferFromError
});
export const GetArchivesArgs = IDL.Record({ from: IDL.Opt(IDL.Principal) });
export const ICRC3ArchiveInfo = IDL.Record({
    end: IDL.Nat,
    canister_id: IDL.Principal,
    start: IDL.Nat
});
ICRC3Value.fill(
    IDL.Variant({
        Int: IDL.Int,
        Map: IDL.Vec(IDL.Tuple(IDL.Text, ICRC3Value)),
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text,
        Array: IDL.Vec(ICRC3Value)
    })
);
export const BlockWithId = IDL.Record({ id: IDL.Nat, block: ICRC3Value });
export const ArchivedBlocks = IDL.Record({
    args: IDL.Vec(GetBlocksRequest),
    callback: IDL.Func(
        [IDL.Vec(GetBlocksRequest)],
        [GetBlocksResult],
        ['query']
    )
});
GetBlocksResult.fill(
    IDL.Record({
        log_length: IDL.Nat,
        blocks: IDL.Vec(BlockWithId),
        archived_blocks: IDL.Vec(ArchivedBlocks)
    })
);
export const ICRC3DataCertificate = IDL.Record({
    certificate: IDL.Vec(IDL.Nat8),
    hash_tree: IDL.Vec(IDL.Nat8)
});
export const SupportedBlockType = IDL.Record({
    url: IDL.Text,
    block_type: IDL.Text
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const GetBlocksResult = IDL.Rec();
    const ICRC3Value = IDL.Rec();
    const Value = IDL.Rec();
    const Vec = IDL.Rec();
    const ChangeArchiveOptions = IDL.Record({
        num_blocks_to_archive: IDL.Opt(IDL.Nat64),
        max_transactions_per_response: IDL.Opt(IDL.Nat64),
        trigger_threshold: IDL.Opt(IDL.Nat64),
        more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
        node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        controller_id: IDL.Opt(IDL.Principal)
    });
    const MetadataValue = IDL.Variant({
        Int: IDL.Int,
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text
    });
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const ChangeFeeCollector = IDL.Variant({
        SetTo: Account,
        Unset: IDL.Null
    });
    const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
    const UpgradeArgs = IDL.Record({
        change_archive_options: IDL.Opt(ChangeArchiveOptions),
        token_symbol: IDL.Opt(IDL.Text),
        transfer_fee: IDL.Opt(IDL.Nat),
        metadata: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))),
        change_fee_collector: IDL.Opt(ChangeFeeCollector),
        max_memo_length: IDL.Opt(IDL.Nat16),
        token_name: IDL.Opt(IDL.Text),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const ArchiveOptions = IDL.Record({
        num_blocks_to_archive: IDL.Nat64,
        max_transactions_per_response: IDL.Opt(IDL.Nat64),
        trigger_threshold: IDL.Nat64,
        more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
        node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        controller_id: IDL.Principal
    });
    const InitArgs = IDL.Record({
        decimals: IDL.Opt(IDL.Nat8),
        token_symbol: IDL.Text,
        transfer_fee: IDL.Nat,
        metadata: IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue)),
        minting_account: Account,
        initial_balances: IDL.Vec(IDL.Tuple(Account, IDL.Nat)),
        fee_collector_account: IDL.Opt(Account),
        archive_options: ArchiveOptions,
        max_memo_length: IDL.Opt(IDL.Nat16),
        token_name: IDL.Text,
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const LedgerArgument = IDL.Variant({
        Upgrade: IDL.Opt(UpgradeArgs),
        Init: InitArgs
    });
    const ArchiveInfo = IDL.Record({
        block_range_end: IDL.Nat,
        canister_id: IDL.Principal,
        block_range_start: IDL.Nat
    });
    const GetBlocksRequest = IDL.Record({
        start: IDL.Nat,
        length: IDL.Nat
    });
    Vec.fill(
        IDL.Vec(
            IDL.Variant({
                Int: IDL.Int,
                Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
                Nat: IDL.Nat,
                Nat64: IDL.Nat64,
                Blob: IDL.Vec(IDL.Nat8),
                Text: IDL.Text,
                Array: Vec
            })
        )
    );
    Value.fill(
        IDL.Variant({
            Int: IDL.Int,
            Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
            Nat: IDL.Nat,
            Nat64: IDL.Nat64,
            Blob: IDL.Vec(IDL.Nat8),
            Text: IDL.Text,
            Array: Vec
        })
    );
    const BlockRange = IDL.Record({ blocks: IDL.Vec(Value) });
    const ArchivedRange = IDL.Record({
        callback: IDL.Func([GetBlocksRequest], [BlockRange], ['query']),
        start: IDL.Nat,
        length: IDL.Nat
    });
    const GetBlocksResponse = IDL.Record({
        certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
        first_index: IDL.Nat,
        blocks: IDL.Vec(Value),
        chain_length: IDL.Nat64,
        archived_blocks: IDL.Vec(ArchivedRange)
    });
    const DataCertificate = IDL.Record({
        certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
        hash_tree: IDL.Vec(IDL.Nat8)
    });
    const Burn = IDL.Record({
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        spender: IDL.Opt(Account)
    });
    const Mint = IDL.Record({
        to: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const Approve = IDL.Record({
        fee: IDL.Opt(IDL.Nat),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        expected_allowance: IDL.Opt(IDL.Nat),
        expires_at: IDL.Opt(IDL.Nat64),
        spender: Account
    });
    const Transfer = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        spender: IDL.Opt(Account)
    });
    const Transaction = IDL.Record({
        burn: IDL.Opt(Burn),
        kind: IDL.Text,
        mint: IDL.Opt(Mint),
        approve: IDL.Opt(Approve),
        timestamp: IDL.Nat64,
        transfer: IDL.Opt(Transfer)
    });
    const TransactionRange = IDL.Record({
        transactions: IDL.Vec(Transaction)
    });
    const ArchivedRange_1 = IDL.Record({
        callback: IDL.Func([GetBlocksRequest], [TransactionRange], ['query']),
        start: IDL.Nat,
        length: IDL.Nat
    });
    const GetTransactionsResponse = IDL.Record({
        first_index: IDL.Nat,
        log_length: IDL.Nat,
        transactions: IDL.Vec(Transaction),
        archived_transactions: IDL.Vec(ArchivedRange_1)
    });
    const StandardRecord = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const TransferArg = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const TransferError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const Result = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
    const ConsentMessageMetadata = IDL.Record({
        utc_offset_minutes: IDL.Opt(IDL.Int16),
        language: IDL.Text
    });
    const DisplayMessageType = IDL.Variant({
        GenericDisplay: IDL.Null,
        LineDisplay: IDL.Record({
            characters_per_line: IDL.Nat16,
            lines_per_page: IDL.Nat16
        })
    });
    const ConsentMessageSpec = IDL.Record({
        metadata: ConsentMessageMetadata,
        device_spec: IDL.Opt(DisplayMessageType)
    });
    const ConsentMessageRequest = IDL.Record({
        arg: IDL.Vec(IDL.Nat8),
        method: IDL.Text,
        user_preferences: ConsentMessageSpec
    });
    const LineDisplayPage = IDL.Record({ lines: IDL.Vec(IDL.Text) });
    const ConsentMessage = IDL.Variant({
        LineDisplayMessage: IDL.Record({ pages: IDL.Vec(LineDisplayPage) }),
        GenericDisplayMessage: IDL.Text
    });
    const ConsentInfo = IDL.Record({
        metadata: ConsentMessageMetadata,
        consent_message: ConsentMessage
    });
    const ErrorInfo = IDL.Record({ description: IDL.Text });
    const Icrc21Error = IDL.Variant({
        GenericError: IDL.Record({
            description: IDL.Text,
            error_code: IDL.Nat
        }),
        InsufficientPayment: ErrorInfo,
        UnsupportedCanisterCall: ErrorInfo,
        ConsentMessageUnavailable: ErrorInfo
    });
    const Result_1 = IDL.Variant({ Ok: ConsentInfo, Err: Icrc21Error });
    const AllowanceArgs = IDL.Record({
        account: Account,
        spender: Account
    });
    const Allowance = IDL.Record({
        allowance: IDL.Nat,
        expires_at: IDL.Opt(IDL.Nat64)
    });
    const ApproveArgs = IDL.Record({
        fee: IDL.Opt(IDL.Nat),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        expected_allowance: IDL.Opt(IDL.Nat),
        expires_at: IDL.Opt(IDL.Nat64),
        spender: Account
    });
    const ApproveError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        AllowanceChanged: IDL.Record({ current_allowance: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const Result_2 = IDL.Variant({ Ok: IDL.Nat, Err: ApproveError });
    const TransferFromArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const TransferFromError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const Result_3 = IDL.Variant({ Ok: IDL.Nat, Err: TransferFromError });
    const GetArchivesArgs = IDL.Record({ from: IDL.Opt(IDL.Principal) });
    const ICRC3ArchiveInfo = IDL.Record({
        end: IDL.Nat,
        canister_id: IDL.Principal,
        start: IDL.Nat
    });
    ICRC3Value.fill(
        IDL.Variant({
            Int: IDL.Int,
            Map: IDL.Vec(IDL.Tuple(IDL.Text, ICRC3Value)),
            Nat: IDL.Nat,
            Blob: IDL.Vec(IDL.Nat8),
            Text: IDL.Text,
            Array: IDL.Vec(ICRC3Value)
        })
    );
    const BlockWithId = IDL.Record({ id: IDL.Nat, block: ICRC3Value });
    const ArchivedBlocks = IDL.Record({
        args: IDL.Vec(GetBlocksRequest),
        callback: IDL.Func(
            [IDL.Vec(GetBlocksRequest)],
            [GetBlocksResult],
            ['query']
        )
    });
    GetBlocksResult.fill(
        IDL.Record({
            log_length: IDL.Nat,
            blocks: IDL.Vec(BlockWithId),
            archived_blocks: IDL.Vec(ArchivedBlocks)
        })
    );
    const ICRC3DataCertificate = IDL.Record({
        certificate: IDL.Vec(IDL.Nat8),
        hash_tree: IDL.Vec(IDL.Nat8)
    });
    const SupportedBlockType = IDL.Record({
        url: IDL.Text,
        block_type: IDL.Text
    });
    return IDL.Service({
        archives: IDL.Func([], [IDL.Vec(ArchiveInfo)], ['query']),
        get_blocks: IDL.Func(
            [GetBlocksRequest],
            [GetBlocksResponse],
            ['query']
        ),
        get_data_certificate: IDL.Func([], [DataCertificate], ['query']),
        get_transactions: IDL.Func(
            [GetBlocksRequest],
            [GetTransactionsResponse],
            ['query']
        ),
        icrc10_supported_standards: IDL.Func(
            [],
            [IDL.Vec(StandardRecord)],
            ['query']
        ),
        icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
        icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
        icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_metadata: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))],
            ['query']
        ),
        icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
        icrc1_name: IDL.Func([], [IDL.Text], ['query']),
        icrc1_supported_standards: IDL.Func(
            [],
            [IDL.Vec(StandardRecord)],
            ['query']
        ),
        icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
        icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_transfer: IDL.Func([TransferArg], [Result], []),
        icrc21_canister_call_consent_message: IDL.Func(
            [ConsentMessageRequest],
            [Result_1],
            []
        ),
        icrc2_allowance: IDL.Func([AllowanceArgs], [Allowance], ['query']),
        icrc2_approve: IDL.Func([ApproveArgs], [Result_2], []),
        icrc2_transfer_from: IDL.Func([TransferFromArgs], [Result_3], []),
        icrc3_get_archives: IDL.Func(
            [GetArchivesArgs],
            [IDL.Vec(ICRC3ArchiveInfo)],
            ['query']
        ),
        icrc3_get_blocks: IDL.Func(
            [IDL.Vec(GetBlocksRequest)],
            [GetBlocksResult],
            ['query']
        ),
        icrc3_get_tip_certificate: IDL.Func(
            [],
            [IDL.Opt(ICRC3DataCertificate)],
            ['query']
        ),
        icrc3_supported_block_types: IDL.Func(
            [],
            [IDL.Vec(SupportedBlockType)],
            ['query']
        ),
        is_ledger_ready: IDL.Func([], [IDL.Bool], ['query'])
    });
};
export const init: init = ({ IDL }) => {
    const ChangeArchiveOptions = IDL.Record({
        num_blocks_to_archive: IDL.Opt(IDL.Nat64),
        max_transactions_per_response: IDL.Opt(IDL.Nat64),
        trigger_threshold: IDL.Opt(IDL.Nat64),
        more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
        node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        controller_id: IDL.Opt(IDL.Principal)
    });
    const MetadataValue = IDL.Variant({
        Int: IDL.Int,
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text
    });
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const ChangeFeeCollector = IDL.Variant({
        SetTo: Account,
        Unset: IDL.Null
    });
    const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
    const UpgradeArgs = IDL.Record({
        change_archive_options: IDL.Opt(ChangeArchiveOptions),
        token_symbol: IDL.Opt(IDL.Text),
        transfer_fee: IDL.Opt(IDL.Nat),
        metadata: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))),
        change_fee_collector: IDL.Opt(ChangeFeeCollector),
        max_memo_length: IDL.Opt(IDL.Nat16),
        token_name: IDL.Opt(IDL.Text),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const ArchiveOptions = IDL.Record({
        num_blocks_to_archive: IDL.Nat64,
        max_transactions_per_response: IDL.Opt(IDL.Nat64),
        trigger_threshold: IDL.Nat64,
        more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
        node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        controller_id: IDL.Principal
    });
    const InitArgs = IDL.Record({
        decimals: IDL.Opt(IDL.Nat8),
        token_symbol: IDL.Text,
        transfer_fee: IDL.Nat,
        metadata: IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue)),
        minting_account: Account,
        initial_balances: IDL.Vec(IDL.Tuple(Account, IDL.Nat)),
        fee_collector_account: IDL.Opt(Account),
        archive_options: ArchiveOptions,
        max_memo_length: IDL.Opt(IDL.Nat16),
        token_name: IDL.Text,
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const LedgerArgument = IDL.Variant({
        Upgrade: IDL.Opt(UpgradeArgs),
        Init: InitArgs
    });
    return [LedgerArgument];
};
