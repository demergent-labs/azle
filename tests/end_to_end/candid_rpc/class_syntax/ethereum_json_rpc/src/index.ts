import { call, IDL, query, update } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
    managementCanister
} from 'azle/canisters/management';

let stableStorage = StableBTreeMap<IDL.Text, IDL.Text>(0);

export default class {
    @init([IDL.Text])
    init(ethereumUrl) {
        stableStorage.insert('ethereumUrl', ethereumUrl);
    }
    @update([IDL.Text], IDL.Text)
    async ethGetBalance(ethereumAddress) {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        return await getBalance(url, ethereumAddress);
    }
    @update([IDL.Nat32], IDL.Text)
    async ethGetBlockByNumber(number) {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        return await getBlockByNumber(url, number);
    }
    @query([HttpTransformArgs], HttpResponse)
    ethTransform(args) {
        return {
            ...args.response,
            headers: []
        };
    }
}

async function getBalance(url: string, ethereumAddress: string) {
    const httpResponse = await call(managementCanister.http_request, {
        args: [
            {
                url,
                max_response_bytes: Some(2_000n),
                method: {
                    post: null
                },
                headers: [],
                body: Some(
                    Buffer.from(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBalance',
                            params: [ethereumAddress, 'earliest'],
                            id: 1
                        }),
                        'utf-8'
                    )
                ),
                transform: Some({
                    function: [ic.id(), 'ethTransform'] as [Principal, string],
                    context: Uint8Array.from([])
                })
            }
        ],
        cycles: 50_000_000n
    });

    return Buffer.from(httpResponse.body.buffer).toString('utf-8');
}
async function getBlockByNumber(url: string, number: number) {
    const httpResponse = await call(managementCanister.http_request, {
        args: [
            {
                url,
                max_response_bytes: Some(2_000n),
                method: {
                    post: null
                },
                headers: [],
                body: Some(
                    Buffer.from(
                        JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_getBlockByNumber',
                            params: [`0x${number.toString(16)}`, false],
                            id: 1
                        }),
                        'utf-8'
                    )
                ),
                transform: Some({
                    function: [ic.id(), 'ethTransform'] as [Principal, string],
                    context: Uint8Array.from([])
                })
            }
        ],
        cycles: 50_000_000n
    });

    return Buffer.from(httpResponse.body.buffer).toString('utf-8');
}
