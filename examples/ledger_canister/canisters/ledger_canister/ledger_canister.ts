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
    binaryAddressFromAddress,
    GetBlocksArgs,
    hexAddressFromPrincipal,
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
export async function executeTransfer(
    to: Address,
    amount: nat64,
    fee: nat64,
    createdAtTime: Opt<nat64>
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
            to: binaryAddressFromAddress(to),
            created_at_time:
                createdAtTime === null
                    ? null
                    : {
                          timestamp_nanos: createdAtTime
                      }
        })
        .call();
}

type GetAccountBalanceResult = Variant<{
    Ok: Tokens;
    Err: string;
}>;

$update;
export async function getAccountBalance(
    address: Address
): Promise<GetAccountBalanceResult> {
    return await icpCanister
        .account_balance({
            account: binaryAddressFromAddress(address)
        })
        .call();
}

type GetTransferFeeResult = Variant<{
    Ok: TransferFee;
    Err: string;
}>;

$update;
export async function getTransferFee(): Promise<GetTransferFeeResult> {
    return await icpCanister.transfer_fee({}).call();
}

type GetBlocksResult = Variant<{
    Ok: QueryBlocksResponse;
    Err: string;
}>;

$update;
export async function getBlocks(
    getBlocksArgs: GetBlocksArgs
): Promise<GetBlocksResult> {
    return await icpCanister.query_blocks(getBlocksArgs).call();
}

type GetSymbolResult = Variant<{
    Ok: string;
    Err: string;
}>;

$update;
export async function getSymbol(): Promise<GetSymbolResult> {
    const symbolResultCallResult = await icpCanister.symbol().call();

    return match(symbolResultCallResult, {
        Ok: (symbolResult) => ({ Ok: symbolResult.symbol }),
        Err: (err) => ({ Err: err })
    });
}

type GetNameResult = Variant<{
    Ok: string;
    Err: string;
}>;

$update;
export async function getName(): Promise<GetNameResult> {
    const nameResultCallResult = await icpCanister.name().call();

    return match(nameResultCallResult, {
        Ok: (nameResult) => ({ Ok: nameResult.name }),
        Err: (err) => ({ Err: err })
    });
}

type GetDecimalsResult = Variant<{
    Ok: nat32;
    Err: string;
}>;

$update;
export async function getDecimals(): Promise<GetDecimalsResult> {
    const decimalsResultCallResult = await icpCanister.decimals().call();

    return match(decimalsResultCallResult, {
        Ok: (decimalsResult) => ({ Ok: decimalsResult.decimals }),
        Err: (err) => ({ Err: err })
    });
}

type GetArchivesResult = Variant<{
    Ok: Archives;
    Err: string;
}>;

$update;
export async function getArchives(): Promise<GetArchivesResult> {
    return await icpCanister.archives().call();
}

$query;
export function getAddressFromPrincipal(principal: Principal): string {
    return hexAddressFromPrincipal(principal, 0);
}
