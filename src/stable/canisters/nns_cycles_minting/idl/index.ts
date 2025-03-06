import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export type AccountIdentifier = string;
export type BlockIndex = bigint;
export interface CanisterSettings {
    freezing_threshold: [] | [bigint];
    wasm_memory_threshold: [] | [bigint];
    controllers: [] | [Array<Principal>];
    reserved_cycles_limit: [] | [bigint];
    log_visibility: [] | [log_visibility];
    wasm_memory_limit: [] | [bigint];
    memory_allocation: [] | [bigint];
    compute_allocation: [] | [bigint];
}
export interface CreateCanisterArg {
    subnet_selection: [] | [SubnetSelection];
    settings: [] | [CanisterSettings];
    subnet_type: [] | [string];
}
export type CreateCanisterError = {
    Refunded: { create_error: string; refund_amount: bigint };
};
export type CreateCanisterResult =
    | { Ok: Principal }
    | { Err: CreateCanisterError };
export type Cycles = bigint;
export interface CyclesCanisterInitPayload {
    exchange_rate_canister: [] | [ExchangeRateCanister];
    cycles_ledger_canister_id: [] | [Principal];
    last_purged_notification: [] | [bigint];
    governance_canister_id: [] | [Principal];
    minting_account_id: [] | [AccountIdentifier];
    ledger_canister_id: [] | [Principal];
}
export type ExchangeRateCanister = { Set: Principal } | { Unset: null };
export interface IcpXdrConversionRate {
    xdr_permyriad_per_icp: bigint;
    timestamp_seconds: bigint;
}
export interface IcpXdrConversionRateResponse {
    certificate: Uint8Array | number[];
    data: IcpXdrConversionRate;
    hash_tree: Uint8Array | number[];
}
export type Memo = [] | [Uint8Array | number[]];
export interface NotifyCreateCanisterArg {
    controller: Principal;
    block_index: BlockIndex;
    subnet_selection: [] | [SubnetSelection];
    settings: [] | [CanisterSettings];
    subnet_type: [] | [string];
}
export type NotifyCreateCanisterResult =
    | { Ok: Principal }
    | { Err: NotifyError };
export type NotifyError =
    | {
          Refunded: { block_index: [] | [BlockIndex]; reason: string };
      }
    | { InvalidTransaction: string }
    | { Other: { error_message: string; error_code: bigint } }
    | { Processing: null }
    | { TransactionTooOld: BlockIndex };
export interface NotifyMintCyclesArg {
    block_index: BlockIndex;
    deposit_memo: Memo;
    to_subaccount: Subaccount;
}
export type NotifyMintCyclesResult =
    | { Ok: NotifyMintCyclesSuccess }
    | { Err: NotifyError };
export interface NotifyMintCyclesSuccess {
    balance: bigint;
    block_index: bigint;
    minted: bigint;
}
export interface NotifyTopUpArg {
    block_index: BlockIndex;
    canister_id: Principal;
}
export type NotifyTopUpResult = { Ok: Cycles } | { Err: NotifyError };
export interface PrincipalsAuthorizedToCreateCanistersToSubnetsResponse {
    data: Array<[Principal, Array<Principal>]>;
}
export type Subaccount = [] | [Uint8Array | number[]];
export interface SubnetFilter {
    subnet_type: [] | [string];
}
export type SubnetSelection =
    | { Filter: SubnetFilter }
    | { Subnet: { subnet: Principal } };
