import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    subaccount: [] | [Subaccount];
}
export type Subaccount = Uint8Array | number[];
export interface TransferArg {
    to: Account;
    token_id: bigint;
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
}
export type TransferError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { Duplicate: { duplicate_of: bigint } }
    | { NonExistingTokenId: null }
    | { Unauthorized: null }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { InvalidRecipient: null }
    | { GenericBatchError: { message: string; error_code: bigint } }
    | { TooOld: null };
export type TransferResult = { Ok: bigint } | { Err: TransferError };
export type Value =
    | { Int: bigint }
    | { Map: Array<[string, Value]> }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string }
    | { Array: Array<Value> };
export interface _SERVICE {
    icrc7_atomic_batch_transfers: ActorMethod<[], [] | [boolean]>;
    icrc7_balance_of: ActorMethod<[Array<Account>], Array<bigint>>;
    icrc7_collection_metadata: ActorMethod<[], Array<[string, Value]>>;
    icrc7_default_take_value: ActorMethod<[], [] | [bigint]>;
    icrc7_description: ActorMethod<[], [] | [string]>;
    icrc7_logo: ActorMethod<[], [] | [string]>;
    icrc7_max_memo_size: ActorMethod<[], [] | [bigint]>;
    icrc7_max_query_batch_size: ActorMethod<[], [] | [bigint]>;
    icrc7_max_take_value: ActorMethod<[], [] | [bigint]>;
    icrc7_max_update_batch_size: ActorMethod<[], [] | [bigint]>;
    icrc7_name: ActorMethod<[], string>;
    icrc7_owner_of: ActorMethod<[Array<bigint>], Array<[] | [Account]>>;
    icrc7_permitted_drift: ActorMethod<[], [] | [bigint]>;
    icrc7_supply_cap: ActorMethod<[], [] | [bigint]>;
    icrc7_symbol: ActorMethod<[], string>;
    icrc7_token_metadata: ActorMethod<
        [Array<bigint>],
        Array<[] | [Array<[string, Value]>]>
    >;
    icrc7_tokens: ActorMethod<[[] | [bigint], [] | [bigint]], Array<bigint>>;
    icrc7_tokens_of: ActorMethod<
        [Account, [] | [bigint], [] | [bigint]],
        Array<bigint>
    >;
    icrc7_total_supply: ActorMethod<[], bigint>;
    icrc7_transfer: ActorMethod<
        [Array<TransferArg>],
        Array<[] | [TransferResult]>
    >;
    icrc7_tx_window: ActorMethod<[], [] | [bigint]>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const Value = IDL.Rec();
export const Subaccount = IDL.Vec(IDL.Nat8);
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
});
Value.fill(
    IDL.Variant({
        Int: IDL.Int,
        Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text,
        Array: IDL.Vec(Value)
    })
);
export const TransferArg = IDL.Record({
    to: Account,
    token_id: IDL.Nat,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64)
});
export const TransferError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    NonExistingTokenId: IDL.Null,
    Unauthorized: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    InvalidRecipient: IDL.Null,
    GenericBatchError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    }),
    TooOld: IDL.Null
});
export const TransferResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferError
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const Value = IDL.Rec();
    const Subaccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(Subaccount)
    });
    Value.fill(
        IDL.Variant({
            Int: IDL.Int,
            Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
            Nat: IDL.Nat,
            Blob: IDL.Vec(IDL.Nat8),
            Text: IDL.Text,
            Array: IDL.Vec(Value)
        })
    );
    const TransferArg = IDL.Record({
        to: Account,
        token_id: IDL.Nat,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64)
    });
    const TransferError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        NonExistingTokenId: IDL.Null,
        Unauthorized: IDL.Null,
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        InvalidRecipient: IDL.Null,
        GenericBatchError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TooOld: IDL.Null
    });
    const TransferResult = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
    return IDL.Service({
        icrc7_atomic_batch_transfers: IDL.Func(
            [],
            [IDL.Opt(IDL.Bool)],
            ['query']
        ),
        icrc7_balance_of: IDL.Func(
            [IDL.Vec(Account)],
            [IDL.Vec(IDL.Nat)],
            ['query']
        ),
        icrc7_collection_metadata: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
            ['query']
        ),
        icrc7_default_take_value: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
        icrc7_description: IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
        icrc7_logo: IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
        icrc7_max_memo_size: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
        icrc7_max_query_batch_size: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
        icrc7_max_take_value: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
        icrc7_max_update_batch_size: IDL.Func(
            [],
            [IDL.Opt(IDL.Nat)],
            ['query']
        ),
        icrc7_name: IDL.Func([], [IDL.Text], ['query']),
        icrc7_owner_of: IDL.Func(
            [IDL.Vec(IDL.Nat)],
            [IDL.Vec(IDL.Opt(Account))],
            ['query']
        ),
        icrc7_permitted_drift: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
        icrc7_supply_cap: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
        icrc7_symbol: IDL.Func([], [IDL.Text], ['query']),
        icrc7_token_metadata: IDL.Func(
            [IDL.Vec(IDL.Nat)],
            [IDL.Vec(IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, Value))))],
            ['query']
        ),
        icrc7_tokens: IDL.Func(
            [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
            [IDL.Vec(IDL.Nat)],
            ['query']
        ),
        icrc7_tokens_of: IDL.Func(
            [Account, IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
            [IDL.Vec(IDL.Nat)],
            ['query']
        ),
        icrc7_total_supply: IDL.Func([], [IDL.Nat], ['query']),
        icrc7_transfer: IDL.Func(
            [IDL.Vec(TransferArg)],
            [IDL.Vec(IDL.Opt(TransferResult))],
            []
        ),
        icrc7_tx_window: IDL.Func([], [IDL.Opt(IDL.Nat)], ['query'])
    });
};
export const init: init = () => {
    return [];
};
