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
    TimeStamp,
    Tokens,
    TransferArgs,
    TransferFee,
    TransferFeeArg,
    TransferResult
} from 'azle/canisters/icp/idl';

export default class {
    icpCanisterPrincipal = getIcpCanisterPrincipal();

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
        const created_at_time: [TimeStamp] | [] =
            createdAtTime.length === 0
                ? []
                : [{ timestamp_nanos: createdAtTime[0] }];
        return await call<[TransferArgs], TransferResult>(
            this.icpCanisterPrincipal,
            'transfer',
            {
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
            }
        );
    }

    @update([IDL.Text], Tokens)
    async getAccountBalance(address: string): Promise<Tokens> {
        return await call<[AccountBalanceArgs], Tokens>(
            this.icpCanisterPrincipal,
            'account_balance',
            {
                paramIdlTypes: [AccountBalanceArgs],
                returnIdlType: Tokens,
                args: [
                    {
                        account: binaryAddressFromAddress(address)
                    }
                ]
            }
        );
    }

    @update([], TransferFee)
    async getTransferFee(): Promise<TransferFee> {
        return await call<[TransferFeeArg], TransferFee>(
            this.icpCanisterPrincipal,
            'transfer_fee',
            {
                paramIdlTypes: [TransferFeeArg],
                returnIdlType: TransferFee,
                args: [{}]
            }
        );
    }

    @update([GetBlocksArgs], QueryBlocksResponse)
    async getBlocks(
        getBlocksArgs: GetBlocksArgs
    ): Promise<QueryBlocksResponse> {
        return await call<[GetBlocksArgs], QueryBlocksResponse>(
            this.icpCanisterPrincipal,
            'query_blocks',
            {
                paramIdlTypes: [GetBlocksArgs],
                returnIdlType: QueryBlocksResponse,
                args: [getBlocksArgs]
            }
        );
    }

    @update([], IDL.Text)
    async getSymbol(): Promise<string> {
        const symbolResult = await call<undefined, SymbolResult>(
            this.icpCanisterPrincipal,
            'symbol',
            {
                returnIdlType: SymbolResult
            }
        );

        return symbolResult.symbol;
    }

    @update([], IDL.Text)
    async getName(): Promise<string> {
        const nameResult = await call<undefined, NameResult>(
            this.icpCanisterPrincipal,
            'name',
            {
                returnIdlType: NameResult
            }
        );

        return nameResult.name;
    }

    @update([], IDL.Nat32)
    async getDecimals(): Promise<number> {
        const decimalsResult = await call<undefined, DecimalsResult>(
            this.icpCanisterPrincipal,
            'decimals',
            { returnIdlType: DecimalsResult }
        );

        return decimalsResult.decimals;
    }

    @update([], Archives)
    async getArchives(): Promise<Archives> {
        return await call<undefined, Archives>(
            this.icpCanisterPrincipal,
            'archives',
            {
                returnIdlType: Archives
            }
        );
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