export interface SubnetTypesToSubnetsResponse {
    data: Array<[string, Array<Principal>]>;
}
export type log_visibility = { controllers: null } | { public: null };
export interface _SERVICE {
    create_canister: ActorMethod<[CreateCanisterArg], CreateCanisterResult>;
    get_build_metadata: ActorMethod<[], string>;
    get_default_subnets: ActorMethod<[], Array<Principal>>;
    get_icp_xdr_conversion_rate: ActorMethod<[], IcpXdrConversionRateResponse>;
    get_principals_authorized_to_create_canisters_to_subnets: ActorMethod<
        [],
        PrincipalsAuthorizedToCreateCanistersToSubnetsResponse
    >;
    get_subnet_types_to_subnets: ActorMethod<[], SubnetTypesToSubnetsResponse>;
    notify_create_canister: ActorMethod<
        [NotifyCreateCanisterArg],
        NotifyCreateCanisterResult
    >;
    notify_mint_cycles: ActorMethod<
        [NotifyMintCyclesArg],
        NotifyMintCyclesResult
    >;
    notify_top_up: ActorMethod<[NotifyTopUpArg], NotifyTopUpResult>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const ExchangeRateCanister = IDL.Variant({
    Set: IDL.Principal,
    Unset: IDL.Null
});
export const AccountIdentifier = IDL.Text;
export const CyclesCanisterInitPayload = IDL.Record({
    exchange_rate_canister: IDL.Opt(ExchangeRateCanister),
    cycles_ledger_canister_id: IDL.Opt(IDL.Principal),
    last_purged_notification: IDL.Opt(IDL.Nat64),
    governance_canister_id: IDL.Opt(IDL.Principal),
    minting_account_id: IDL.Opt(AccountIdentifier),
    ledger_canister_id: IDL.Opt(IDL.Principal)
});
export const SubnetFilter = IDL.Record({ subnet_type: IDL.Opt(IDL.Text) });
export const SubnetSelection = IDL.Variant({
    Filter: SubnetFilter,
    Subnet: IDL.Record({ subnet: IDL.Principal })
});
export const log_visibility = IDL.Variant({
    controllers: IDL.Null,
    public: IDL.Null
});
export const CanisterSettings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat),
    wasm_memory_threshold: IDL.Opt(IDL.Nat),
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    reserved_cycles_limit: IDL.Opt(IDL.Nat),
    log_visibility: IDL.Opt(log_visibility),
    wasm_memory_limit: IDL.Opt(IDL.Nat),
    memory_allocation: IDL.Opt(IDL.Nat),
    compute_allocation: IDL.Opt(IDL.Nat)
});
export const CreateCanisterArg = IDL.Record({
    subnet_selection: IDL.Opt(SubnetSelection),
    settings: IDL.Opt(CanisterSettings),
    subnet_type: IDL.Opt(IDL.Text)
});
export const CreateCanisterError = IDL.Variant({
    Refunded: IDL.Record({
        create_error: IDL.Text,
        refund_amount: IDL.Nat
    })
});
export const CreateCanisterResult = IDL.Variant({
    Ok: IDL.Principal,
    Err: CreateCanisterError
});
export const IcpXdrConversionRate = IDL.Record({
    xdr_permyriad_per_icp: IDL.Nat64,
    timestamp_seconds: IDL.Nat64
});
export const IcpXdrConversionRateResponse = IDL.Record({
    certificate: IDL.Vec(IDL.Nat8),
    data: IcpXdrConversionRate,
    hash_tree: IDL.Vec(IDL.Nat8)
});
export const PrincipalsAuthorizedToCreateCanistersToSubnetsResponse =
    IDL.Record({
        data: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal)))
    });
