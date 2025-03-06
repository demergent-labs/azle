import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
}
export interface AccountBalanceArgs {
    account: string;
}
export interface AccountIdentifierByteBuf {
    account: Uint8Array | number[];
}
export interface Allowance {
    allowance: bigint;
    expires_at: [] | [bigint];
}
export interface AllowanceArgs {
    account: Account;
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
    canister_id: Principal;
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
export interface ArchivedBlocksRange {
    callback: [Principal, string];
    start: bigint;
    length: bigint;
}
export interface ArchivedEncodedBlocksRange {
    callback: [Principal, string];
    start: bigint;
    length: bigint;
}
export interface Archives {
    archives: Array<ArchiveInfo>;
}
export interface BlockRange {
    blocks: Array<CandidBlock>;
}
export interface CandidBlock {
    transaction: CandidTransaction;
    timestamp: TimeStamp;
    parent_hash: [] | [Uint8Array | number[]];
}
export type CandidOperation =
    | {
          Approve: {
              fee: Tokens;
              from: Uint8Array | number[];
              allowance_e8s: bigint;
              allowance: Tokens;
              expected_allowance: [] | [Tokens];
              expires_at: [] | [TimeStamp];
              spender: Uint8Array | number[];
          };
      }
    | {
          Burn: {
              from: Uint8Array | number[];
              amount: Tokens;
              spender: [] | [Uint8Array | number[]];
          };
      }
    | { Mint: { to: Uint8Array | number[]; amount: Tokens } }
    | {
          Transfer: {
              to: Uint8Array | number[];
              fee: Tokens;
              from: Uint8Array | number[];
              amount: Tokens;
              spender: [] | [Uint8Array | number[]];
          };
      };
export interface CandidTransaction {
    memo: bigint;
    icrc1_memo: [] | [Uint8Array | number[]];
    operation: [] | [CandidOperation];
    created_at_time: TimeStamp;
}
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
export interface Decimals {
    decimals: number;
}
export type DisplayMessageType =
    | { GenericDisplay: null }
    | {
          LineDisplay: {
              characters_per_line: number;
              lines_per_page: number;
          };
      };
export interface Duration {
    secs: bigint;
    nanos: number;
}
export interface ErrorInfo {
    description: string;
}
export interface FeatureFlags {
    icrc2: boolean;
}
export interface GetBlocksArgs {
    start: bigint;
    length: bigint;
}
export type GetBlocksError =
    | {
          BadFirstBlockIndex: {
              requested_index: bigint;
              first_valid_index: bigint;
          };
      }
    | { Other: { error_message: string; error_code: bigint } };
export type Icrc21Error =
    | {
          GenericError: { description: string; error_code: bigint };
      }
    | { InsufficientPayment: ErrorInfo }
    | { UnsupportedCanisterCall: ErrorInfo }
    | { ConsentMessageUnavailable: ErrorInfo };
export interface InitArgs {
    send_whitelist: Array<Principal>;
    token_symbol: [] | [string];
    transfer_fee: [] | [Tokens];
    minting_account: string;
    transaction_window: [] | [Duration];
    max_message_size_bytes: [] | [bigint];
    icrc1_minting_account: [] | [Account];
    archive_options: [] | [ArchiveOptions];
    initial_values: Array<[string, Tokens]>;
    token_name: [] | [string];
    feature_flags: [] | [FeatureFlags];
}
export type LedgerCanisterPayload =
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
export interface Name {
    name: string;
}
export interface QueryBlocksResponse {
    certificate: [] | [Uint8Array | number[]];
    blocks: Array<CandidBlock>;
    chain_length: bigint;
    first_block_index: bigint;
    archived_blocks: Array<ArchivedBlocksRange>;
}
export interface QueryEncodedBlocksResponse {
    certificate: [] | [Uint8Array | number[]];
    blocks: Array<Uint8Array | number[]>;
    chain_length: bigint;
    first_block_index: bigint;
    archived_blocks: Array<ArchivedEncodedBlocksRange>;
}
export type Result = { Ok: bigint } | { Err: TransferError };
export type Result_1 = { Ok: ConsentInfo } | { Err: Icrc21Error };
export type Result_2 = { Ok: bigint } | { Err: ApproveError };
export type Result_3 = { Ok: bigint } | { Err: TransferFromError };
export type Result_4 = { Ok: BlockRange } | { Err: GetBlocksError };
export type Result_5 =
    | { Ok: Array<Uint8Array | number[]> }
    | { Err: GetBlocksError };
export type Result_6 = { Ok: bigint } | { Err: TransferError_1 };
export interface SendArgs {
    to: string;
    fee: Tokens;
    memo: bigint;
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [TimeStamp];
    amount: Tokens;
}
export interface StandardRecord {
    url: string;
    name: string;
}
export interface Symbol {
    symbol: string;
}
export interface TimeStamp {
    timestamp_nanos: bigint;
}
export interface Tokens {
    e8s: bigint;
}
export interface TransferArg {
    to: Account;
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export interface TransferArgs {
    to: Uint8Array | number[];
    fee: Tokens;
    memo: bigint;
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [TimeStamp];
    amount: Tokens;
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
export type TransferError_1 =
    | {
          TxTooOld: { allowed_window_nanos: bigint };
      }
    | { BadFee: { expected_fee: Tokens } }
    | { TxDuplicate: { duplicate_of: bigint } }
    | { TxCreatedInFuture: null }
    | { InsufficientFunds: { balance: Tokens } };
export interface TransferFee {
    transfer_fee: Tokens;
}
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
    icrc1_minting_account: [] | [Account];
    feature_flags: [] | [FeatureFlags];
}
export interface _SERVICE {
    account_balance: ActorMethod<[AccountIdentifierByteBuf], Tokens>;
    account_balance_dfx: ActorMethod<[AccountBalanceArgs], Tokens>;
    account_identifier: ActorMethod<[Account], Uint8Array | number[]>;
    archives: ActorMethod<[], Archives>;
    decimals: ActorMethod<[], Decimals>;
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
    is_ledger_ready: ActorMethod<[], boolean>;
    name: ActorMethod<[], Name>;
    query_blocks: ActorMethod<[GetBlocksArgs], QueryBlocksResponse>;
    query_encoded_blocks: ActorMethod<
        [GetBlocksArgs],
        QueryEncodedBlocksResponse
    >;
    send_dfx: ActorMethod<[SendArgs], bigint>;
    symbol: ActorMethod<[], Symbol>;
    transfer: ActorMethod<[TransferArgs], Result_6>;
    transfer_fee: ActorMethod<[{}], TransferFee>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
export const UpgradeArgs = IDL.Record({
    icrc1_minting_account: IDL.Opt(Account),
    feature_flags: IDL.Opt(FeatureFlags)
});
export const Tokens = IDL.Record({ e8s: IDL.Nat64 });
export const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
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
    send_whitelist: IDL.Vec(IDL.Principal),
    token_symbol: IDL.Opt(IDL.Text),
    transfer_fee: IDL.Opt(Tokens),
    minting_account: IDL.Text,
    transaction_window: IDL.Opt(Duration),
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    icrc1_minting_account: IDL.Opt(Account),
    archive_options: IDL.Opt(ArchiveOptions),
    initial_values: IDL.Vec(IDL.Tuple(IDL.Text, Tokens)),
    token_name: IDL.Opt(IDL.Text),
    feature_flags: IDL.Opt(FeatureFlags)
});
export const LedgerCanisterPayload = IDL.Variant({
    Upgrade: IDL.Opt(UpgradeArgs),
    Init: InitArgs
});
export const AccountIdentifierByteBuf = IDL.Record({
    account: IDL.Vec(IDL.Nat8)
});
export const AccountBalanceArgs = IDL.Record({ account: IDL.Text });
export const ArchiveInfo = IDL.Record({ canister_id: IDL.Principal });
export const Archives = IDL.Record({ archives: IDL.Vec(ArchiveInfo) });
export const Decimals = IDL.Record({ decimals: IDL.Nat32 });
export const StandardRecord = IDL.Record({
    url: IDL.Text,
    name: IDL.Text
});
export const MetadataValue = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text
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
export const Name = IDL.Record({ name: IDL.Text });
export const GetBlocksArgs = IDL.Record({
    start: IDL.Nat64,
    length: IDL.Nat64
});
export const TimeStamp = IDL.Record({ timestamp_nanos: IDL.Nat64 });
export const CandidOperation = IDL.Variant({
    Approve: IDL.Record({
        fee: Tokens,
        from: IDL.Vec(IDL.Nat8),
        allowance_e8s: IDL.Int,
        allowance: Tokens,
        expected_allowance: IDL.Opt(Tokens),
        expires_at: IDL.Opt(TimeStamp),
        spender: IDL.Vec(IDL.Nat8)
    }),
    Burn: IDL.Record({
        from: IDL.Vec(IDL.Nat8),
        amount: Tokens,
        spender: IDL.Opt(IDL.Vec(IDL.Nat8))
    }),
    Mint: IDL.Record({ to: IDL.Vec(IDL.Nat8), amount: Tokens }),
    Transfer: IDL.Record({
        to: IDL.Vec(IDL.Nat8),
        fee: Tokens,
        from: IDL.Vec(IDL.Nat8),
        amount: Tokens,
        spender: IDL.Opt(IDL.Vec(IDL.Nat8))
    })
});
export const CandidTransaction = IDL.Record({
    memo: IDL.Nat64,
    icrc1_memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    operation: IDL.Opt(CandidOperation),
    created_at_time: TimeStamp
});
export const CandidBlock = IDL.Record({
    transaction: CandidTransaction,
    timestamp: TimeStamp,
    parent_hash: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const BlockRange = IDL.Record({ blocks: IDL.Vec(CandidBlock) });
export const GetBlocksError = IDL.Variant({
    BadFirstBlockIndex: IDL.Record({
        requested_index: IDL.Nat64,
        first_valid_index: IDL.Nat64
    }),
    Other: IDL.Record({
        error_message: IDL.Text,
        error_code: IDL.Nat64
    })
});
export const Result_4 = IDL.Variant({
    Ok: BlockRange,
    Err: GetBlocksError
});
export const ArchivedBlocksRange = IDL.Record({
    callback: IDL.Func([GetBlocksArgs], [Result_4], ['query']),
    start: IDL.Nat64,
    length: IDL.Nat64
});
export const QueryBlocksResponse = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    blocks: IDL.Vec(CandidBlock),
    chain_length: IDL.Nat64,
    first_block_index: IDL.Nat64,
    archived_blocks: IDL.Vec(ArchivedBlocksRange)
});
export const Result_5 = IDL.Variant({
    Ok: IDL.Vec(IDL.Vec(IDL.Nat8)),
    Err: GetBlocksError
});
export const ArchivedEncodedBlocksRange = IDL.Record({
    callback: IDL.Func([GetBlocksArgs], [Result_5], ['query']),
    start: IDL.Nat64,
    length: IDL.Nat64
});
export const QueryEncodedBlocksResponse = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    blocks: IDL.Vec(IDL.Vec(IDL.Nat8)),
    chain_length: IDL.Nat64,
    first_block_index: IDL.Nat64,
    archived_blocks: IDL.Vec(ArchivedEncodedBlocksRange)
});
export const SendArgs = IDL.Record({
    to: IDL.Text,
    fee: Tokens,
    memo: IDL.Nat64,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens
});
export const Symbol = IDL.Record({ symbol: IDL.Text });
export const TransferArgs = IDL.Record({
    to: IDL.Vec(IDL.Nat8),
    fee: Tokens,
    memo: IDL.Nat64,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens
});
export const TransferError_1 = IDL.Variant({
    TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    TxDuplicate: IDL.Record({ duplicate_of: IDL.Nat64 }),
    TxCreatedInFuture: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Tokens })
});
export const Result_6 = IDL.Variant({
    Ok: IDL.Nat64,
    Err: TransferError_1
});
export const TransferFee = IDL.Record({ transfer_fee: Tokens });
export const idlFactory: idlFactory = ({ IDL }) => {
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
    const UpgradeArgs = IDL.Record({
        icrc1_minting_account: IDL.Opt(Account),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const Tokens = IDL.Record({ e8s: IDL.Nat64 });
    const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
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
        send_whitelist: IDL.Vec(IDL.Principal),
        token_symbol: IDL.Opt(IDL.Text),
        transfer_fee: IDL.Opt(Tokens),
        minting_account: IDL.Text,
        transaction_window: IDL.Opt(Duration),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        icrc1_minting_account: IDL.Opt(Account),
        archive_options: IDL.Opt(ArchiveOptions),
        initial_values: IDL.Vec(IDL.Tuple(IDL.Text, Tokens)),
        token_name: IDL.Opt(IDL.Text),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const LedgerCanisterPayload = IDL.Variant({
        Upgrade: IDL.Opt(UpgradeArgs),
        Init: InitArgs
    });
    const AccountIdentifierByteBuf = IDL.Record({
        account: IDL.Vec(IDL.Nat8)
    });
    const AccountBalanceArgs = IDL.Record({ account: IDL.Text });
    const ArchiveInfo = IDL.Record({ canister_id: IDL.Principal });
    const Archives = IDL.Record({ archives: IDL.Vec(ArchiveInfo) });
    const Decimals = IDL.Record({ decimals: IDL.Nat32 });
    const StandardRecord = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const MetadataValue = IDL.Variant({
        Int: IDL.Int,
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text
    });
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
    const Name = IDL.Record({ name: IDL.Text });
    const GetBlocksArgs = IDL.Record({
        start: IDL.Nat64,
        length: IDL.Nat64
    });
    const TimeStamp = IDL.Record({ timestamp_nanos: IDL.Nat64 });
    const CandidOperation = IDL.Variant({
        Approve: IDL.Record({
            fee: Tokens,
            from: IDL.Vec(IDL.Nat8),
            allowance_e8s: IDL.Int,
            allowance: Tokens,
            expected_allowance: IDL.Opt(Tokens),
            expires_at: IDL.Opt(TimeStamp),
            spender: IDL.Vec(IDL.Nat8)
        }),
        Burn: IDL.Record({
            from: IDL.Vec(IDL.Nat8),
            amount: Tokens,
            spender: IDL.Opt(IDL.Vec(IDL.Nat8))
        }),
        Mint: IDL.Record({ to: IDL.Vec(IDL.Nat8), amount: Tokens }),
        Transfer: IDL.Record({
            to: IDL.Vec(IDL.Nat8),
            fee: Tokens,
            from: IDL.Vec(IDL.Nat8),
            amount: Tokens,
            spender: IDL.Opt(IDL.Vec(IDL.Nat8))
        })
    });
    const CandidTransaction = IDL.Record({
        memo: IDL.Nat64,
        icrc1_memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        operation: IDL.Opt(CandidOperation),
        created_at_time: TimeStamp
    });
    const CandidBlock = IDL.Record({
        transaction: CandidTransaction,
        timestamp: TimeStamp,
        parent_hash: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const BlockRange = IDL.Record({ blocks: IDL.Vec(CandidBlock) });
    const GetBlocksError = IDL.Variant({
        BadFirstBlockIndex: IDL.Record({
            requested_index: IDL.Nat64,
            first_valid_index: IDL.Nat64
        }),
        Other: IDL.Record({
            error_message: IDL.Text,
            error_code: IDL.Nat64
        })
    });
    const Result_4 = IDL.Variant({ Ok: BlockRange, Err: GetBlocksError });
    const ArchivedBlocksRange = IDL.Record({
        callback: IDL.Func([GetBlocksArgs], [Result_4], ['query']),
        start: IDL.Nat64,
        length: IDL.Nat64
    });
    const QueryBlocksResponse = IDL.Record({
        certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
        blocks: IDL.Vec(CandidBlock),
        chain_length: IDL.Nat64,
        first_block_index: IDL.Nat64,
        archived_blocks: IDL.Vec(ArchivedBlocksRange)
    });
    const Result_5 = IDL.Variant({
        Ok: IDL.Vec(IDL.Vec(IDL.Nat8)),
        Err: GetBlocksError
    });
    const ArchivedEncodedBlocksRange = IDL.Record({
        callback: IDL.Func([GetBlocksArgs], [Result_5], ['query']),
        start: IDL.Nat64,
        length: IDL.Nat64
    });
    const QueryEncodedBlocksResponse = IDL.Record({
        certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
        blocks: IDL.Vec(IDL.Vec(IDL.Nat8)),
        chain_length: IDL.Nat64,
        first_block_index: IDL.Nat64,
        archived_blocks: IDL.Vec(ArchivedEncodedBlocksRange)
    });
    const SendArgs = IDL.Record({
        to: IDL.Text,
        fee: Tokens,
        memo: IDL.Nat64,
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(TimeStamp),
        amount: Tokens
    });
    const Symbol = IDL.Record({ symbol: IDL.Text });
    const TransferArgs = IDL.Record({
        to: IDL.Vec(IDL.Nat8),
        fee: Tokens,
        memo: IDL.Nat64,
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(TimeStamp),
        amount: Tokens
    });
    const TransferError_1 = IDL.Variant({
        TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
        BadFee: IDL.Record({ expected_fee: Tokens }),
        TxDuplicate: IDL.Record({ duplicate_of: IDL.Nat64 }),
        TxCreatedInFuture: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: Tokens })
    });
    const Result_6 = IDL.Variant({ Ok: IDL.Nat64, Err: TransferError_1 });
    const TransferFee = IDL.Record({ transfer_fee: Tokens });
    return IDL.Service({
        account_balance: IDL.Func(
            [AccountIdentifierByteBuf],
            [Tokens],
            ['query']
        ),
        account_balance_dfx: IDL.Func(
            [AccountBalanceArgs],
            [Tokens],
            ['query']
        ),
        account_identifier: IDL.Func([Account], [IDL.Vec(IDL.Nat8)], ['query']),
        archives: IDL.Func([], [Archives], ['query']),
        decimals: IDL.Func([], [Decimals], ['query']),
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
        is_ledger_ready: IDL.Func([], [IDL.Bool], ['query']),
        name: IDL.Func([], [Name], ['query']),
        query_blocks: IDL.Func(
            [GetBlocksArgs],
            [QueryBlocksResponse],
            ['query']
        ),
        query_encoded_blocks: IDL.Func(
            [GetBlocksArgs],
            [QueryEncodedBlocksResponse],
            ['query']
        ),
        send_dfx: IDL.Func([SendArgs], [IDL.Nat64], []),
        symbol: IDL.Func([], [Symbol], ['query']),
        transfer: IDL.Func([TransferArgs], [Result_6], []),
        transfer_fee: IDL.Func([IDL.Record({})], [TransferFee], ['query'])
    });
};
export const init: init = ({ IDL }) => {
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
    const UpgradeArgs = IDL.Record({
        icrc1_minting_account: IDL.Opt(Account),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const Tokens = IDL.Record({ e8s: IDL.Nat64 });
    const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
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
        send_whitelist: IDL.Vec(IDL.Principal),
        token_symbol: IDL.Opt(IDL.Text),
        transfer_fee: IDL.Opt(Tokens),
        minting_account: IDL.Text,
        transaction_window: IDL.Opt(Duration),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        icrc1_minting_account: IDL.Opt(Account),
        archive_options: IDL.Opt(ArchiveOptions),
        initial_values: IDL.Vec(IDL.Tuple(IDL.Text, Tokens)),
        token_name: IDL.Opt(IDL.Text),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const LedgerCanisterPayload = IDL.Variant({
        Upgrade: IDL.Opt(UpgradeArgs),
        Init: InitArgs
    });
    return [LedgerCanisterPayload];
};

export {
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from './address';
