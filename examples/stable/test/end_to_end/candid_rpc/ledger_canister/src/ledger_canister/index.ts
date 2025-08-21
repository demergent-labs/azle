import { getCrc32 } from '@dfinity/principal';
import { call, IDL, Principal, query, update } from 'azle';
import {
    AccountIdentifierByteBuf,
    Archives,
    Decimals,
    GetBlocksArgs,
    Name,
    QueryBlocksResponse,
    Result_6 as TransferResult,
    Symbol,
    TimeStamp,
    Tokens,
    TransferArgs,
    TransferFee
} from 'azle/canisters/nns_icp_ledger/idl';
import jsSHA from 'jssha';

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
        const created_at_time: [TimeStamp] | [] =
            createdAtTime.length === 0
                ? []
                : [{ timestamp_nanos: createdAtTime[0] }];
        return await call<[TransferArgs], TransferResult>(
            getIcpCanisterPrincipal(),
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
        return await call<[AccountIdentifierByteBuf], Tokens>(
            getIcpCanisterPrincipal(),
            'account_balance',
            {
                paramIdlTypes: [AccountIdentifierByteBuf],
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
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        return await call<[{}], TransferFee>(
            getIcpCanisterPrincipal(),
            'transfer_fee',
            {
                paramIdlTypes: [IDL.Record({})],
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
            getIcpCanisterPrincipal(),
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
        const symbolResult = await call<undefined, Symbol>(
            getIcpCanisterPrincipal(),
            'symbol',
            {
                returnIdlType: Symbol
            }
        );

        return symbolResult.symbol;
    }

    @update([], IDL.Text)
    async getName(): Promise<string> {
        const nameResult = await call<undefined, Name>(
            getIcpCanisterPrincipal(),
            'name',
            {
                returnIdlType: Name
            }
        );

        return nameResult.name;
    }

    @update([], IDL.Nat32)
    async getDecimals(): Promise<number> {
        const decimalsResult = await call<undefined, Decimals>(
            getIcpCanisterPrincipal(),
            'decimals',
            { returnIdlType: Decimals }
        );

        return decimalsResult.decimals;
    }

    @update([], Archives)
    async getArchives(): Promise<Archives> {
        return await call<undefined, Archives>(
            getIcpCanisterPrincipal(),
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

function hexAddressFromPrincipal(
    principal: Principal,
    subaccount: number
): string {
    return addressFromPrincipal(principal, subaccount);
}

function binaryAddressFromAddress(address: string): Uint8Array {
    return Uint8Array.from(
        address.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? []
    );
}

function _binaryAddressFromPrincipal(
    principal: Principal,
    subaccount: number
): Uint8Array {
    const address = addressFromPrincipal(principal, subaccount);
    return Uint8Array.from(
        address.match(/.{1,2}/g)?.map((x) => parseInt(x, 16)) ?? []
    );
}

// https://github.com/Toniq-Labs/extendable-token/blob/86eabb7336ea259876be9be830fb69b03046ea14/motoko/util/AccountIdentifier.mo
// https://github.com/Toniq-Labs/entrepot-app/blob/5004eb5cb3c98805b665d3fa24d95483ce2a8cda/src/ic/utils.js
// Some functions below licensed as follows
// MIT License

// Copyright (c) 2022 Toniq Labs

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
function addressFromPrincipal(
    principal: Principal,
    subaccount: number
): string {
    const prefixBytes = new Uint8Array([
        10, 97, 99, 99, 111, 117, 110, 116, 45, 105, 100
    ]); // \0xAaccount-id
    const principalBytes = principal.toUint8Array();
    const subaccountBytes = getSubAccountArray(subaccount);

    const hash = new jsSHA('SHA-224', 'UINT8ARRAY')
        .update(
            Uint8Array.from([
                ...prefixBytes,
                ...principalBytes,
                ...subaccountBytes
            ])
        )
        .getHash('UINT8ARRAY');
    const checksum = to32Bits(getCrc32(hash));

    return toHexString(new Uint8Array([...checksum, ...hash]));
}

function getSubAccountArray(subaccount: number): number[] {
    return Array(28)
        .fill(0)
        .concat(to32Bits(subaccount ? subaccount : 0));
}

function to32Bits(number: number): number[] {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, number);
    return Array.from(new Uint8Array(b));
}

function toHexString(byteArray: Uint8Array): string {
    return Array.from(byteArray, (byte) => {
        return `0${(byte & 0xff).toString(16)}`.slice(-2);
    }).join('');
}
