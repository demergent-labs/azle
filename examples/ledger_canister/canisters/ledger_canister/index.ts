import {
    ic,
    nat32,
    nat64,
    None,
    Opt,
    principal,
    Principal,
    query,
    Service,
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

export default class extends Service {
    icpCanister = new Ledger(
        Principal.fromText(
            process.env.ICP_CANISTER_PRINCIPAL ??
                ic.trap('process.env.ICP_CANISTER_PRINCIPAL is undefined')
        )
    );

    @update([Address, nat64, nat64, Opt(nat64)], TransferResult)
    async executeTransfer(
        to: Address,
        amount: nat64,
        fee: nat64,
        createdAtTime: Opt<nat64>
    ): Promise<TransferResult> {
        return await ic.call(this.icpCanister.transfer, {
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
                        createdAtTime.length === 1
                            ? Some({ timestamp_nanos: createdAtTime[0] })
                            : None
                }
            ]
        });
    }

    @update([Address], Tokens)
    async getAccountBalance(address: Address): Promise<Tokens> {
        return await ic.call(this.icpCanister.account_balance, {
            args: [
                {
                    account: binaryAddressFromAddress(address)
                }
            ]
        });
    }

    @update([], TransferFee)
    async getTransferFee(): Promise<TransferFee> {
        return await ic.call(this.icpCanister.transfer_fee, { args: [{}] });
    }

    @update([GetBlocksArgs], QueryBlocksResponse)
    async getBlocks(
        getBlocksArgs: GetBlocksArgs
    ): Promise<QueryBlocksResponse> {
        return await ic.call(this.icpCanister.query_blocks, {
            args: [getBlocksArgs]
        });
    }

    @update([], text)
    async getSymbol(): Promise<text> {
        const symbolResult = await ic.call(this.icpCanister.symbol, {});

        return symbolResult.symbol;
    }

    @update([], text)
    async getName(): Promise<text> {
        const nameResult = await ic.call(this.icpCanister.name, {});

        return nameResult.name;
    }

    @update([], nat32)
    async getDecimals(): Promise<nat32> {
        const decimalsResult = await ic.call(this.icpCanister.decimals, {});

        return decimalsResult.decimals;
    }

    @update([], Archives)
    async getArchives(): Promise<Archives> {
        return await ic.call(this.icpCanister.archives, {});
    }

    @query([principal], text)
    getAddressFromPrincipal(principal: Principal): string {
        return hexAddressFromPrincipal(principal, 0);
    }
}
