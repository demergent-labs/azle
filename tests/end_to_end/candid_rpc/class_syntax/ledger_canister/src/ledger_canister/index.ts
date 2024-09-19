import { call, IDL, Principal, query, update } from 'azle';
import {
    AccountBalanceArgs,
    Archives,
    binaryAddressFromAddress,
    DecimalsResult,
    GetBlocksArgs,
    hexAddressFromPrincipal,
    NameResult,
    QueryBlocksResponse,
    SymbolResult,
    Tokens,
    TransferArgs,
    TransferFee,
    TransferFeeArg,
    TransferResult
} from 'azle/canisters/icp';

export default class {
    @update(
        [IDL.Text, IDL.Nat64, IDL.Nat64, IDL.Opt(IDL.Nat64)],
        TransferResult
    )
    async executeTransfer(
        to: string,
        amount: bigint,
        fee: bigint,
        createdAtTime: [bigint] | []
    ): Promise<TransferResult> {
        const created_at_time =
            createdAtTime.length === 0
                ? []
                : [{ timestamp_nanos: createdAtTime[0] }];
        return await call(getIcpCanisterPrincipal(), 'transfer', {
            paramIdlTypes: [TransferArgs],
            returnIdlType: TransferResult,
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
                    created_at_time
                }
            ]
        });
    }

    @update([IDL.Text], Tokens)
    async getAccountBalance(address: string): Promise<Tokens> {
        return await call(getIcpCanisterPrincipal(), 'account_balance', {
            paramIdlTypes: [AccountBalanceArgs],
            returnIdlType: Tokens,
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
            paramIdlTypes: [TransferFeeArg],
            returnIdlType: TransferFee,
            args: [{}]
        });
    }

    @update([GetBlocksArgs], QueryBlocksResponse)
    async getBlocks(
        getBlocksArgs: GetBlocksArgs
    ): Promise<QueryBlocksResponse> {
        return await call(getIcpCanisterPrincipal(), 'query_blocks', {
            paramIdlTypes: [GetBlocksArgs],
            returnIdlType: QueryBlocksResponse,
            args: [getBlocksArgs]
        });
    }

    @update([], IDL.Text)
    async getSymbol(): Promise<string> {
        const symbolResult = await call(getIcpCanisterPrincipal(), 'symbol', {
            returnIdlType: SymbolResult
        });

        return symbolResult.symbol;
    }

    @update([], IDL.Text)
    async getName(): Promise<string> {
        const nameResult = await call(getIcpCanisterPrincipal(), 'name', {
            returnIdlType: NameResult
        });

        return nameResult.name;
    }

    @update([], IDL.Nat32)
    async getDecimals(): Promise<number> {
        const decimalsResult = await call(
            getIcpCanisterPrincipal(),
            'decimals',
            { returnIdlType: DecimalsResult }
        );

        return decimalsResult.decimals;
    }

    @update([], Archives)
    async getArchives(): Promise<Archives> {
        return await call(getIcpCanisterPrincipal(), 'archives', {
            returnIdlType: Archives
        });
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
