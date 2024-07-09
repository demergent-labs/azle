import {
    call,
    id,
    IDL,
    init,
    Principal,
    query,
    StableBTreeMap,
    update
} from 'azle';
import {
    FUNCS as managementCanister,
    HttpRequestArgs,
    HttpResponse,
    HttpTransformArgs,
    PRINCIPAL
} from 'azle/canisters/management';

let stableStorage = StableBTreeMap<string, string>(0);

export default class {
    @init([IDL.Text])
    init(ethereumUrl: string): void {
        stableStorage.insert('ethereumUrl', ethereumUrl);
    }

    @update([IDL.Text], IDL.Text)
    async ethGetBalance(ethereumAddress: string): Promise<string> {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        return await getBalance(url, ethereumAddress);
    }

    @update([IDL.Nat32], IDL.Text)
    async ethGetBlockByNumber(number: number): Promise<string> {
        const urlOpt = stableStorage.get('ethereumUrl');

        if ('None' in urlOpt) {
            throw new Error('ethereumUrl is not defined');
        }

        const url = urlOpt.Some;

        return await getBlockByNumber(url, number);
    }

    @query([HttpTransformArgs], HttpResponse)
    ethTransform(args: HttpTransformArgs): HttpResponse {
        return {
            ...args.response,
            headers: []
        };
    }
}

async function getBalance(
    url: string,
    ethereumAddress: string
): Promise<string> {
    const httpResponse = await call(
        PRINCIPAL,
        managementCanister.http_request,
        {
            paramIdls: [HttpRequestArgs],
            returnIdl: HttpResponse,
            args: [
                {
                    url,
                    max_response_bytes: [2_000n],
                    method: {
                        post: null
                    },
                    headers: [],
                    body: [
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBalance',
                                params: [ethereumAddress, 'earliest'],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ],
                    transform: [
                        {
                            function: [id(), 'ethTransform'] as [
                                Principal,
                                string
                            ],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            payment: 50_000_000n
        }
    );

    return Buffer.from(httpResponse.body.buffer).toString('utf-8');
}
async function getBlockByNumber(url: string, number: number): Promise<string> {
    const httpResponse = await call(
        PRINCIPAL,
        managementCanister.http_request,
        {
            paramIdls: [HttpRequestArgs],
            returnIdl: HttpResponse,
            args: [
                {
                    url,
                    max_response_bytes: [2_000n],
                    method: {
                        post: null
                    },
                    headers: [],
                    body: [
                        Buffer.from(
                            JSON.stringify({
                                jsonrpc: '2.0',
                                method: 'eth_getBlockByNumber',
                                params: [`0x${number.toString(16)}`, false],
                                id: 1
                            }),
                            'utf-8'
                        )
                    ],
                    transform: [
                        {
                            function: [id(), 'ethTransform'] as [
                                Principal,
                                string
                            ],
                            context: Uint8Array.from([])
                        }
                    ]
                }
            ],
            payment: 50_000_000n
        }
    );

    return Buffer.from(httpResponse.body.buffer).toString('utf-8');
}
