// TODO test all errors for query blocks

import {
    ic,
    match,
    nat32,
    nat64,
    Opt,
    Principal,
    $query,
    Result,
    $update
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
    Principal.fromText(
        process.env.ICP_CANISTER_PRINCIPAL ??
            ic.trap('process.env.ICP_CANISTER_PRINCIPAL is undefined')
    )
);

$update;
export async function executeTransfer(
    to: Address,
    amount: nat64,
    fee: nat64,
    createdAtTime: Opt<nat64>
): Promise<Result<TransferResult, string>> {
    return await icpCanister
        .transfer({
            memo: 0n,
            amount: {
                e8s: amount
            },
            fee: {
                e8s: fee
            },
            from_subaccount: Opt.None,
            to: binaryAddressFromAddress(to),
            created_at_time: match(createdAtTime, {
                Some: (time) => Opt.Some({ timestamp_nanos: time }),
                None: () => Opt.None
            })
        })
        .call();
}

$update;
export async function getAccountBalance(
    address: Address
): Promise<Result<Tokens, string>> {
    return await icpCanister
        .account_balance({
            account: binaryAddressFromAddress(address)
        })
        .call();
}

$update;
export async function getTransferFee(): Promise<Result<TransferFee, string>> {
    return await icpCanister.transfer_fee({}).call();
}

$update;
export async function getBlocks(
    getBlocksArgs: GetBlocksArgs
): Promise<Result<QueryBlocksResponse, string>> {
    return await icpCanister.query_blocks(getBlocksArgs).call();
}

$update;
export async function getSymbol(): Promise<Result<string, string>> {
    const symbolResultCallResult = await icpCanister.symbol().call();

    return match(symbolResultCallResult, {
        Ok: (symbolResult) => ({ Ok: symbolResult.symbol }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function getName(): Promise<Result<string, string>> {
    const nameResultCallResult = await icpCanister.name().call();

    return match(nameResultCallResult, {
        Ok: (nameResult) => ({ Ok: nameResult.name }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function getDecimals(): Promise<Result<nat32, string>> {
    const decimalsResultCallResult = await icpCanister.decimals().call();

    return match(decimalsResultCallResult, {
        Ok: (decimalsResult) => ({ Ok: decimalsResult.decimals }),
        Err: (err) => ({ Err: err })
    });
}

$update;
export async function getArchives(): Promise<Result<Archives, string>> {
    return await icpCanister.archives().call();
}

$query;
export function getAddressFromPrincipal(principal: Principal): string {
    return hexAddressFromPrincipal(principal, 0);
}
