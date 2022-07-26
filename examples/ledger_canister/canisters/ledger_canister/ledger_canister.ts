// TODO test all errors for query blocks

import {
    CanisterResult,
    ic,
    nat32,
    nat64,
    ok,
    Opt,
    Principal,
    Query,
    Update,
    Variant
} from 'azle';
import {
    Address,
    Archives,
    binary_address_from_address,
    DecimalsResult,
    GetBlocksArgs,
    hex_address_from_principal,
    Ledger,
    NameResult,
    QueryBlocksResponse,
    SymbolResult,
    Tokens,
    TransferFee,
    TransferResult
} from 'azle/canisters/ledger';

const ICPCanister = ic.canisters.Ledger<Ledger>(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

type ExecuteTransferResult = Variant<{
    ok: TransferResult;
    err: string;
}>;

export function* execute_transfer(
    to: Address,
    amount: nat64,
    fee: nat64,
    created_at_time: Opt<nat64>
): Update<ExecuteTransferResult> {
    const transfer_result_canister_result: CanisterResult<TransferResult> =
        yield ICPCanister.transfer({
            memo: 0n,
            amount: {
                e8s: amount
            },
            fee: {
                e8s: fee
            },
            from_subaccount: null,
            to: binary_address_from_address(to),
            created_at_time:
                created_at_time === null
                    ? null
                    : {
                          timestamp_nanos: created_at_time
                      }
        });

    if (!ok(transfer_result_canister_result)) {
        return {
            err: transfer_result_canister_result.err
        };
    }

    const transfer_result = transfer_result_canister_result.ok;

    return {
        ok: transfer_result
    };
}

type GetAccountBalanceResult = Variant<{
    ok: Tokens;
    err: string;
}>;

export function* get_account_balance(
    address: Address
): Update<GetAccountBalanceResult> {
    const tokens_canister_result: CanisterResult<Tokens> =
        yield ICPCanister.account_balance({
            account: binary_address_from_address(address)
        });

    if (!ok(tokens_canister_result)) {
        return {
            err: tokens_canister_result.err
        };
    }

    const tokens = tokens_canister_result.ok;

    return {
        ok: tokens
    };
}

type GetTransferFeeResult = Variant<{
    ok: TransferFee;
    err: string;
}>;

export function* get_transfer_fee(): Update<GetTransferFeeResult> {
    const transfer_fee_canister_result: CanisterResult<TransferFee> =
        yield ICPCanister.transfer_fee({});

    if (!ok(transfer_fee_canister_result)) {
        return {
            err: transfer_fee_canister_result.err
        };
    }

    const transfer_fee = transfer_fee_canister_result.ok;

    return {
        ok: transfer_fee
    };
}

type GetBlocksResult = Variant<{
    ok: QueryBlocksResponse;
    err: string;
}>;

export function* get_blocks(
    get_blocks_args: GetBlocksArgs
): Update<GetBlocksResult> {
    const canister_result: CanisterResult<QueryBlocksResponse> =
        yield ICPCanister.query_blocks(get_blocks_args);

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    const get_blocks_result = canister_result.ok;

    return {
        ok: get_blocks_result
    };
}

type GetSymbolResult = Variant<{
    ok: string;
    err: string;
}>;

export function* get_symbol(): Update<GetSymbolResult> {
    const symbol_result_canister_result: CanisterResult<SymbolResult> =
        yield ICPCanister.symbol();

    if (!ok(symbol_result_canister_result)) {
        return {
            err: symbol_result_canister_result.err
        };
    }

    const symbol_result = symbol_result_canister_result.ok;

    return {
        ok: symbol_result.symbol
    };
}

type GetNameResult = Variant<{
    ok: string;
    err: string;
}>;

export function* get_name(): Update<GetNameResult> {
    const name_result_canister_result: CanisterResult<NameResult> =
        yield ICPCanister.name();

    if (!ok(name_result_canister_result)) {
        return {
            err: name_result_canister_result.err
        };
    }

    const name_result = name_result_canister_result.ok;

    return {
        ok: name_result.name
    };
}

type GetDecimalsResult = Variant<{
    ok: nat32;
    err: string;
}>;

export function* get_decimals(): Update<GetDecimalsResult> {
    const decimals_result_canister_result: CanisterResult<DecimalsResult> =
        yield ICPCanister.decimals();

    if (!ok(decimals_result_canister_result)) {
        return {
            err: decimals_result_canister_result.err
        };
    }

    const decimals_result = decimals_result_canister_result.ok;

    return {
        ok: decimals_result.decimals
    };
}

type GetArchivesResult = Variant<{
    ok: Archives;
    err: string;
}>;

export function* get_archives(): Update<GetArchivesResult> {
    const archives_canister_result: CanisterResult<Archives> =
        yield ICPCanister.archives();

    if (!ok(archives_canister_result)) {
        return {
            err: archives_canister_result.err
        };
    }

    const archives = archives_canister_result.ok;

    return {
        ok: archives
    };
}

export function get_address_from_principal(
    principal: Principal
): Query<string> {
    return hex_address_from_principal(principal, 0);
}
