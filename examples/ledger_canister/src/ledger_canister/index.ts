import {
    Canister,
    ic,
    init,
    nat32,
    nat64,
    None,
    Opt,
    Principal,
    query,
    Some,
    text,
    update
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

let icpCanister: typeof Ledger;

export default Canister({
    init: init([], () => {
        icpCanister = Ledger(
            Principal.fromText(
                process.env.ICP_CANISTER_PRINCIPAL ??
                    ic.trap('process.env.ICP_CANISTER_PRINCIPAL is undefined')
            )
        );
    }),
    executeTransfer: update(
        [Address, nat64, nat64, Opt(nat64)],
        TransferResult,
        async (to, amount, fee, createdAtTime) => {
            return await ic.call(icpCanister.transfer, {
                args: [
                    {
                        memo: 0n,
                        amount: {
                            e8s: amount
                        },
                        fee: {
                            e8s: fee
                        },
                        from_subaccount: None,
                        to: binaryAddressFromAddress(to),
                        created_at_time:
                            'None' in createdAtTime
                                ? None
                                : Some({ timestamp_nanos: createdAtTime.Some })
                    }
                ]
            });
        }
    ),
    getAccountBalance: update([Address], Tokens, async (address) => {
        return await ic.call(icpCanister.account_balance, {
            args: [
                {
                    account: binaryAddressFromAddress(address)
                }
            ]
        });
    }),
    getTransferFee: update([], TransferFee, async () => {
        return await ic.call(icpCanister.transfer_fee, { args: [{}] });
    }),
    getBlocks: update(
        [GetBlocksArgs],
        QueryBlocksResponse,
        async (getBlocksArgs) => {
            return await ic.call(icpCanister.query_blocks, {
                args: [getBlocksArgs]
            });
        }
    ),
    getSymbol: update([], text, async () => {
        const symbolResult = await ic.call(icpCanister.symbol, {});

        return symbolResult.symbol;
    }),
    getName: update([], text, async () => {
        const nameResult = await ic.call(icpCanister.name, {});

        return nameResult.name;
    }),
    getDecimals: update([], nat32, async () => {
        const decimalsResult = await ic.call(icpCanister.decimals, {});

        return decimalsResult.decimals;
    }),
    getArchives: update([], Archives, async () => {
        return await ic.call(icpCanister.archives, {});
    }),
    getAddressFromPrincipal: query([Principal], text, (principal) => {
        return hexAddressFromPrincipal(principal, 0);
    })
});