export const SubnetTypesToSubnetsResponse = IDL.Record({
    data: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Principal)))
});
export const BlockIndex = IDL.Nat64;
export const NotifyCreateCanisterArg = IDL.Record({
    controller: IDL.Principal,
    block_index: BlockIndex,
    subnet_selection: IDL.Opt(SubnetSelection),
    settings: IDL.Opt(CanisterSettings),
    subnet_type: IDL.Opt(IDL.Text)
});
export const NotifyError = IDL.Variant({
    Refunded: IDL.Record({
        block_index: IDL.Opt(BlockIndex),
        reason: IDL.Text
    }),
    InvalidTransaction: IDL.Text,
    Other: IDL.Record({
        error_message: IDL.Text,
        error_code: IDL.Nat64
    }),
    Processing: IDL.Null,
    TransactionTooOld: BlockIndex
});
export const NotifyCreateCanisterResult = IDL.Variant({
    Ok: IDL.Principal,
    Err: NotifyError
});
export const Memo = IDL.Opt(IDL.Vec(IDL.Nat8));
export const Subaccount = IDL.Opt(IDL.Vec(IDL.Nat8));
export const NotifyMintCyclesArg = IDL.Record({
    block_index: BlockIndex,
    deposit_memo: Memo,
    to_subaccount: Subaccount
});
export const NotifyMintCyclesSuccess = IDL.Record({
    balance: IDL.Nat,
    block_index: IDL.Nat,
    minted: IDL.Nat
});
export const NotifyMintCyclesResult = IDL.Variant({
    Ok: NotifyMintCyclesSuccess,
    Err: NotifyError
});
export const NotifyTopUpArg = IDL.Record({
    block_index: BlockIndex,
    canister_id: IDL.Principal
});
export const Cycles = IDL.Nat;
export const NotifyTopUpResult = IDL.Variant({
    Ok: Cycles,
    Err: NotifyError
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const ExchangeRateCanister = IDL.Variant({
        Set: IDL.Principal,
        Unset: IDL.Null
    });
    const AccountIdentifier = IDL.Text;
    const CyclesCanisterInitPayload = IDL.Record({
        exchange_rate_canister: IDL.Opt(ExchangeRateCanister),
        cycles_ledger_canister_id: IDL.Opt(IDL.Principal),
        last_purged_notification: IDL.Opt(IDL.Nat64),
        governance_canister_id: IDL.Opt(IDL.Principal),
        minting_account_id: IDL.Opt(AccountIdentifier),
        ledger_canister_id: IDL.Opt(IDL.Principal)
    });
    const SubnetFilter = IDL.Record({ subnet_type: IDL.Opt(IDL.Text) });
    const SubnetSelection = IDL.Variant({
        Filter: SubnetFilter,
        Subnet: IDL.Record({ subnet: IDL.Principal })
    });
    const log_visibility = IDL.Variant({
        controllers: IDL.Null,
        public: IDL.Null
    });
    const CanisterSettings = IDL.Record({
        freezing_threshold: IDL.Opt(IDL.Nat),
        wasm_memory_threshold: IDL.Opt(IDL.Nat),
        controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
        reserved_cycles_limit: IDL.Opt(IDL.Nat),
        log_visibility: IDL.Opt(log_visibility),
        wasm_memory_limit: IDL.Opt(IDL.Nat),
        memory_allocation: IDL.Opt(IDL.Nat),
        compute_allocation: IDL.Opt(IDL.Nat)
    });
    const CreateCanisterArg = IDL.Record({
        subnet_selection: IDL.Opt(SubnetSelection),
        settings: IDL.Opt(CanisterSettings),
        subnet_type: IDL.Opt(IDL.Text)
    });
    const CreateCanisterError = IDL.Variant({
        Refunded: IDL.Record({
            create_error: IDL.Text,
            refund_amount: IDL.Nat
        })
    });
    const CreateCanisterResult = IDL.Variant({
        Ok: IDL.Principal,
        Err: CreateCanisterError
    });
    const IcpXdrConversionRate = IDL.Record({
        xdr_permyriad_per_icp: IDL.Nat64,
        timestamp_seconds: IDL.Nat64
    });
    const IcpXdrConversionRateResponse = IDL.Record({
        certificate: IDL.Vec(IDL.Nat8),
        data: IcpXdrConversionRate,
        hash_tree: IDL.Vec(IDL.Nat8)
    });
    const PrincipalsAuthorizedToCreateCanistersToSubnetsResponse = IDL.Record({
        data: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal)))
    });
    const SubnetTypesToSubnetsResponse = IDL.Record({
        data: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Principal)))
    });
    const BlockIndex = IDL.Nat64;
    const NotifyCreateCanisterArg = IDL.Record({
        controller: IDL.Principal,
        block_index: BlockIndex,
        subnet_selection: IDL.Opt(SubnetSelection),
        settings: IDL.Opt(CanisterSettings),
        subnet_type: IDL.Opt(IDL.Text)
    });
    const NotifyError = IDL.Variant({
        Refunded: IDL.Record({
            block_index: IDL.Opt(BlockIndex),
            reason: IDL.Text
        }),
        InvalidTransaction: IDL.Text,
        Other: IDL.Record({
            error_message: IDL.Text,
            error_code: IDL.Nat64
        }),
        Processing: IDL.Null,
        TransactionTooOld: BlockIndex
    });
    const NotifyCreateCanisterResult = IDL.Variant({
        Ok: IDL.Principal,
        Err: NotifyError
    });
    const Memo = IDL.Opt(IDL.Vec(IDL.Nat8));
    const Subaccount = IDL.Opt(IDL.Vec(IDL.Nat8));
    const NotifyMintCyclesArg = IDL.Record({
        block_index: BlockIndex,
        deposit_memo: Memo,
        to_subaccount: Subaccount
    });
    const NotifyMintCyclesSuccess = IDL.Record({
        balance: IDL.Nat,
        block_index: IDL.Nat,
        minted: IDL.Nat
    });
    const NotifyMintCyclesResult = IDL.Variant({
        Ok: NotifyMintCyclesSuccess,
        Err: NotifyError
    });
    const NotifyTopUpArg = IDL.Record({
        block_index: BlockIndex,
        canister_id: IDL.Principal
    });
    const Cycles = IDL.Nat;
    const NotifyTopUpResult = IDL.Variant({ Ok: Cycles, Err: NotifyError });
    return IDL.Service({
        create_canister: IDL.Func(
            [CreateCanisterArg],
            [CreateCanisterResult],
            []
        ),
        get_build_metadata: IDL.Func([], [IDL.Text], ['query']),
        get_default_subnets: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
        get_icp_xdr_conversion_rate: IDL.Func(
            [],
            [IcpXdrConversionRateResponse],
            ['query']
        ),
        get_principals_authorized_to_create_canisters_to_subnets: IDL.Func(
            [],
            [PrincipalsAuthorizedToCreateCanistersToSubnetsResponse],
            ['query']
        ),
        get_subnet_types_to_subnets: IDL.Func(
            [],
            [SubnetTypesToSubnetsResponse],
            ['query']
        ),
        notify_create_canister: IDL.Func(
            [NotifyCreateCanisterArg],
            [NotifyCreateCanisterResult],
            []
        ),
        notify_mint_cycles: IDL.Func(
            [NotifyMintCyclesArg],
            [NotifyMintCyclesResult],
            []
        ),
        notify_top_up: IDL.Func([NotifyTopUpArg], [NotifyTopUpResult], [])
    });
};
export const init: init = ({ IDL }) => {
    const ExchangeRateCanister = IDL.Variant({
        Set: IDL.Principal,
        Unset: IDL.Null
    });
    const AccountIdentifier = IDL.Text;
    const CyclesCanisterInitPayload = IDL.Record({
        exchange_rate_canister: IDL.Opt(ExchangeRateCanister),
        cycles_ledger_canister_id: IDL.Opt(IDL.Principal),
        last_purged_notification: IDL.Opt(IDL.Nat64),
        governance_canister_id: IDL.Opt(IDL.Principal),
        minting_account_id: IDL.Opt(AccountIdentifier),
        ledger_canister_id: IDL.Opt(IDL.Principal)
    });
    return [IDL.Opt(CyclesCanisterInitPayload)];
};
