import { call, IDL, init, query, update } from 'azle';
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

export default class {
    @init([])
    init() {
        icpCanister = Ledger(Principal.fromText(getIcpCanisterPrincipal()));
    }
    @update([Address, nat64, nat64, Opt(nat64)], TransferResult)
    async executeTransfer(to, amount, fee, createdAtTime) {
        return await call(icpCanister.transfer, {
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
                            : Some({
                                  timestamp_nanos: createdAtTime.Some
                              })
                }
            ]
        });
    }
    @update([Address], Tokens)
    async getAccountBalance(address) {
        return await call(icpCanister.account_balance, {
            args: [
                {
                    account: binaryAddressFromAddress(address)
                }
            ]
        });
    }
    @update([], TransferFee)
    async getTransferFee() {
        return await call(icpCanister.transfer_fee, { args: [{}] });
    }
    @update([GetBlocksArgs], QueryBlocksResponse)
    async getBlocks(getBlocksArgs) {
        return await call(icpCanister.query_blocks, {
            args: [getBlocksArgs]
        });
    }
    @update([], IDL.Text)
    async getSymbol() {
        const symbolResult = await call(icpCanister.symbol);

        return symbolResult.symbol;
    }
    @update([], IDL.Text)
    async getName() {
        const nameResult = await call(icpCanister.name);

        return nameResult.name;
    }
    @update([], nat32)
    async getDecimals() {
        const decimalsResult = await call(icpCanister.decimals);

        return decimalsResult.decimals;
    }
    @update([], Archives)
    async getArchives() {
        return await call(icpCanister.archives);
    }
    @query([Principal], IDL.Text)
    getAddressFromPrincipal(principal) {
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
