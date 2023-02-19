// TODO test all errors for query blocks

import {
    CanisterResult,
    nat32,
    nat64,
    ok,
    Opt,
    Principal,
    $query,
    $update,
    Variant
} from 'azle';
import {
    Address,
    Archives,
    binary_address_from_address,
    GetBlocksArgs,
    hex_address_from_principal,
    Ledger,
    QueryBlocksResponse,
    Tokens,
    TransferFee,
    TransferResult
} from 'azle/canisters/ledger';

const ICPCanister = new Ledger(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

type ExecuteTransferResult = Variant<{
    ok: TransferResult;
    err: string;
}>;

$update;
export async function execute_transfer(
    to: Address,
    amount: nat64,
    fee: nat64,
    created_at_time: Opt<nat64>
): Promise<ExecuteTransferResult> {
    const transfer_result_canister_result = await ICPCanister.transfer({
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
    }).call();

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

$update;
export async function get_account_balance(
    address: Address
): Promise<GetAccountBalanceResult> {
    const tokens_canister_result = await ICPCanister.account_balance({
        account: binary_address_from_address(address)
    }).call();

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

$update;
export async function get_transfer_fee(): Promise<GetTransferFeeResult> {
    const transfer_fee_canister_result = await ICPCanister.transfer_fee(
        {}
    ).call();

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

$update;
export async function get_blocks(
    get_blocks_args: GetBlocksArgs
): Promise<GetBlocksResult> {
    const canister_result = await ICPCanister.query_blocks(
        get_blocks_args
    ).call();

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

$update;
export async function get_symbol(): Promise<GetSymbolResult> {
    const symbol_result_canister_result = await ICPCanister.symbol().call();

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

$update;
export async function get_name(): Promise<GetNameResult> {
    const name_result_canister_result = await ICPCanister.name().call();

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

$update;
export async function get_decimals(): Promise<GetDecimalsResult> {
    const decimals_result_canister_result = await ICPCanister.decimals().call();

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

$update;
export async function get_archives(): Promise<GetArchivesResult> {
    const archives_canister_result: CanisterResult<Archives> =
        await ICPCanister.archives().call();

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

$query;
export function get_address_from_principal(principal: Principal): string {
    return hex_address_from_principal(principal, 0);
}
