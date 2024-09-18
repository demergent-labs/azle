import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    subaccount: [] | [Subaccount];
}
export type Duration = bigint;
export type Metadatum = [string, Value];
export type Subaccount = Uint8Array | number[];
export interface SupportedStandard {
    url: string;
    name: string;
}
export type Timestamp = bigint;
export interface TransferArgs {
    to: Account;
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Subaccount];
    created_at_time: [] | [Timestamp];
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
    | { CreatedInFuture: { ledger_time: Timestamp } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export type TransferResult = { Ok: bigint } | { Err: TransferError };
export type Value =
    | { Int: bigint }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string };
export interface _SERVICE {
    icrc1_balance_of: ActorMethod<[Account], bigint>;
    icrc1_decimals: ActorMethod<[], number>;
    icrc1_fee: ActorMethod<[], bigint>;
    icrc1_metadata: ActorMethod<[], Array<Metadatum>>;
    icrc1_minting_account: ActorMethod<[], [] | [Account]>;
    icrc1_name: ActorMethod<[], string>;
    icrc1_supported_standards: ActorMethod<[], Array<SupportedStandard>>;
    icrc1_symbol: ActorMethod<[], string>;
    icrc1_total_supply: ActorMethod<[], bigint>;
    icrc1_transfer: ActorMethod<[TransferArgs], TransferResult>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const Subaccount = IDL.Vec(IDL.Nat8);
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
});
export const Value = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text
});
export const Metadatum = IDL.Tuple(IDL.Text, Value);
export const SupportedStandard = IDL.Record({
    url: IDL.Text,
    name: IDL.Text
});
export const Timestamp = IDL.Nat64;
export const TransferArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(Subaccount),
    created_at_time: IDL.Opt(Timestamp),
    amount: IDL.Nat
});
export const TransferError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const TransferResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferError
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const Subaccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(Subaccount)
    });
    const Value = IDL.Variant({
        Int: IDL.Int,
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text
    });
    const Metadatum = IDL.Tuple(IDL.Text, Value);
    const SupportedStandard = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const Timestamp = IDL.Nat64;
    const TransferArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(Subaccount),
        created_at_time: IDL.Opt(Timestamp),
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
        CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const TransferResult = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
    return IDL.Service({
        icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
        icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
        icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_metadata: IDL.Func([], [IDL.Vec(Metadatum)], ['query']),
        icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
        icrc1_name: IDL.Func([], [IDL.Text], ['query']),
        icrc1_supported_standards: IDL.Func(
            [],
            [IDL.Vec(SupportedStandard)],
            ['query']
        ),
        icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
        icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_transfer: IDL.Func([TransferArgs], [TransferResult], [])
    });
};
export const init: init = () => {
    return [];
};
