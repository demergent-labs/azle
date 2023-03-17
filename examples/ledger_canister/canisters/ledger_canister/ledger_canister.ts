// TODO test all errors for query blocks

import {
    match,
    nat32,
    nat64,
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

const icpCanister = new Ledger(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

type ExecuteTransferResult = Variant<{
    Ok: TransferResult;
    Err: string;
}>;

$update;
export async function execute_transfer(
    to: Address,
    amount: nat64,
    fee: nat64,
    created_at_time: Opt<nat64>
): Promise<ExecuteTransferResult> {
    return await icpCanister
        .transfer({
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
        })
        .call();
}

type GetAccountBalanceResult = Variant<{
    Ok: Tokens;
    Err: string;
}>;

$update;
export async function get_account_balance(
    address: Address
): Promise<GetAccountBalanceResult> {
    return await icpCanister
        .account_balance({
            account: binary_address_from_address(address)
        })
        .call();
}

type GetTransferFeeResult = Variant<{
    Ok: TransferFee;
    Err: string;
}>;

$update;
export async function get_transfer_fee(): Promise<GetTransferFeeResult> {
    return await icpCanister.transfer_fee({}).call();
}

type GetBlocksResult = Variant<{
    Ok: QueryBlocksResponse;
    Err: string;
}>;

$update;
export async function get_blocks(
    get_blocks_args: GetBlocksArgs
): Promise<GetBlocksResult> {
    return await icpCanister.query_blocks(get_blocks_args).call();
}

type GetSymbolResult = Variant<{
    Ok: string;
    Err: string;
}>;

$update;
export async function get_symbol(): Promise<GetSymbolResult> {
    const symbol_result_canister_result = await icpCanister.symbol().call();

    return match(symbol_result_canister_result, {
        Ok: (symbol_result) => ({ Ok: symbol_result.symbol }),
        Err: (err) => ({ Err: err })
    });
}

type GetNameResult = Variant<{
    Ok: string;
    Err: string;
}>;

$update;
export async function get_name(): Promise<GetNameResult> {
    const name_result_canister_result = await icpCanister.name().call();

    return match(name_result_canister_result, {
        Ok: (name_result) => ({ Ok: name_result.name }),
        Err: (err) => ({ Err: err })
    });
}

type GetDecimalsResult = Variant<{
    Ok: nat32;
    Err: string;
}>;

$update;
export async function get_decimals(): Promise<GetDecimalsResult> {
    const decimals_result_canister_result = await icpCanister.decimals().call();

    return match(decimals_result_canister_result, {
        Ok: (decimals_result) => ({ Ok: decimals_result.decimals }),
        Err: (err) => ({ Err: err })
    });
}

type GetArchivesResult = Variant<{
    Ok: Archives;
    Err: string;
}>;

$update;
export async function get_archives(): Promise<GetArchivesResult> {
    return await icpCanister.archives().call();
}

$query;
export function get_address_from_principal(principal: Principal): string {
    return hex_address_from_principal(principal, 0);
}
