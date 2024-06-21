import { call, IDL, Principal, query, update } from 'azle';
import {
    Address,
    Archives,
    binaryAddressFromAddress,
    GetBlocksArgs,
    hexAddressFromPrincipal,
    QueryBlocksResponse,
    Tokens,
    TransferFee,
    TransferResult
} from 'azle/canisters/ledger';

export default class {
    @update([Address, IDL.Nat64, IDL.Nat64, IDL.Opt(IDL.Nat64)], TransferResult)
    async executeTransfer(
        to: Address,
        amount: bigint,
        fee: bigint,
        createdAtTime: [bigint] | []
    ) {
        return await call(getIcpCanisterPrincipal(), 'transfer', {
            args: [
                {
                    memo: 0n,
                    amount: {
                        e8s: amount
                    },
                    fee: {
                        e8s: fee
                    },
                    from_subaccount: [],
                    to: binaryAddressFromAddress(to),
                    created_at_time: createdAtTime
                }
            ]
        });
    }
    @update([Address], Tokens)
    async getAccountBalance(address: Address): Promise<Tokens> {
        return await call(getIcpCanisterPrincipal(), 'account_balance', {
            args: [
                {
                    account: binaryAddressFromAddress(address)
                }
            ]
        });
    }
    @update([], TransferFee)
    async getTransferFee(): Promise<TransferFee> {
        return await call(getIcpCanisterPrincipal(), 'transfer_fee', {
            args: [{}]
        });
    }
    @update([GetBlocksArgs], QueryBlocksResponse)
    async getBlocks(getBlocksArgs): Promise<QueryBlocksResponse> {
        return await call(getIcpCanisterPrincipal(), 'query_blocks', {
            args: [getBlocksArgs]
        });
    }
    @update([], IDL.Text)
    async getSymbol(): Promise<string> {
        const symbolResult = await call(getIcpCanisterPrincipal(), 'symbol');

        return symbolResult.symbol;
    }
    @update([], IDL.Text)
    async getName(): Promise<string> {
        const nameResult = await call(getIcpCanisterPrincipal(), 'name');

        return nameResult.name;
    }
    @update([], IDL.Nat32)
    async getDecimals() {
        const decimalsResult = await call(
            getIcpCanisterPrincipal(),
            'decimals'
        );

        return decimalsResult.decimals;
    }
    @update([], Archives)
    async getArchives(): Promise<Archives> {
        return await call(getIcpCanisterPrincipal(), 'archives');
    }
    @query([IDL.Principal], IDL.Text)
    getAddressFromPrincipal(principal: Principal): string {
        return hexAddressFromPrincipal(principal, 0);
    }
}

function getIcpCanisterPrincipal(): string {
    if (process.env.ICP_CANISTER_PRINCIPAL !== undefined) {
        return process.env.ICP_CANISTER_PRINCIPAL;
    } else {
        throw new Error('process.env.ICP_CANISTER_PRINCIPAL is undefined');
    }
}
